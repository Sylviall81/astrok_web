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
  const [variations, setVariations] = useState<WCVariation[]>([])
  const [selectedVariation, setSelectedVariation] = useState<WCVariation | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showNotification } = useNotification()
  const { addToCart } = useCart()

  

  useEffect(() => {
    if (loading) return

    const found = products.find(p => p.slug === slug || p.id.toString() === slug)

    if (found) {
      setProduct(found)
      setSelectedImage(found.images?.[0]?.src ?? null)
      if (found.type === "variable" && found.variations?.length > 0) {
        fetch(`/api/products/${found.id}/variations`)
          .then(res => res.json())
          .then(data => {
            setVariations(data)
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


const cleanShortHtml = useMemo(() => {
  return DOMPurify.sanitize(product?.short_description || "")
}, [product])

const cleanHtml = useMemo(() => {
  return DOMPurify.sanitize(product?.description || "")
}, [product])

  const displayPrice = selectedVariation?.price || product?.price || "0"

 



  const handleVariationChange = (variationId: string) => {
    const match = variations.find(v => v.id.toString() === variationId)
    if (match) {
      setSelectedVariation(match)
      if (match.image?.src) setSelectedImage(match.image.src)
    }
  }

  const handleAddToCart = () => {
    if (!product) return

    const productToAdd = selectedVariation
      ? {
          ...product,
          price: selectedVariation.price,
          name: `${product.name} — ${selectedVariation.attributes.map(a => a.option).join(", ")}`,
        }
      : product

    addToCart(productToAdd, selectedVariation?.id)
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

  const categoria = product.categories?.[0]?.name || ""
  const allImages = product.images ?? []
  const displayImage = selectedImage || allImages[0]?.src || "/placeholder.svg"

  return (
    <section className="py-16">
      <div className="container-custom">
        <Link href="/tienda" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la tienda
        </Link>

        {/* Grid superior: imagen + info esencial */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">

          {/* Imagen principal + miniaturas */}
          <div className="flex flex-col gap-3">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              {displayImage !== "/placeholder.svg" ? (
                <Image src={displayImage} alt={product.name} fill className="rounded-lg w-full object-cover" priority />
              ) : (
                <div className="flex h-full items-center justify-center bg-secondary/10">
                  <span className="text-secondary">Sin imagen</span>
                </div>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {allImages.map((img, i) => (
                  <button
                    key={img.id ?? i}
                    onClick={() => setSelectedImage(img.src)}
                    className={`relative h-16 w-16 rounded-md overflow-hidden border-2 transition-colors flex-shrink-0 ${
                      displayImage === img.src ? "border-primary" : "border-transparent hover:border-primary/50"
                    }`}
                  >
                    <Image src={img.src} alt={img.alt || product.name} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="font-lato text-3xl md:text-4xl font-semibold mb-4">{product.name}</h1>

            <p className="text-2xl font-semibold text-primary mb-6">
              {formatPrice(displayPrice)}
            </p>

            {categoria && (
              <div className="mb-4">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {categoria}
                </span>
              </div>
            )}

            {product.type === "variable" && variations.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {variations[0].attributes[0]?.name ?? "Tipo"}
                </label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedVariation?.id.toString() ?? ""}
                  onChange={e => handleVariationChange(e.target.value)}
                >
                  {variations.map(v => (
                    <option key={v.id} value={v.id.toString()}>
                      {v.attributes.map(a => a.option).join(", ")} — {formatPrice(v.price)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {cleanShortHtml && (
              <div
                className="prose prose-sm dark:prose-invert max-w-none mb-6
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:my-1
                  prose-strong:text-primary prose-strong:font-semibold
                  prose-ul:my-2 prose-li:my-0.5 prose-li:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: cleanShortHtml }}
              />
            )}

            <div className="mt-auto">
              <Button onClick={handleAddToCart} className="btn-primary w-full hover:bg-primary/90 text-base py-5">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Añadir al carrito
              </Button>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
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
          </div>
        </div>

        {/* Descripción completa — ancho completo debajo del grid */}
        <div className="border-t pt-10">
          <h2 className="text-xl font-semibold mb-4">Descripción</h2>
          <div
            className="prose prose-sm dark:prose-invert max-w-none
              prose-headings:font-lora prose-headings:text-primary
              prose-p:text-foreground prose-p:leading-relaxed
              prose-li:text-foreground
              prose-strong:text-primary prose-strong:font-semibold
              prose-a:!text-primary hover:prose-a:underline
              prose-ul:my-2 prose-li:my-0.5"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        </div>
      </div>
    </section>
  )
}