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

  return {
    title: `${product.name} | Kaleidoscope Astrología`,
    description: product.short_description?.replace(/<[^>]+>/g, "").trim() || undefined,
    alternates: {
      canonical: `${BASE_URL}/tienda/${canonicalSlug}`,
    },
  }
}

export default function TiendaProductLayout({ children }: { children: React.ReactNode }) {
  return children
}
