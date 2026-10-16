"use client"

import { useProducts } from "@/context/products-context"
import { ProductList } from "@/app/servicios/product-list"
import type { WCProduct } from "@/lib/woocommerce"

const isInfoproducto = (p: WCProduct) => p.categories?.some(c => c.slug === "infoproductos")

// La lista llega renderizada desde el servidor; el catálogo del navegador solo
// la refresca si ha cargado bien.
export function TiendaClient({ initialProducts }: { initialProducts: WCProduct[] }) {
  const { products, loading, error } = useProducts()
  const fresh = !loading && !error && products.length > 0 ? products.filter(isInfoproducto) : null

  return <ProductList products={fresh ?? initialProducts} />
}
