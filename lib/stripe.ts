import { loadStripe, type Stripe as StripeClient } from "@stripe/stripe-js"
import Stripe from "stripe"

// Inicializar Stripe en el cliente
let stripePromise: Promise<StripeClient | null>
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

// Inicializar Stripe en el servidor
let stripeInstance: Stripe | null = null
export const getServerStripe = () => {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2024-06-20",
    })
  }
  return stripeInstance
}
