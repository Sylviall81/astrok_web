// lib/wordpress.ts
// Capa de abstracción para la WordPress REST API (blog posts)
// Sigue el mismo patrón que lib/woocommerce.ts

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://kaleidoastro.local"
const WP_API_BASE = `${WP_URL}/wp-json/wp/v2`

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

// Tipo interno que representa la respuesta cruda de la REST API
// _embedded["wp:featuredmedia"] disponible con ?_embed=wp:featuredmedia (WordPress Core, sin plugins)
type WPPostRaw = {
  id: number
  slug: string
  status: string
  date: string
  modified: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featured_media: number
  categories: number[]
  tags: number[]
  rank_math_description?: string
  rank_math_title?: string
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string } | { code: string }>
  }
}

export type WPPost = {
  id: number
  slug: string
  status: string
  date: string
  modified: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featuredImageUrl: string | null   // campo normalizado para uso en componentes
  featured_media: number
  categories: number[]
  tags: number[]
  rank_math_description?: string
  rank_math_title?: string
}

// Post enriquecido con categorías y tags resueltos
export type WPPostFull = WPPost & {
  categoriesData: WPCategory[]
  tagsData: WPTag[]
}

// ─── Helper: normaliza WPPostRaw → WPPost ─────────────────────────────────────
// Extrae la imagen destacada de _embedded["wp:featuredmedia"] (WordPress Core, ?_embed)

function normalizePost(raw: WPPostRaw): WPPost {
  const { _embedded, ...rest } = raw
  const mediaItem = _embedded?.["wp:featuredmedia"]?.[0]
  const featuredImageUrl =
    mediaItem && "source_url" in mediaItem ? (mediaItem.source_url ?? null) : null
  return { ...rest, featuredImageUrl }
}

// ─── Fetch base ───────────────────────────────────────────────────────────────

async function wpFetch<T>(endpoint: string, params?: Record<string, string>, retries = 2): Promise<T> {
  const url = new URL(`${WP_API_BASE}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; AstrokWeb/1.0)",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    })

    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText} — ${url.toString()}`)
    }

    return res.json() as Promise<T>
  } catch (err) {
    if (retries > 0) {
      await new Promise((r) => setTimeout(r, 2000))
      return wpFetch<T>(endpoint, params, retries - 1)
    }
    throw err
  }
}

// ─── Posts ────────────────────────────────────────────────────────────────────

// Listar posts publicados (para el índice del blog y home section)
export async function getPosts(params?: Record<string, string>): Promise<WPPost[]> {
  const raw = await wpFetch<WPPostRaw[]>("/posts", {
    status: "publish",
    per_page: "100",
    orderby: "date",
    order: "desc",
    _embed: "wp:featuredmedia",
    ...params,
  })
  return raw.map(normalizePost)
}

// Obtener un post por su slug (para la página de detalle)
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const raw = await wpFetch<WPPostRaw[]>("/posts", { slug, status: "publish", _embed: "wp:featuredmedia" })
  return raw[0] ? normalizePost(raw[0]) : null
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

// ─── Imagen destacada (fallback por si se necesita resolver por ID) ───────────

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
// La imagen ya viene resuelta en WPPost.featuredImageUrl via jetpack_featured_media_url

export async function getFullPostBySlug(slug: string): Promise<WPPostFull | null> {
  const post = await getPostBySlug(slug)
  if (!post) return null

  const [categoriesData, tagsData] = await Promise.all([
    Promise.all(post.categories.map(getCategoryById)).then((cats) =>
      cats.filter(Boolean) as WPCategory[]
    ),
    Promise.all(post.tags.map(getTagById)).then((tags) =>
      tags.filter(Boolean) as WPTag[]
    ),
  ])

  return { ...post, categoriesData, tagsData }
}

// ─── Helpers de formato ───────────────────────────────────────────────────────

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function readingTime(htmlContent: string): string {
  const text = htmlContent.replace(/<[^>]+>/g, "")
  const words = text.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min`
}
