"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/context/products-context"
import { useNotification } from "@/context/notification-context"
import type { WCProduct } from "@/lib/woocomerce"
import { useCart } from "@/context/cart-context"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { products, loading } = useProducts()
  const [product, setProduct] = useState<WCProduct | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showNotification } = useNotification()
  const { addToCart } = useCart()

  useEffect(() => {
    if (loading) return

    // Buscamos por slug o por id (WooCommerce devuelve el id como número)
    const found = products.find(
      (p) => p.slug === slug || p.id.toString() === slug
    )

    if (found) {
      setProduct(found)
    } else {
      showNotification("error", "Error", "No se pudo cargar el producto")
    }

    setIsLoading(false)
  }, [slug, products, loading, showNotification])

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(parseFloat(price))
  }

  const getProductImage = (product: WCProduct): string => {
    return product.images?.[0]?.src || "/placeholder.svg"
  }


  const handleAddToCart = () => {
  if (!product) return
  addToCart(product)
  showNotification("success", "Añadido al carrito", `${product.name} se ha añadido a tu carrito`)
}
 
  if (isLoading || loading) {
    return <div className="container py-16 text-center"><p>Cargando producto...</p></div>
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-lato font-semibold text-primary mb-6">Producto no encontrado</h1>
        <p className="mb-8">Lo sentimos, el producto que buscas no está disponible.</p>
        <Link href="/servicios" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          Ver todos los servicios
        </Link>
      </div>
    )
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const imagen = getProductImage(product)
  const categoria = product.categories?.[0]?.name || ""

  return (
    <section className="py-16">
      <div className="container">
        <Link href="/servicios" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a servicios
        </Link>

        <div className="grid gap-8 md:grid-cols-2">

          {/* Imagen */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {imagen !== "/placeholder.svg" ? (
              <Image
                src={imagen}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary/10">
                <span className="text-secondary">Sin imagen</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">{product.name}</h1>

            <div className="flex items-center mb-6">
              <p className="text-2xl font-semibold text-primary">
                {formatPrice(product.price)}
              </p>
            </div>

            {categoria && (
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {categoria}
                </span>
              </div>
            )}

            {/* ✅ Fix HTML: usamos dangerouslySetInnerHTML para renderizar el HTML de WC */}
            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.description || product.short_description || "",
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button onClick={handleAddToCart} className="bg-primary hover:bg-primary/90">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Añadir al carrito
              </Button>
              <Link href="/agenda" passHref>
                <Button variant="outline">Reservar sesión</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}