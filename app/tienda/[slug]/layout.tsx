import type { Metadata } from "next"
import { resolveProduct } from "@/lib/woocommerce"

const BASE_URL = "https://www.astrokaleido.com"

// resolveProduct (memoizado) es la misma llamada que hace la página, así que no
// se duplica la petición a WooCommerce. El canonical apunta siempre a la URL
// "oficial" por slug aunque se entre por ID, para evitar contenido duplicado.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await resolveProduct(slug).catch(() => null)

  if (!product || product.status !== "publish") return {}

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
