"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CartItem } from "./cart-item"
import { useCart } from "@/context/cart-context"
import { useNotification } from "@/context/notification-context"
import { useState } from "react"

export function CartDrawer() {
  const { cartItems, updateQuantity, removeItem, totalItems, totalPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { showNotification } = useNotification()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) return
    setIsLoading(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images?.[0]?.src || null,
          })),
        }),
      })

      if (!response.ok) throw new Error("Error en la respuesta del servidor")

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No se recibió URL de checkout")
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
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
              {totalItems}
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
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
            <div className="space-y-4 border-t pt-6">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium">Total</span>
                <span className="text-xl font-semibold">{formatPrice(totalPrice)}</span>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? "Procesando..." : "Finalizar compra"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}