"use client"

import { useProducts } from "@/context/products-context"
import { useState, useRef } from "react"
import ServiceCard from "./service-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { WCProduct } from "@/lib/woocommerce"

// Helper para obtener la imagen principal del producto
const getProductImage = (product: WCProduct): string => {
  return product.images?.[0]?.src || "/placeholder.svg"
}

// Helper para limpiar el HTML de la descripción
const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, "").trim()
}

export default function ServicesSection() {
  const { products, loading, error } = useProducts()

  // Solo mostramos productos publicados de tipo servicio (categoría "servicios")
  const servicios = products.filter(p =>
    p.categories?.some(c => c.slug === "servicios")
  )

  // Los 3 primeros como destacados, el resto en slider
  const featuredServices = servicios.slice(0, 3)
  const otherServices = servicios.slice(3)

  const sliderRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth } = sliderRef.current
      const scrollAmount = clientWidth * 0.8
      const maxScroll = scrollWidth - clientWidth
      const newPosition =
        direction === "right"
          ? Math.min(scrollPosition + scrollAmount, maxScroll)
          : Math.max(scrollPosition - scrollAmount, 0)

      sliderRef.current.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  return (
    <section className="py-16 md:py-24 section-alt">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Servicios Destacados</h2>
          <p className="section-subtitle mx-auto">
            Descubre cómo la astrología psicológica puede ayudarte a comprender mejor tu camino y potencial.
          </p>
        </div>

        {loading ? (
          <p className="text-center">Cargando servicios...</p>
        ) : error ? (
          <p className="text-center text-red-500">No se pudieron cargar los servicios</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredServices.map((product) => (
                <ServiceCard
                  key={product.id}
                  title={product.name}
                  description={stripHtml(product.short_description || product.description || "")}
                  image={getProductImage(product)}
                  slug={product.slug || product.id.toString()}
                />
              ))}
            </div>

            {otherServices.length > 0 && (
              <>
                <div className="mb-4">
                  <h3 className="text-2xl font-lato font-semibold text-primary mb-6">Otros Servicios</h3>
                </div>
                <div className="relative">
                  <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md text-primary hover:text-accent transition-colors"
                    aria-label="Anterior"
                    disabled={scrollPosition === 0}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <div
                    ref={sliderRef}
                    className="flex overflow-x-auto gap-6 pb-4"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {otherServices.map((product) => (
                      <div key={product.id} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <ServiceCard
                          title={product.name}
                          description={stripHtml(product.short_description || product.description || "")}
                          image={getProductImage(product)}
                          slug={product.slug || product.id.toString()}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md text-primary hover:text-accent transition-colors"
                    aria-label="Siguiente"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}