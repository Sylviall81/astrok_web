"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { WCProduct } from "@/lib/woocommerce"

export type LocalCartItem = {
  id: string
  product: WCProduct
  quantity: number
}

interface CartContextType {
  cartItems: LocalCartItem[]
  addToCart: (product: WCProduct) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
  isCartOpen: false,
  setIsCartOpen: () => {},
})

const generateId = () =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<LocalCartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Cargamos el carrito desde localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart")
      if (stored) setCartItems(JSON.parse(stored))
    } catch (err) {
      console.error("Error loading cart:", err)
    }
  }, [])

  // Guardamos en localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: WCProduct) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id)
      if (existingIndex >= 0) {
        return prev.map((item, i) =>
          i === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { id: generateId(), product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

 

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0
  )

   const clearCart = () => {
  localStorage.removeItem("cart")
  setCartItems([])
}

   return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, totalItems, clearCart, totalPrice, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)