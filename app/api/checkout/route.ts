// app/api/checkout/route.ts
import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { CheckoutValidationError, getChargeableItem } from "@/lib/woocommerce"
import { MAX_QTY_PER_LINE } from "@/lib/cart-limits"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const isPositiveInt = (n: unknown): n is number => Number.isInteger(n) && (n as number) > 0

// El navegador solo dice qué productos y cuántos. Nombre, precio e imagen se
// leen de WooCommerce sin caché en el momento de crear la sesión de Stripe.
function parseItems(body: unknown) {
  const items = (body as { items?: unknown })?.items
  if (!Array.isArray(items) || items.length === 0) {
    throw new CheckoutValidationError("No hay productos en el carrito")
  }
  return items.map((raw) => {
    const id = Number(raw?.id)
    const variationId = raw?.variationId == null ? null : Number(raw.variationId)
    const quantity = Number(raw?.quantity)
    if (!isPositiveInt(id) || (variationId !== null && !isPositiveInt(variationId))) {
      throw new CheckoutValidationError("Hay un producto no válido en el carrito. Quítalo y vuelve a añadirlo.")
    }
    if (!isPositiveInt(quantity) || quantity > MAX_QTY_PER_LINE) {
      throw new CheckoutValidationError(`La cantidad por producto debe estar entre 1 y ${MAX_QTY_PER_LINE}.`)
    }
    return { id, variationId, quantity }
  })
}

export async function POST(request: NextRequest) {
  try {
    const items = parseItems(await request.json().catch(() => null))

    const lineItems = await Promise.all(
      items.map(async ({ id, variationId, quantity }) => {
        const wc = await getChargeableItem(id, variationId)
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: wc.name,
              // Guardamos el ID de WooCommerce en los metadatos del producto
              metadata: {
                wc_product_id: String(id),
                ...(variationId ? { wc_variation_id: String(variationId) } : {}),
                downloadable: String(wc.downloadable),
              },
              ...(wc.image ? { images: [wc.image] } : {}),
            },
            unit_amount: Math.round(parseFloat(wc.price) * 100),
          },
          quantity,
        }
      }),
    )

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      locale: "es",
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    if (error instanceof CheckoutValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error("Error creating Stripe checkout session:", error)
    return NextResponse.json({ error: "No se pudo iniciar el pago. Inténtalo de nuevo." }, { status: 500 })
  }
}
