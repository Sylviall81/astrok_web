import type React from "react"

// Piezas de apoyo de la landing mientras faltan decisiones o recursos.
// Cada uso lleva su // TODO al lado. Antes de quitar el noindex no debe quedar ninguna.

export function Pendiente({ children }: { children?: React.ReactNode }) {
  return (
    <span className="inline-block rounded border border-yellow-500 bg-yellow-100 px-2 py-0.5 text-xs font-semibold tracking-wide text-yellow-900 not-italic">
      [PENDIENTE]{children ? <> {children}</> : null}
    </span>
  )
}

export function HuecoImagen({ etiqueta, className = "" }: { etiqueta: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border-2 border-dashed border-dorado bg-crema p-6 text-center ${className}`}
    >
      <Pendiente>{etiqueta}</Pendiente>
    </div>
  )
}

// Círculo del sistema de iconos de la marca (lila o crema con trazo dorado fino).
// TODO: sustituir por los iconos propios de forma geométrica de grano punteado.
export function HuecoIcono() {
  return <div aria-hidden="true" className="h-14 w-14 shrink-0 rounded-full border border-dorado bg-crema" />
}

// Desplazamiento de las anclas para que el menú (h-16) y, en escritorio, la barra de la landing (h-12) no tapen la sección
export const SCROLL_ANCLA = "scroll-mt-16 lg:scroll-mt-28"

// Cielo estrellado de la portada (mismo archivo que components/hero-section.tsx),
// suavizado con una capa violeta para que las estrellas queden tenues y el texto blanco se lea bien.
const CIELO_URL =
  "https://res.cloudinary.com/dgtuiirc7/image/upload/f_auto,q_auto,w_2000/v1792510634/copy_of_stocksnap-stars-2616537_wftmfa.jpg"

export function SeccionCielo({
  id,
  className = "",
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden bg-primary bg-cover bg-center py-16 md:py-24 ${className}`}
      style={{ backgroundImage: `url('${CIELO_URL}')` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-primary/80" />
      <div className="container-custom relative z-10">{children}</div>
    </section>
  )
}
