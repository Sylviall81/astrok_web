import DOMPurify from "dompurify";

// dompurify necesita un DOM real: en el render de servidor (SSR) no existe
// `window` y DOMPurify.sanitize revienta con un 500 para toda la página.
// Se sanea solo en cliente; en servidor se devuelve vacío (el cliente rehidrata igual).
export function sanitizeHtml(html: string) {
  if (typeof window === "undefined") return ""

  return DOMPurify.sanitize(html, {
    FORBID_ATTR: ["style"], // 👈 ESTO arregla tu problema de colores
    FORBID_TAGS: ["script"]
  })
}