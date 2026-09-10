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
// _embedded["wp:featuredmedia"] y "wp:term" disponibles con ?_embed=wp:featuredmedia,wp:term
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
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string; taxonomy: string }>>
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

// Artículos por página en el índice del blog (/blog y /blog/page/[n])
export const POSTS_PER_PAGE = 9

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

// Listar posts de forma paginada (para el índice del blog con paginador)
// Devuelve los posts de la página pedida y el total de páginas (cabecera X-WP-TotalPages)
export async function getPostsPage(
  page: number,
  perPage: number,
): Promise<{ posts: WPPost[]; totalPages: number }> {
  const url = new URL(`${WP_API_BASE}/posts`)
  const params: Record<string, string> = {
    status: "publish",
    orderby: "date",
    order: "desc",
    _embed: "wp:featuredmedia",
    per_page: String(perPage),
    page: String(page),
  }
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v))

  const res = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; AstrokWeb/1.0)",
    },
    signal: AbortSignal.timeout(12000),
  })

  // WordPress devuelve 400 (rest_post_invalid_page_number) si se pide una página fuera de rango
  if (res.status === 400) {
    return { posts: [], totalPages: 1 }
  }

  if (!res.ok) {
    throw new Error(`WordPress API error: ${res.status} ${res.statusText} — ${url.toString()}`)
  }

  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? "1")
  const raw = (await res.json()) as WPPostRaw[]
  return { posts: raw.map(normalizePost), totalPages: Number.isNaN(totalPages) ? 1 : totalPages }
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

// ─── Post enriquecido (slug + categorías + tags + imagen) ────────────────────
// Una sola petición con _embed=wp:featuredmedia,wp:term devuelve todo junto

export async function getFullPostBySlug(slug: string): Promise<WPPostFull | null> {
  const raw = await wpFetch<WPPostRaw[]>("/posts", {
    slug,
    status: "publish",
    _embed: "wp:featuredmedia,wp:term",
  })
  if (!raw[0]) return null

  const post = normalizePost(raw[0])
  const allTerms = (raw[0]._embedded?.["wp:term"] ?? []).flat()

  const categoriesData = allTerms
    .filter((t) => t.taxonomy === "category")
    .map(({ id, name, slug }) => ({ id, name, slug }))

  const tagsData = allTerms
    .filter((t) => t.taxonomy === "post_tag")
    .map(({ id, name, slug }) => ({ id, name, slug }))

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
