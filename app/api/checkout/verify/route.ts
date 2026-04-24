import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getOrderDownloads } from "@/lib/woocommerce"

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
      expand: ["payment_intent"],
    })

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Pago no completado" }, { status: 400 })
    }

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent | null
    const wcOrderId = paymentIntent?.metadata?.wc_order_id

    let downloadableProducts: DownloadProduct[] = []

    if (wcOrderId) {
      const wcDownloads = await getOrderDownloads(Number(wcOrderId))
      if (wcDownloads.length > 0) {
        downloadableProducts = [
          {
            name: "Tus descargas",
            downloads: wcDownloads.map((d) => ({ name: d.download_name, url: d.download_url })),
          },
        ]
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