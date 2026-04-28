import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getProductById } from "@/lib/woocommerce"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export type DownloadProduct = {
  name: string
  downloads: { name: string; url: string }[]
}

async function getProductWithRetry(id: number, retries = 2): Promise<Awaited<ReturnType<typeof getProductById>>> {
  try {
    return await getProductById(id)
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 1500))
      return getProductWithRetry(id, retries - 1)
    }
    throw err
  }
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
    const downloadableProducts: DownloadProduct[] = []

    for (const item of lineItems) {
      const stripeProduct = item.price?.product as Stripe.Product
      const wcProductId = stripeProduct?.metadata?.wc_product_id
      if (!wcProductId) continue

      const wcProduct = await getProductWithRetry(Number(wcProductId))

      if (wcProduct.downloadable && wcProduct.downloads?.length > 0) {
        downloadableProducts.push({
          name: wcProduct.name,
          downloads: wcProduct.downloads.map((d) => ({ name: d.name, url: d.file })),
        })
      }
    }

    return NextResponse.json({
      paid: true,
      customerEmail: session.customer_details?.email,
      downloadableProducts,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido"
    console.error("Error verificando pago:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
