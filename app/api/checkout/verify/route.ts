import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createWCOrder, findOrderByStripeSession, getProductDownloads, getVariationDownloads } from "@/lib/woocommerce"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export type DownloadProduct = {
  name: string
  downloads: { name: string; url: string }[]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("session_id")

  if (!sessionId) {
    return NextResponse.json({ error: "session_id requerido" }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    })

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Pago no completado" }, { status: 400 })
    }

    const lineItems = session.line_items?.data ?? []
    const customerEmail = session.customer_details?.email
    const customerName = session.customer_details?.name ?? ""

    const downloadableProducts: DownloadProduct[] = []
    let wcError: string | null = null

    if (customerEmail) {
      try {
        const wcLineItems = lineItems.flatMap((item) => {
          const p = item.price?.product as Stripe.Product
          const id = p?.metadata?.wc_product_id
          const variationId = p?.metadata?.wc_variation_id
          return id
            ? [{ productId: Number(id), ...(variationId ? { variationId: Number(variationId) } : {}), quantity: item.quantity ?? 1 }]
            : []
        })

        if (wcLineItems.length > 0) {
          const existingOrder = await findOrderByStripeSession(sessionId)
          if (!existingOrder) {
            await createWCOrder({
              email: customerEmail,
              name: customerName,
              stripeSessionId: sessionId,
              lineItems: wcLineItems,
            })
          }
        }

        for (const item of lineItems) {
          const p = item.price?.product as Stripe.Product
          const wcProductId = p?.metadata?.wc_product_id
          const wcVariationId = p?.metadata?.wc_variation_id
          if (!wcProductId) continue

          const downloads = wcVariationId
            ? await getVariationDownloads(Number(wcProductId), Number(wcVariationId))
            : await getProductDownloads(Number(wcProductId))
          if (downloads.length === 0) continue

          downloadableProducts.push({
            name: p.name,
            downloads: downloads.map((d) => ({ name: d.download_name, url: d.download_url })),
          })
        }
      } catch (wcErr) {
        wcError = wcErr instanceof Error ? wcErr.message : "Error desconocido en WooCommerce"
        console.error("[verify] Error al crear pedido/obtener descargas WC:", wcError)
      }
    }

    const hasDownloadables = downloadableProducts.length > 0

    return NextResponse.json({
      paid: true,
      customerEmail,
      downloadableProducts,
      hasDownloadables,
      wcError,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido"
    console.error("[verify] Error general:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
