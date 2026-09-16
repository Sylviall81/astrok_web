"use client"

import { useState, useMemo, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotification } from "@/context/notification-context"
import type { WCProduct, WCVariation } from "@/lib/woocommerce"
import { sanitizeHtml } from "@/lib/sanitize"

export function ProductDetailClient({ product }: { product: WCProduct }) {
  const router = useRouter()
  const [variations, setVariations] = useState<WCVariation[]>([])
  const [selectedVariation, setSelectedVariation] = useState<WCVariation | null>(null)
  const [selectedModalidad, setSelectedModalidad] = useState<string>("")
  const [selectedImage, setSelectedImage] = useState<string | null>(product.images?.[0]?.src ?? null)
  const { showNotification } = useNotification()

  useEffect(() => {
    if (product.type === "variable" && product.variations?.length > 0) {
      fetch(`/api/products/${product.id}/variations`)
        .then(res => res.json())
        .then(data => {
          setVariations(data)
          setSelectedVariation(data[0] ?? null)
        })
        .catch(err => console.error("Error cargando variaciones:", err))
    }
  }, [product.id, product.type, product.variations])

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(parseFloat(price))
  }

  const displayPrice = selectedVariation?.price || product.price || "0"

  const modalidadAttr = product.attributes?.find(
    a => a.name.toLowerCase() === "modalidad"
  )

  const handleVariationChange = (option: string) => {
    setSelectedModalidad(option)
    const match = variations.find(v =>
      v.attributes.some(a => a.option === option)
    )
    if (match) setSelectedVariation(match)
  }

  const getCalLink = (modalidad: string): string | null => {
    if (!product.meta_data) return null
    const key = modalidad === "online" ? "cal_link_online" : "cal_link_presencial"
    return product.meta_data.find(m => m.key === key)?.value || null
  }

  const esVariable = product.type === "variable"

  const handleReservar = () => {
    const modalidadKey = selectedModalidad.toLowerCase()

    if (esVariable && !modalidadKey) {
      showNotification("error", "Selecciona una modalidad", "Por favor elige online o presencial antes de reservar")
      return
    }

    const calLink = getCalLink(modalidadKey)

    if (calLink) {
      router.push(`/agenda?cal=${encodeURIComponent(calLink)}`)
    } else if (esVariable) {
      showNotification("error", "Enlace no configurado", "Este servicio no tiene enlace de reserva configurado. Contacta con nosotros.")
    } else {
      router.push("/agenda")
    }
  }

  const cleanShortHtml = useMemo(
    () => sanitizeHtml(product.short_description || ""),
    [product.short_description]
  )

  const cleanHtml = useMemo(
    () => sanitizeHtml(product.description || ""),
    [product.description]
  )

  const categoria = product.categories?.[0]?.name || ""
  const allImages = product.images ?? []
  const displayImage = selectedImage || allImages[0]?.src || "/placeholder.svg"

  return (
    <section className="py-16">
      <div className="container-custom">
        <Link href="/servicios" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a servicios
        </Link>

        {/* Grid superior: imagen + info esencial */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">

          {/* Imagen principal + miniaturas */}
          <div className="flex flex-col gap-3">
            <div className="relative flex-1 min-h-[400px] rounded-lg overflow-hidden">
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
                {esVariable && !selectedModalidad && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Selecciona una modalidad para continuar
                  </p>
                )}
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

            {/* Acciones */}
            <div className="flex flex-col gap-3 mt-auto">
              <Button
                className="btn-primary w-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-base py-5"
                onClick={handleReservar}
                disabled={esVariable && !selectedModalidad}
              >
                Reservar
              </Button>
              <p className="text-xs text-muted-foreground">
                ¿Prefieres comprar ahora y elegir fecha después?{" "}
                <Link
                  href="/tienda/bono-regalo-sesiones-individuales"
                  className="underline underline-offset-2 hover:text-primary transition-colors"
                >
                  Consulta nuestros bono regalo
                </Link>
                {" "}— válido 4 meses desde la compra.
              </p>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
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
