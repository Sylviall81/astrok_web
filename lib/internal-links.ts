import { load } from "cheerio"

const SITE = "https://www.astrokaleido.com"
const SITE_HOSTS = new Set(["astrokaleido.com", "www.astrokaleido.com", "cms.astrokaleido.com"])

// Normaliza los enlaces internos del contenido de WordPress a la URL canónica
// (https, www, sin barra final). WordPress genera sus propios permalinks como
// cms.astrokaleido.com/{slug}/ — sin /blog/ — así que un enlace a un post
// copiado del editor acabaría en el backend o encadenando redirects.
// Solo se tocan <a href>: las imágenes de cms.astrokaleido.com/wp-content se sirven desde allí.
export function normalizeInternalLinks(html: string, postSlugs: string[]) {
  const slugs = new Set(postSlugs)
  const $ = load(html, null, false)

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href")!
    let url: URL
    try {
      url = new URL(href)
    } catch {
      return // relativo, mailto:, #ancla...
    }
    if (!SITE_HOSTS.has(url.hostname)) return

    const suffix = url.search + url.hash
    const match = url.pathname.match(/^\/(?:blog\/)?([^/]+)\/?$/)

    if (match && slugs.has(match[1])) {
      $(el).attr("href", `${SITE}/blog/${match[1]}${suffix}`)
    } else if (url.hostname !== "cms.astrokaleido.com") {
      const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "") : url.pathname
      $(el).attr("href", `${SITE}${path}${suffix}`)
    }
  })

  return $.html()
}
