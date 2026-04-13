import DOMPurify from "dompurify"



export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    FORBID_ATTR: ["style"] // 👈 ESTO arregla tu problema de colores
  })
}