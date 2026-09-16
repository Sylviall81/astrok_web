import DOMPurify from "isomorphic-dompurify";

// isomorphic-dompurify usa jsdom en el servidor y el DOMPurify normal en el
// cliente, así que el saneado funciona igual en SSR que en el navegador —
// necesario para que el contenido del producto esté en el HTML inicial
// (antes se devolvía vacío en servidor y la página dependía de JS del cliente).
export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    FORBID_ATTR: ["style"], // 👈 ESTO arregla tu problema de colores
    FORBID_TAGS: ["script"]
  })
}