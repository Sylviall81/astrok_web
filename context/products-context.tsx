// context/ProductsContext.ts
'use client'

import { createContext, useContext, useState, ReactNode } from "react"
import { Product } from "@/lib/supabase"

interface ProductsContextType {
  products: Product[]
  setProducts: (products: Product[]) => void
  cart: any[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<any[]>([])

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product])
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId))
  }

  return (
    <ProductsContext.Provider value={{ products, setProducts, cart, addToCart, removeFromCart }}>
      {/* Proporcionamos el contexto de productos y carrito a los componentes hijos */}
      {children}
    </ProductsContext.Provider>
    
  )
}

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}
