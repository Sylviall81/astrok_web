import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Tienda | Kaleidoscope Astrología",
  description:
    "Infoproductos de astrología psicológica: guías, talleres y recursos descargables para profundizar en tu mapa natal y tu camino de autoconocimiento.",
}

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
