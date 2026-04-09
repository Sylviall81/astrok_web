"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import type { WCProduct } from "@/lib/woocommerce"

interface ProductCardProps {
  product: WCProduct
  onAddToCart: (product: WCProduct) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(parseFloat(price))
  }

  const imagen = product.images?.[0]?.src || "/placeholder.svg"

  const stripHtml = (html: string) =>
    html.replace(/<[^>]*>/g, "").trim()

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
       <Link
          href={`/servicios/${product.slug || product.id}`}
          className="relative block h-48 bg-muted"
        >
      <div className="relative h-48 bg-muted">
        {imagen !== "/placeholder.svg" ? (
          <Image src={imagen} alt={product.name} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-secondary/10">
            <span className="text-secondary">Sin imagen</span>
          </div>
        )}
       
      </div>
      </Link>
      <CardHeader>
         <Link
          href={`/servicios/${product.slug || product.id}`}
          //className="text-primary font-lato font-semibold hover:text-accent transition-colors"
        >
          <CardTitle className="text-xl">{product.name}</CardTitle>
        </Link>
        
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {stripHtml(product.short_description || product.description || "")}
        </p>
        <Link
          href={`/servicios/${product.slug || product.id}`}
          className="text-primary font-lato font-semibold hover:text-accent transition-colors"
        >
          Saber más →
        </Link>
        <p className="mt-4 text-xl font-semibold text-primary">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onAddToCart(product)} className="w-full btn-primary hover:bg-primary/90">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  )
}