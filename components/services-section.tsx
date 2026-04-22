"use client"

import { useProducts } from "@/context/products-context"
import Link from "next/link"
import ServiceCard from "./service-card"
import type { WCProduct } from "@/lib/woocommerce"

// Helper para obtener la imagen principal del producto
const getProductImage = (product: WCProduct): string => {
  return product.images?.[0]?.src || "/placeholder.svg"
}

// Helper para limpiar el HTML de la descripción
const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, "").trim()
}

// Slugs que siempre aparecen primero, en este orden. Actualiza si cambia el slug en WooCommerce.
const FEATURED_SLUGS = [
  "sesion-integral-carta-natal-y-anual",
  "sesion-individual-pack-3", // ← reemplaza con el slug real del pack
  "sesion-de-carta-astral",
]

function sortServices(products: WCProduct[]): WCProduct[] {
  const featured = FEATURED_SLUGS
    .map(slug => products.find(p => p.slug === slug))
    .filter(Boolean) as WCProduct[]
  const others = products.filter(p => !FEATURED_SLUGS.includes(p.slug))
  return [...featured, ...others]
}

export default function ServicesSection() {
  const { products, loading, error } = useProducts()

  const featuredServices = sortServices(
    products.filter(p => p.categories?.some(c => c.slug === "servicios"))
  ).slice(0, 3)

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
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

            <div className="text-center">
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 text-primary font-lato font-semibold hover:text-accent transition-colors"
              >
                Ver todos los servicios
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}