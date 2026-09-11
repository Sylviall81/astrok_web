import type { MetadataRoute } from "next"
import { getAllPostSlugs, getPostsPage, POSTS_PER_PAGE } from "@/lib/wordpress"
import { getProductsByCategory } from "@/lib/woocommerce"

// Dominio canónico: www.astrokaleido.com — el apex (astrokaleido.com) hace
// redirect 308 a esta versión, así que el sitemap nunca debe usar el apex
// (Google lo marcaría como "página con redirección").
const BASE_URL = "https://www.astrokaleido.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/servicios`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/tienda`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/agenda`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/sobre-mi`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/politica-privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/politica-cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/aviso-legal`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]

  // Artículos del blog — se listan por slug real de WordPress (ya en minúsculas)
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const slugs = await getAllPostSlugs()
    blogRoutes = slugs.map((slug) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }))
  } catch {
    blogRoutes = []
  }

  // Páginas de paginación del blog (/blog/page/2, /blog/page/3, ...) — la página 1 es /blog
  let blogPaginationRoutes: MetadataRoute.Sitemap = []
  try {
    const { totalPages } = await getPostsPage(1, POSTS_PER_PAGE)
    blogPaginationRoutes = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({
      url: `${BASE_URL}/blog/page/${i + 2}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    }))
  } catch {
    blogPaginationRoutes = []
  }

  // Servicios (sesiones 1:1) e infoproductos (tienda) — solo productos publicados,
  // siempre por slug (nunca por ID numérico, que es una URL duplicada de la misma página)
  let servicioRoutes: MetadataRoute.Sitemap = []
  let tiendaRoutes: MetadataRoute.Sitemap = []
  try {
    const [servicios, infoproductos] = await Promise.all([
      getProductsByCategory("servicios"),
      getProductsByCategory("infoproductos"),
    ])
    servicioRoutes = servicios
      .filter((p) => p.status === "publish" && p.slug)
      .map((p) => ({
        url: `${BASE_URL}/servicios/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    tiendaRoutes = infoproductos
      .filter((p) => p.status === "publish" && p.slug)
      .map((p) => ({
        url: `${BASE_URL}/tienda/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
  } catch {
    servicioRoutes = []
    tiendaRoutes = []
  }

  return [
    ...staticRoutes,
    ...servicioRoutes,
    ...tiendaRoutes,
    ...blogRoutes,
    ...blogPaginationRoutes,
  ]
}
