import { notFound } from "next/navigation"
import { getProductVariations, resolveProduct } from "@/lib/woocommerce"
import { ProductDetailClient } from "./product-detail-client"

export const revalidate = 300

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // Un fallo de la API se propaga (5xx, Google reintenta); solo un producto
  // inexistente o no publicado devuelve 404.
  const product = await resolveProduct(slug)
  if (!product || product.status !== "publish") notFound()

  const variations =
    product.type === "variable" && product.variations?.length > 0
      ? await getProductVariations(product.id).catch(() => [])
      : []

  return <ProductDetailClient initialProduct={product} initialVariations={variations} />
}
