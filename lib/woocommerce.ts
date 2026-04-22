// lib/woocommerce.ts
// Capa de abstracción para la API REST de WooCommerce
// En local usamos Basic Auth con usuario/password de WP
// En producción con HTTPS usaremos consumer_key/consumer_secret

const WC_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://kaleidoastro.local"
const WC_API_BASE = `${WC_URL}/wp-json/wc/v3`

const getWCAuthParams = (): Record<string, string> => {
  const key = process.env.WC_CONSUMER_KEY
  const secret = process.env.WC_CONSUMER_SECRET
  if (key && secret) return { consumer_key: key, consumer_secret: secret }
  // Fallback Basic Auth para desarrollo local sin consumer keys
  const user = process.env.WC_AUTH_USER
  const password = process.env.WC_AUTH_PASSWORD
  return { consumer_key: user || "", consumer_secret: password || "" }
}

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type WCImage = {
  id: number
  src: string
  name: string
  alt: string
  thumbnail: string
}

export type WCCategory = {
  id: number
  name: string
  slug: string
}

export type WCAttribute = {
  id: number
  name: string
  options: string[]
  variation: boolean
}

export type WCProduct = {
  id: number
  name: string
  slug: string
  permalink: string
  type: string          // "simple" | "variable"
  status: string        // "publish" | "draft"
  description: string
  short_description: string
  price: string
  regular_price: string
  sale_price: string
  on_sale: boolean
  purchasable: boolean
  virtual: boolean
  downloadable: boolean
  categories: WCCategory[]
  tags: { id: number; name: string; slug: string }[]
  images: WCImage[]
  attributes: WCAttribute[]
  variations: number[]
  downloads: { id: string; name: string; file: string }[]
  meta_data: { id: number; key: string; value: string }[]
}

export type WCVariation = {
  id: number
  price: string
  regular_price: string
  sale_price: string
  attributes: { id: number; name: string; option: string }[]
  stock_status: string
}

// ─── Funciones de fetch ───────────────────────────────────────────────────────

async function wcFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${WC_API_BASE}${endpoint}`)
  const authParams = getWCAuthParams()
  Object.entries({ ...authParams, ...params }).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  )

  const res = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`WooCommerce API error: ${res.status} ${res.statusText} — ${url.toString()}`)
  }

  return res.json() as Promise<T>
}

// ─── Productos ────────────────────────────────────────────────────────────────

// Obtener todos los productos publicados
export async function getProducts(params?: Record<string, string>): Promise<WCProduct[]> {
  return wcFetch<WCProduct[]>("/products", {
    status: "publish",
    per_page: "100",
    ...params,
  })
}

// Obtener un producto por su slug
export async function getProductBySlug(slug: string): Promise<WCProduct | null> {
  const products = await wcFetch<WCProduct[]>("/products", { slug })
  return products[0] ?? null
}

// Obtener un producto por su ID
export async function getProductById(id: number): Promise<WCProduct> {
  return wcFetch<WCProduct>(`/products/${id}`)
}

// Obtener las variaciones de un producto variable
export async function getProductVariations(productId: number): Promise<WCVariation[]> {
  return wcFetch<WCVariation[]>(`/products/${productId}/variations`)
}

// Obtener productos por categoría
export async function getProductsByCategory(categorySlug: string): Promise<WCProduct[]> {
  // Primero buscamos el ID de la categoría por su slug
  const categories = await wcFetch<WCCategory[]>("/products/categories", { slug: categorySlug })
  if (!categories.length) return []
  return getProducts({ category: String(categories[0].id) })
}

// Obtener categorías
export async function getCategories(): Promise<WCCategory[]> {
  return wcFetch<WCCategory[]>("/products/categories", { per_page: "100" })
}