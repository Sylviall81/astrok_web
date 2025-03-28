// lib/products.ts
import { serverSupabase } from "./supabase"

export default async function getProducts() {
  try {
    const supabase = serverSupabase()
    const { data, error } = await supabase.from("products").select("*").order("name")

    if (error) {
      console.error("Error fetching products:", error)
      return { success: false, message: "No se pudieron obtener los productos" }
    }

    return { success: true, data: data || [] }
  } catch (err) {
    console.error("Error in getProducts:", err)
    return { success: false, message: "Hubo un error al obtener los productos" }
  }
}
