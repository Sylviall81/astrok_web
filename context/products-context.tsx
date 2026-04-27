"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { WCProduct } from "@/lib/woocommerce"

interface ProductsContextType {
  products: WCProduct[]
  loading: boolean
  error: string | null
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  loading: true,
  error: null,
})

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<WCProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async (retries = 2): Promise<void> => {
      try {
        const res = await fetch("/api/products")
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
        const data: WCProduct[] = await res.json()
        setProducts(data)
        setLoading(false)
      } catch (err: any) {
        if (retries > 0) {
          await new Promise((r) => setTimeout(r, 1500))
          return fetchProducts(retries - 1)
        }
        console.error("🔴 Error cargando productos:", err.message)
        setError(err.message || "Error al cargar productos")
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