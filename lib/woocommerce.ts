// lib/woocommerce.ts
// Capa de abstracción para la API REST de WooCommerce
// En local usamos Basic Auth con usuario/password de WP
// En producción con HTTPS usaremos consumer_key/consumer_secret

import { cache } from "react"

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
  type: string          // "simple" | "variable" | "external"
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
  external_url: string
  button_text: string
}

export type WCVariation = {
  id: number
  price: string
  regular_price: string
  sale_price: string
  attributes: { id: number; name: string; option: string }[]
  stock_status: string
  status?: string        // "publish" | "private" | "draft"
  purchasable?: boolean
  downloadable?: boolean
  image?: WCImage
}

// ─── Tipos pedidos ────────────────────────────────────────────────────────────

export type WCOrderDownload = {
  download_id: string
  download_url: string
  product_id: number
  download_name: string
}

// ─── Funciones de fetch ───────────────────────────────────────────────────────

export class WCApiError extends Error {
  constructor(message: string, public status: number) {
    super(message)
  }
}

// Segundos que se cachean las lecturas de catálogo (productos y variaciones).
// Pedidos y descargas siguen sin caché.
const CATALOG_REVALIDATE = 300

async function wcFetch<T>(
  endpoint: string,
  params?: Record<string, string>,
  opts?: { revalidate?: number },
): Promise<T> {
  const url = new URL(`${WC_API_BASE}${endpoint}`)
  const { consumer_key, consumer_secret } = getWCAuthParams()

  // Use query params for auth (avoids WAF/firewall issues with Authorization header)
  url.searchParams.append("consumer_key", consumer_key)
  url.searchParams.append("consumer_secret", consumer_secret)

  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))
  }

  const res = await fetch(url.toString(), {
    ...(opts?.revalidate ? { next: { revalidate: opts.revalidate } } : { cache: "no-store" }),
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "(no body)")
    throw new WCApiError(
      `WooCommerce API error: ${res.status} ${res.statusText} — ${endpoint} — body: ${body.slice(0, 500)}`,
      res.status,
    )
  }

  return res.json() as Promise<T>
}

async function wcPost<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  const url = new URL(`${WC_API_BASE}${endpoint}`)
  const { consumer_key, consumer_secret } = getWCAuthParams()
  const credentials = Buffer.from(`${consumer_key}:${consumer_secret}`).toString("base64")

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`WooCommerce API error: ${res.status} — ${endpoint}`)
  }

  return res.json() as Promise<T>
}

// ─── Pedidos ─────────────────────────────────────────────────────────────────

export async function createWCOrder(params: {
  email: string
  name: string
  stripeSessionId: string
  lineItems: { productId: number; variationId?: number; quantity: number }[]
}): Promise<{ id: number; status: string }> {
  const [firstName, ...rest] = params.name.split(" ")
  return wcPost("/orders", {
    payment_method: "stripe",
    payment_method_title: "Stripe",
    set_paid: true,
    status: "completed",
    billing: {
      first_name: firstName,
      last_name: rest.join(" "),
      email: params.email,
    },
    line_items: params.lineItems.map(({ productId, variationId, quantity }) => ({
      product_id: productId,
      ...(variationId ? { variation_id: variationId } : {}),
      quantity,
    })),
    meta_data: [{ key: "_stripe_session_id", value: params.stripeSessionId }],
  })
}

export async function getProductDownloads(productId: number): Promise<WCOrderDownload[]> {
  const product = await wcFetch<WCProduct>(`/products/${productId}`)
  return (product.downloads ?? []).map((d) => ({
    download_id: d.id,
    download_url: d.file,
    product_id: productId,
    download_name: d.name,
  }))
}

export async function getVariationDownloads(productId: number, variationId: number): Promise<WCOrderDownload[]> {
  const variation = await wcFetch<{ downloads: { id: string; name: string; file: string }[] }>(
    `/products/${productId}/variations/${variationId}`
  )
  if (!variation.downloads?.length) return getProductDownloads(productId)
  return variation.downloads.map((d) => ({
    download_id: d.id,
    download_url: d.file,
    product_id: productId,
    download_name: d.name,
  }))
}

export async function findOrderByStripeSession(sessionId: string): Promise<{ id: number } | null> {
  const orders = await wcFetch<{ id: number }[]>("/orders", {
    meta_key: "_stripe_session_id",
    meta_value: sessionId,
  })
  return orders[0] ?? null
}

// ─── Productos ────────────────────────────────────────────────────────────────

