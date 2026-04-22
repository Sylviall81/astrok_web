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

const esInfoproducto = product.categories?.some(c => c.slug === "infoproductos")

const href = esInfoproducto
  ? `/tienda/${product.slug || product.id}`
  : `/servicios/${product.slug || product.id}`

  const stripHtml = (html: string) =>
    html.replace(/<[^>]*>/g, "").trim()

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
      <Link href={href}>
        <div className="relative h-48 bg-muted flex-shrink-0">
          {imagen !== "/placeholder.svg" ? (
            <Image src={imagen} alt={product.name} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-secondary/10">
              <span className="text-secondary">Sin imagen</span>
            </div>
          )}
        </div>
      </Link>
      <CardHeader className="pb-2 pt-4 px-4">
        <Link href={href}>
          <CardTitle className="text-base">{product.name}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="px-4 pb-2 flex flex-col flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
          {stripHtml(product.short_description || product.description || "")}
        </p>
        <Link
          href={href}
          className="text-sm text-primary font-lato font-semibold hover:text-accent transition-colors mt-2"
        >
          Saber más →
        </Link>
        <p className="mt-3 text-xl font-semibold text-primary">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className="px-4 pb-4 mt-auto">
        {esInfoproducto ? (
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full btn-primary hover:bg-primary/90"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Añadir al carrito
          </Button>
        ) : (
          <Link href={`/servicios/${product.slug || product.id}`} className="w-full">
            <Button className="btn-primary w-full hover:bg-primary/90">
              Reservar
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}