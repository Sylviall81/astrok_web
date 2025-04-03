"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "@/lib/supabase"
import { clientSupabase } from "@/lib/supabase"

interface ProductsContextType {
  products: Product[]
  loading: boolean
  error: string | null
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: true,
  error: null,
})

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log("🟢 ProductsProvider montado") // 👉 Verifica si el Provider se está ejecutando

    const fetchProducts = async () => {
      const supabase = clientSupabase()
      console.log("🔵 Fetching products from Supabase...") // 👉 Antes de llamar a Supabase

      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: true }) // Luego los más antiguos?

        if (error) {
          console.error("🔴 Supabase error:", error.message) // 👉 Si hay un error en la consulta
          setError(error.message)
        } else {
          console.log("🟢 Productos obtenidos:", data) // 👉 Si la consulta funciona
          setProducts(data || [])
        }
      } catch (err: any) {
        console.error("🔴 Fetch failed:", err.message) // 👉 Error inesperado
        setError(err.message || "Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  )
}


export const useProducts = () => useContext(ProductsContext)