// Obtener todos los productos publicados
export async function getProducts(params?: Record<string, string>): Promise<WCProduct[]> {
  return wcFetch<WCProduct[]>("/products", {
    status: "publish",
    per_page: "100",
    ...params,
  }, { revalidate: CATALOG_REVALIDATE })
}

// Obtener un producto por su slug
export async function getProductBySlug(slug: string): Promise<WCProduct | null> {
  const products = await wcFetch<WCProduct[]>("/products", { slug }, { revalidate: CATALOG_REVALIDATE })
  return products[0] ?? null
}

// Obtener un producto por su ID
export async function getProductById(id: number): Promise<WCProduct> {
  return wcFetch<WCProduct>(`/products/${id}`, undefined, { revalidate: CATALOG_REVALIDATE })
}

// Resuelve un producto por slug real o, si el segmento de la URL es numérico,
// por ID de WooCommerce. Memoizado por request con React `cache` para que
// generateMetadata y la página no dupliquen la misma llamada a la API.
// Devuelve null solo si el producto no existe; un fallo de la API se propaga.
export const resolveProduct = cache(async (slug: string): Promise<WCProduct | null> => {
  if (/^\d+$/.test(slug)) {
    try {
      return await getProductById(Number(slug))
    } catch (err) {
      if (err instanceof WCApiError && err.status === 404) return null
      throw err
    }
  }
  return getProductBySlug(slug)
})

export const resolveServiceProduct = resolveProduct

// ─── Precio para cobrar ───────────────────────────────────────────────────────

// Error de validación del carrito: /api/checkout lo devuelve como 400 y el
// mensaje se muestra tal cual al usuario.
export class CheckoutValidationError extends Error {}

export type ChargeableItem = {
  name: string
  price: string
  image: string | null
  downloadable: boolean
}

const isWCNotFound = (err: unknown) =>
  err instanceof Error && /^WooCommerce API error: (400|404) /.test(err.message)

// Nombre, precio e imagen vigentes de WooCommerce para cobrar una línea del
// carrito. Siempre sin caché (wcFetch usa no-store): nunca se cobra con datos
// del navegador ni con una copia cacheada del catálogo.
export async function getChargeableItem(productId: number, variationId: number | null): Promise<ChargeableItem> {
  let product: WCProduct
  try {
    product = await wcFetch<WCProduct>(`/products/${productId}`)
  } catch (err) {
    if (isWCNotFound(err)) throw new CheckoutValidationError("Uno de los productos del carrito ya no está disponible. Quítalo e inténtalo de nuevo.")
    throw err
  }

  if (product.status !== "publish" || !product.purchasable) {
    throw new CheckoutValidationError(`"${product.name}" ya no está disponible. Quítalo del carrito e inténtalo de nuevo.`)
  }

  if (product.type === "variable" && !variationId) {
    throw new CheckoutValidationError(`Falta elegir una opción de "${product.name}". Quítalo del carrito y vuelve a añadirlo desde su ficha.`)
  }
  if (product.type !== "variable" && variationId) {
    throw new CheckoutValidationError(`La opción elegida de "${product.name}" no es válida. Quítalo del carrito y vuelve a añadirlo.`)
  }

  let item: ChargeableItem = {
    name: product.name,
    price: product.price,
    image: product.images?.[0]?.src ?? null,
    downloadable: product.downloadable,
  }

  if (variationId) {
    let variation: WCVariation
    try {
      variation = await wcFetch<WCVariation>(`/products/${productId}/variations/${variationId}`)
    } catch (err) {
      if (isWCNotFound(err)) throw new CheckoutValidationError(`La opción elegida de "${product.name}" ya no está disponible. Quítalo del carrito y vuelve a añadirlo.`)
      throw err
    }
    if (variation.status !== "publish" || !variation.purchasable) {
      throw new CheckoutValidationError(`La opción elegida de "${product.name}" ya no está disponible. Quítalo del carrito y vuelve a añadirlo.`)
    }
    item = {
      name: `${product.name} — ${variation.attributes.map(a => a.option).join(", ")}`,
      price: variation.price,
      image: variation.image?.src || item.image,
      downloadable: variation.downloadable ?? product.downloadable,
    }
  }

  if (!(parseFloat(item.price) > 0)) {
    throw new CheckoutValidationError(`"${item.name}" no tiene un precio válido ahora mismo. Escríbenos y lo revisamos.`)
  }

  return item
}

// Obtener las variaciones de un producto variable
export async function getProductVariations(productId: number): Promise<WCVariation[]> {
  return wcFetch<WCVariation[]>(`/products/${productId}/variations`, undefined, { revalidate: CATALOG_REVALIDATE })
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