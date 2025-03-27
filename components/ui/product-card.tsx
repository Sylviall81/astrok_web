"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/supabase"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 bg-muted">
        {product.image_url ? (
          <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary/10">
            <span className="text-secondary">Sin imagen</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
        {product.duration && <p className="mt-2 text-sm font-medium">Duración: {product.duration} minutos</p>}
        <p className="mt-4 text-xl font-semibold text-primary">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onAddToCart(product)} className="w-full bg-primary hover:bg-primary/90">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}

