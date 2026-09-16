import Link from "next/link"
import { resolveServiceProduct } from "@/lib/woocommerce"
import { ProductDetailClient } from "./product-detail-client"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await resolveServiceProduct(slug).catch(() => null)

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

  return <ProductDetailClient product={product} />
}
