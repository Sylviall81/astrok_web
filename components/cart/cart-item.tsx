"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CartItem as CartItemType, Product } from "@/lib/supabase"

interface CartItemProps {
  item: CartItemType & { product: Product }
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity, id } = item

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <div className="relative h-16 w-16 overflow-hidden rounded-md bg-muted">
        {product.image_url ? (
          <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/10">
            <span className="text-xs text-secondary">Sin imagen</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          {formatPrice(product.price)} x {quantity}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Reducir cantidad</span>
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onUpdateQuantity(id, quantity + 1)}>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Aumentar cantidad</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => onRemove(id)}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Eliminar</span>
        </Button>
      </div>
    </div>
  )
}

