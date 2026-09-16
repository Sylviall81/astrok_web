import sanitizeHtmlLib from "sanitize-html";

// sanitize-html es JS puro (sin DOM real, sin dependencias nativas), así que
// funciona igual en servidor y cliente — a diferencia de dompurify/jsdom, que
// en el bundle serverless de Vercel falla con un ERR_REQUIRE_ESM al cargar
// una dependencia transitiva de jsdom (html-encoding-sniffer -> @exodus/bytes).
export function sanitizeHtml(html: string) {
  return sanitizeHtmlLib(html, {
    allowedTags: [...sanitizeHtmlLib.defaults.allowedTags, "img"],
    allowedAttributes: {
      ...sanitizeHtmlLib.defaults.allowedAttributes,
      "*": ["class", "id"],
    },
    // 👈 ESTO arregla tu problema de colores (equivalente al FORBID_ATTR de dompurify)
    disallowedTagsMode: "discard",
  })
}
