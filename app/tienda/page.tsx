"use client"

import { useProducts } from "@/context/products-context"
import { ProductList } from "@/app/servicios/product-list"

export default function TiendaPage() {
  const { products, loading, error } = useProducts()

  const infoproductos = products.filter(p =>
    p.categories?.some(c => c.slug === "infoproductos")
  )

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-6">Tienda</h1>
          <p className="text-xl text-secondary">
            Recursos digitales para acompañarte en tu camino de autoconocimiento.
          </p>
        </div>

        {loading ? (
          <p className="text-center">Cargando productos...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <ProductList products={infoproductos} />
        )}
      </div>
    </div>
  )
}