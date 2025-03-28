import { createClient } from "@supabase/supabase-js"

// Tipos para nuestras tablas
export type Product = {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  duration: number | null
  created_at: string
  updated_at: string
  slug: string
}

export type CartItem = {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  product?: Product
}

export type Order = {
  id: string
  user_id: string
  status: string
  total: number
  payment_intent_id: string | null
  created_at: string
  updated_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
  product?: Product
}

// Creamos un cliente de Supabase para el lado del cliente
const createClientSide = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Cliente de Supabase para el lado del servidor
const createServerSide = () => {
  const supabaseUrl = process.env.SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseServiceKey)
}

// Singleton para el cliente del lado del cliente
let clientSideInstance: ReturnType<typeof createClient> | null = null

export const clientSupabase = () => {
  if (clientSideInstance) return clientSideInstance
  clientSideInstance = createClientSide()
  return clientSideInstance
}

// Para el lado del servidor
export const serverSupabase = () => {
  return createServerSide()
}

