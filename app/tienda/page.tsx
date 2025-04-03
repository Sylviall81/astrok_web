"use client"

import { useProducts } from "@/context/products-context"
import { ProductList } from "./product-list"

export default function ShopPage() {
  const { products, loading, error } = useProducts()

  return (

   
   
      <div className="container py-10">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-6">Servicios</h1>
          <p className="text-xl text-secondary">
            Descubre cómo la astrología psicológica puede ayudarte a comprender mejor tu camino y potencial.
          </p>
      
      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <ProductList products={products} />
      )}
    </div>
    </div>
   
   
  )
}