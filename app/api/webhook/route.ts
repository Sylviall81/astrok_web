import { type NextRequest, NextResponse } from "next/server"
import { getServerStripe } from "@/lib/stripe"
import { serverSupabase } from "@/lib/supabase"

// Esta función procesa los webhooks de Stripe
export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature") as string

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
  }

  try {
    const stripe = getServerStripe()
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)

    const supabase = serverSupabase()

    // Manejar diferentes eventos de Stripe
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as any

        // Actualizar el estado de la orden
        await supabase.from("orders").update({ status: "paid" }).eq("payment_intent_id", session.payment_intent)

        // Limpiar el carrito del usuario
        if (session.metadata?.user_id) {
          await supabase.from("cart_items").delete().eq("user_id", session.metadata.user_id)
        }

        break

      case "payment_intent.payment_failed":
        const paymentIntent = event.data.object as any

        // Actualizar el estado de la orden
        await supabase.from("orders").update({ status: "failed" }).eq("payment_intent_id", paymentIntent.id)

        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }
}

