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
import { sanitizeHtml } from "@/lib/sanitize"



export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { products, loading } = useProducts()
  const [product, setProduct] = useState<WCProduct | null>(null)
  const [variations, setVariations] = useState<WCVariation[]>([])
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

  const getProductImage = (product: WCProduct): string => {
    return product.images?.[0]?.src || "/placeholder.svg"
  }


  const displayPrice = selectedVariation?.price || product?.price || "0"

  const modalidadAttr = product?.attributes?.find(
    a => a.name.toLowerCase() === "modalidad"
  )

  const handleVariationChange = (option: string) => {
    const match = variations.find(v =>
      v.attributes.some(a => a.option === option)
    )
    if (match) setSelectedVariation(match)
  }

  const cleanHtml = useMemo(() => {
  return sanitizeHtml(
    product?.description || product?.short_description || ""
  )
}, [product])

  const handleAddToCart = () => {
  if (!product) return
  if (esVariable && !selectedVariation) {
    showNotification("error", "Selecciona una opción", "Por favor selecciona una modalidad antes de añadir al carrito")
    return
  }
    const productToAdd = selectedVariation
      ? {
          ...product,
          price: selectedVariation.price,
          name: `${product.name} — ${selectedVariation.attributes.map(a => a.option).join(", ")}`,
        }
      : product

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
        <Link href="/servicios" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          Ver todos los servicios
        </Link>
      </div>
    )
  }

  const imagen = getProductImage(product)
  const categoria = product.categories?.[0]?.name || ""
  const esVariable = product.type === "variable"
  



  return (
    <section className="py-16">
      <div className="container-custom">
        <Link href="/servicios" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a servicios
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
                      href={`/servicios?tag=${tag.slug}`}
                      className="inline-block bg-accent/20 text-primary/70 hover:bg-accent/40 transition-colors px-3 py-1 rounded-full text-xs"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Selector de modalidad */}
              {esVariable && modalidadAttr && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    {modalidadAttr.name}
                  </label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    onChange={e => handleVariationChange(e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>Selecciona una modalidad</option>
                    {modalidadAttr.options.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
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


                     {/* Botones compra y reserva: acciones*/}

                  <div className="flex flex-col gap-4 mb-8">

                    {/* Botón principal — ver disponibilidad primero */}
                    <Link href="/agenda" passHref className="w-full sm:w-auto">
                      <Button className="btn-primary w-full sm:w-auto hover:bg-primary/90 text-base py-5">
                        Consulta disponibilidad y reserva
                      </Button>
                    </Link>

                    {/* Aviso de flexibilidad — neutraliza el miedo a pagar sin hueco */}
                    <p className="text-xs text-muted-foreground -mt-2">
                      ¿Prefieres reservar ahora?{" "}
                      <button
                        onClick={handleAddToCart}
                        className="underline underline-offset-2 hover:text-primary transition-colors"
                      >
                        Añadir al carrito y pagar
                      </button>
                      {" "}— tienes hasta 3 meses para agendar tu sesión.
                    </p>

                  </div>


              {/* <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button onClick={handleAddToCart} className="btn-primary hover:bg-primary/90">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Añadir al carrito
                </Button>
                <Link href="/agenda" passHref>
                  <Button variant="outline">Reservar sesión</Button>
                </Link>
              </div> */}

            </div>
        </div>
      </div>
    </section>
  )
}