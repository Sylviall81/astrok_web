"use client"

import { useProducts } from "@/context/products-context"
import { useState, useRef } from "react"
//import ProductCard from "./product-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { WCProduct } from "@/lib/woocommerce"
import { ProductCard } from "./ui/product-card"
import { useCart } from "@/context/cart-context"
import { useNotification } from "@/context/notification-context"

// Helper para obtener la imagen principal del producto
// const getProductImage = (product: WCProduct): string => {
//   return product.images?.[0]?.src || "/placeholder.svg"
// }

// // Helper para limpiar el HTML de la descripción
// const stripHtml = (html: string): string => {
//   return html.replace(/<[^>]*>/g, "").trim()
// }

export default function FeaturedProductsSection() {
  const { products, loading, error } = useProducts()

  // Solo mostramos productos publicados de tipo sinfo producto
  const productList = products.filter(p =>
    p.categories?.some(c => c.slug === "infoproductos")
  )

  // Los 3 primeros como destacados, el resto en slider
  const featuredProducts = productList.slice(0, 3)
  const otherProducts = productList .slice(3)

  const { addToCart } = useCart()
    const { showNotification } = useNotification()

    const handleAddToCart = (product: WCProduct) => {
    addToCart(product)
    showNotification("success", "Añadido al carrito", `${product.name} se ha añadido a tu carrito`)
  }

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
    <section className="py-8 md:py-12">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="section-title">Productos Destacados</h2>
          <p className="section-subtitle mx-auto">
            Descubre cómo la astrología psicológica puede ayudarte a comprender mejor tu camino y potencial.
          </p>
        </div>

        {loading ? (
          <p className="text-center">Cargando servicios...</p>
        ) : error ? (
          <p className="text-center text-red-500">No se pudieron cargar los productos</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredProducts.map((product) => (
               
                 <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}  // necesitas definir esto
                />
              ))}
            </div>

            {otherProducts.length > 0 && (
              <>
                <div className="mb-4">
                  <h3 className="text-2xl font-lato font-semibold text-primary mb-3">Otros Productos</h3>
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
                    className="flex items-stretch overflow-x-auto gap-4 pb-4"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {otherProducts.map((product) => (
                      <div key={product.id} className="flex-none w-56">
                        <ProductCard
                          product={product}
                          onAddToCart={handleAddToCart}
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