import type { Metadata } from "next"
import { resolveServiceProduct } from "@/lib/woocommerce"

const BASE_URL = "https://www.astrokaleido.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await resolveServiceProduct(slug).catch(() => null)

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
