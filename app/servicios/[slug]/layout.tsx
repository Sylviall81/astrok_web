import type { Metadata } from "next"
import { getProductBySlug, getProductById } from "@/lib/woocommerce"

const BASE_URL = "https://www.astrokaleido.com"

// Resuelve el producto igual que la página cliente: por slug real o, si el
// segmento es numérico, por el ID de WooCommerce (para poder apuntar el
// canonical siempre a la URL "oficial" por slug y evitar contenido duplicado).
async function resolveProduct(slug: string) {
  if (/^\d+$/.test(slug)) {
    try {
      return await getProductById(Number(slug))
    } catch {
      return null
    }
  }
  return getProductBySlug(slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await resolveProduct(slug).catch(() => null)

  if (!product) return {}

  const canonicalSlug = product.slug || slug

  const getMeta = (key: string) =>
    product.meta_data?.find(m => m.key === key)?.value?.trim() || ""

  const rankMathTitle = getMeta("rank_math_title")
  const rankMathDescription = getMeta("rank_math_description")

  const title = rankMathTitle || `${product.name} | Kaleidoscope Astrología`
  const description =
    rankMathDescription ||
    product.short_description?.replace(/<[^>]+>/g, "").trim() ||
    undefined

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/servicios/${canonicalSlug}`,
    },
  }
}

export default function ServicioLayout({ children }: { children: React.ReactNode }) {
  return children
}
