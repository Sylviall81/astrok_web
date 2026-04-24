import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Servicios | Kaleidoscope Astrología",
  description:
    "Sesiones 1:1 de acompañamiento astrológico: carta natal, revolución solar, sinastría e integral. Gana claridad y herramientas para tu evolución personal.",
}

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
