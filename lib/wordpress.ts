// lib/wordpress.ts
// Capa de abstracción para la WordPress REST API (blog posts)
// Sigue el mismo patrón que lib/woocommerce.ts

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://kaleidoastro.local"
const WP_API_BASE = `${WP_URL}/wp-json/wp/v2`

const getAuthHeader = (): string => {
  const user = process.env.WC_AUTH_USER
  const password = process.env.WC_AUTH_PASSWORD
  const credentials = Buffer.from(`${user}:${password}`).toString("base64")
  return `Basic ${credentials}`
}

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type WPCategory = {
  id: number
  name: string
  slug: string
}

export type WPTag = {
  id: number
  name: string
  slug: string
}

export type WPPost = {
  id: number
  slug: string
  status: string
  date: string
  modified: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  featured_media: number
  categories: number[]
  tags: number[]
  // Rank Math SEO (si está instalado)
  rank_math_description?: string
  rank_math_title?: string
}

// Post enriquecido con categorías, tags e imagen ya resueltos
export type WPPostFull = WPPost & {
  categoriesData: WPCategory[]
  tagsData: WPTag[]
  featuredImageUrl: string | null
}

// ─── Fetch base ───────────────────────────────────────────────────────────────

async function wpFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${WP_API_BASE}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: getAuthHeader(),
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // revalida cada hora — ajusta según necesites
  })

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText} — ${url.toString()}`)
  }

  return res.json() as Promise<T>
}

// ─── Posts ────────────────────────────────────────────────────────────────────

// Listar posts publicados (para el índice del blog)
export async function getPosts(params?: Record<string, string>): Promise<WPPost[]> {
  return wpFetch<WPPost[]>("/posts", {
    status: "publish",
    per_page: "100",
    orderby: "date",
    order: "desc",
    ...params,
  })
}

// Obtener un post por su slug (para la página de detalle)
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>("/posts", { slug, status: "publish" })
  return posts[0] ?? null
}

// Obtener todos los slugs publicados (para generateStaticParams)
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getPosts({ per_page: "100", _fields: "slug" })
  return posts.map((p) => p.slug)
}

// ─── Categorías y Tags ────────────────────────────────────────────────────────

export async function getCategoryById(id: number): Promise<WPCategory | null> {
  try {
    return await wpFetch<WPCategory>(`/categories/${id}`)
  } catch {
    return null
  }
}

export async function getTagById(id: number): Promise<WPTag | null> {
  try {
    return await wpFetch<WPTag>(`/tags/${id}`)
  } catch {
    return null
  }
}

// ─── Imagen destacada ─────────────────────────────────────────────────────────

export async function getFeaturedImageUrl(mediaId: number): Promise<string | null> {
  if (!mediaId) return null
  try {
    const media = await wpFetch<{ source_url: string }>(`/media/${mediaId}`)
    return media.source_url ?? null
  } catch {
    return null
  }
}

// ─── Post enriquecido (slug + categorías + tags + imagen) ────────────────────

export async function getFullPostBySlug(slug: string): Promise<WPPostFull | null> {
  const post = await getPostBySlug(slug)
  if (!post) return null

  const [categoriesData, tagsData, featuredImageUrl] = await Promise.all([
    Promise.all(post.categories.map(getCategoryById)).then((cats) =>
      cats.filter(Boolean) as WPCategory[]
    ),
    Promise.all(post.tags.map(getTagById)).then((tags) =>
      tags.filter(Boolean) as WPTag[]
    ),
    getFeaturedImageUrl(post.featured_media),
  ])

  return { ...post, categoriesData, tagsData, featuredImageUrl }
}

// ─── Helpers de formato ───────────────────────────────────────────────────────

// Formatea una fecha ISO a formato legible en español
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

// Calcula tiempo de lectura estimado a partir del HTML del contenido
export function readingTime(htmlContent: string): string {
  const text = htmlContent.replace(/<[^>]+>/g, "")
  const words = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min`
}
