import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createWCOrder, findOrderByStripeSession, getOrderDownloads } from "@/lib/woocommerce"

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

    const hasDownloadables = lineItems.some((item) => {
      const p = item.price?.product as Stripe.Product
      return p?.metadata?.downloadable === "true"
    })

    const downloadableProducts: DownloadProduct[] = []

    if (hasDownloadables && customerEmail) {
      let wcOrderId: number

      const existingOrder = await findOrderByStripeSession(sessionId)
      if (existingOrder) {
        wcOrderId = existingOrder.id
      } else {
        const wcLineItems = lineItems.flatMap((item) => {
          const p = item.price?.product as Stripe.Product
          const id = p?.metadata?.wc_product_id
          return id ? [{ productId: Number(id), quantity: item.quantity ?? 1 }] : []
        })
        const order = await createWCOrder({
          email: customerEmail,
          name: customerName,
          stripeSessionId: sessionId,
          lineItems: wcLineItems,
        })
        wcOrderId = order.id
      }

      const orderDownloads = await getOrderDownloads(wcOrderId)

      const nameByWcId = new Map<string, string>()
      for (const item of lineItems) {
        const p = item.price?.product as Stripe.Product
        if (p?.metadata?.wc_product_id) nameByWcId.set(p.metadata.wc_product_id, p.name)
      }

      for (const dl of orderDownloads) {
        const productName = nameByWcId.get(String(dl.product_id)) ?? `Producto ${dl.product_id}`
        const existing = downloadableProducts.find((p) => p.name === productName)
        if (existing) {
          existing.downloads.push({ name: dl.download_name, url: dl.download_url })
        } else {
          downloadableProducts.push({
            name: productName,
            downloads: [{ name: dl.download_name, url: dl.download_url }],
          })
        }
      }
    }

    return NextResponse.json({
      paid: true,
      customerEmail,
      downloadableProducts,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido"
    console.error("Error verificando pago:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
