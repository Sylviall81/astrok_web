"use client"

import { useProducts } from "@/context/products-context"
import { ProductList } from "./product-list"
import type { WCProduct } from "@/lib/woocommerce"

// Mismo orden que en la sección de servicios del home
const FEATURED_SLUGS = [
  "sesion-integral-carta-natal-y-anual",
  "sesion-de-carta-astral",
  "SLUG-DEL-PACK-3-SESIONES", // ← reemplaza con el slug real del pack
]

function sortServices(products: WCProduct[]): WCProduct[] {
  const featured = FEATURED_SLUGS
    .map(slug => products.find(p => p.slug === slug))
    .filter(Boolean) as WCProduct[]
  const others = products.filter(p => !FEATURED_SLUGS.includes(p.slug))
  return [...featured, ...others]
}

export default function ServiciosPage() {
  const { products, loading, error } = useProducts()

  const servicios = sortServices(
    products.filter(p => p.categories?.some(c => c.slug === "servicios"))
  )

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-6">Servicios</h1>
          <p className="text-xl text-secondary">
            Descubre cómo la astrología psicológica puede ayudarte a comprender mejor tu camino y potencial.
          </p>
        </div>

        {loading ? (
          <p className="text-center">Cargando servicios...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ProductList products={servicios} />
        )}
      </div>
    </div>
  )
}