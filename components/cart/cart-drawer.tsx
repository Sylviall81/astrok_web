"use client"

import { useEffect, useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CartItem } from "./cart-item"
import type { CartItem as CartItemType, Product } from "@/lib/supabase"
import { clientSupabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useNotification } from "@/context/notification-context"

export function CartDrawer() {
  const [cartItems, setCartItems] = useState<(CartItemType & { product: Product })[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { showNotification } = useNotification()
  const supabase = clientSupabase()

  useEffect(() => {
    if (isOpen) {
      const fetchItems = async () => {
        try {
          const {
            data: { session },
          } = await supabase.auth.getSession()

          if (!session) {
            // Si no hay sesión, usamos el carrito local
            try {
              const localCartString = localStorage.getItem("cart")
              const localCart = localCartString ? JSON.parse(localCartString) : []
              setCartItems(localCart)
            } catch (err) {
              console.error("Error parsing local cart:", err)
              setCartItems([])
            }
            return
          }

          const { data, error } = await supabase
            .from("cart_items")
            .select("*, product:products(*)")
            .eq("user_id", session.user.id)

          if (error) {
            console.error("Error fetching cart items:", error)
            setCartItems([])
            return
          }

          setCartItems(data || [])
        } catch (err) {
          console.error("Error in fetchCartItems:", err)
          setCartItems([])
        }
      }

      fetchItems()
    }
  }, [isOpen, supabase])

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        // Actualizar carrito local
        const localCartString = localStorage.getItem("cart")
        const localCart = localCartString ? JSON.parse(localCartString) : []
        const updatedCart = localCart.map((item: any) => (item.id === id ? { ...item, quantity } : item))
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        setCartItems(updatedCart)
        return
      }

      const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", id)

      if (error) {
        console.error("Error updating cart item:", error)
        return
      }

      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    } catch (err) {
      console.error("Error in handleUpdateQuantity:", err)
    }
  }

  const handleRemoveItem = async (id: string) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        // Eliminar del carrito local
        const localCartString = localStorage.getItem("cart")
        const localCart = localCartString ? JSON.parse(localCartString) : []
        const updatedCart = localCart.filter((item: any) => item.id !== id)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
        setCartItems(updatedCart)
        return
      }

      const { error } = await supabase.from("cart_items").delete().eq("id", id)

      if (error) {
        console.error("Error removing cart item:", error)
        return
      }

      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error("Error in handleRemoveItem:", err)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  const handleCheckout = async () => {
    setIsLoading(true)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        showNotification("error", "Inicia sesión", "Debes iniciar sesión para completar la compra")
        setIsLoading(false)
        setIsOpen(false)
        router.push("/login")
        return
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.product.id,
            quantity: item.quantity,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor")
      }

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL returned")
      }
    } catch (error: any) {
      console.error("Error creating checkout session:", error)
      showNotification("error", "Error", "No se pudo procesar el pago. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
          <span className="sr-only">Abrir carrito</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-2xl">Tu carrito</SheetTitle>
        </SheetHeader>
        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center space-y-4">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <div className="text-center">
              <h3 className="text-lg font-medium">Tu carrito está vacío</h3>
              <p className="text-sm text-muted-foreground">Añade algunos productos para comenzar</p>
            </div>
            <Button onClick={() => setIsOpen(false)}>Continuar comprando</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>
            <div className="space-y-4 border-t pt-6">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">Total</span>
                  <span className="text-xl font-semibold">{formatPrice(calculateTotal())}</span>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleCheckout} disabled={isLoading}>
                {isLoading ? "Procesando..." : "Finalizar compra"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

