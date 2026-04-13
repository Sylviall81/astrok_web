"use client"

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/context/products-context"
import { useNotification } from "@/context/notification-context"
import { useCart } from "@/context/cart-context"
import type { WCProduct, WCVariation } from "@/lib/woocommerce"
import DOMPurify from "dompurify"



export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { products, loading } = useProducts()
  const [product, setProduct] = useState<WCProduct | null>(null)
  const [selectedVariation, setSelectedVariation] = useState<WCVariation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showNotification } = useNotification()
  const { addToCart } = useCart()

  

  useEffect(() => {
    if (loading) return

    const found = products.find(p => p.slug === slug || p.id.toString() === slug)

    if (found) {
      setProduct(found)
      if (found.type === "variable" && found.variations?.length > 0) {
        fetch(`/api/products/${found.id}/variations`)
          .then(res => res.json())
          .then(data => {
            setSelectedVariation(data[0] ?? null)
          })
          .catch(err => console.error("Error cargando variaciones:", err))
      }
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

const cleanHtml = useMemo(() => {
  return DOMPurify.sanitize(
    product?.description || product?.short_description || ""
  )
}, [product])

  const displayPrice = selectedVariation?.price || product?.price || "0"

 



  const handleAddToCart = () => {
  if (!product) return

    const productToAdd =  product

    addToCart(productToAdd)
    showNotification("success", "Añadido al carrito", `${productToAdd.name} se ha añadido a tu carrito`)
  }

  if (isLoading || loading) {
    return <div className="container py-16 text-center"><p>Cargando producto...</p></div>
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-lato font-semibold text-primary mb-6">Producto no encontrado</h1>
        <p className="mb-8">Lo sentimos, el producto que buscas no está disponible.</p>
        <Link href="/tienda" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          Ver otros productos
        </Link>
      </div>
    )
  }

  const imagen = getProductImage(product)
  const categoria = product.categories?.[0]?.name || ""
  


  return (
    <section className="py-16">
      <div className="container-custom">
        <Link href="/tienda" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la tienda
        </Link>

        <div className="grid gap-8 md:grid-cols-2">

          {/* Imagen */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {imagen !== "/placeholder.svg" ? (
              <Image src={imagen} alt={product.name} fill className="rounded-lg w-full object-cover" priority />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary/10">
                <span className="text-secondary">Sin imagen</span>
              </div>
            )}
          </div>

        {/* Info */}
            <div>
              <h1 className="font-lora text-3xl md:text-4xl font-semibold mb-4">{product.name}</h1>

              <div className="flex items-center mb-6">
                <p className="text-2xl font-semibold text-primary">
                  {formatPrice(displayPrice)}
                </p>
              </div>

              {categoria && (
                <div className="mb-4">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {categoria}
                  </span>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map(tag => (
                    <Link
                      key={tag.id}
                      href={`/tienda?tag=${tag.slug}`}
                      className="inline-block bg-accent/20 text-primary/70 hover:bg-accent/40 transition-colors px-3 py-1 rounded-full text-xs"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}

              
              {/* Descripción */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Descripción</h2>
                <div className="prose prose-sm dark:prose-invert max-w-none
                        prose-headings:font-lora prose-headings:text-primary
                        prose-p:text-foreground prose-p:leading-relaxed
                        prose-li:text-foreground
                        prose-strong:text-primary prose-strong:font-semibold
                        prose-a:!text-primary hover:prose-a:underline
                        prose-ul:my-2 prose-li:my-0.5"
                      dangerouslySetInnerHTML={{ __html: cleanHtml }}
                    /> </div>
             

               <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button onClick={handleAddToCart} className="btn-primary hover:bg-primary/90">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Añadir al carrito
                </Button>
              </div>

            </div>
        </div>
      </div>
    </section>
  )
}