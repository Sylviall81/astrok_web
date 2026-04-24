import { Suspense } from "react"
import BookingPage from "./BookingPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Agenda | Kaleidoscope Astrología",
  description:
    "Reserva tu sesión de astrología psicológica online. Elige fecha para explorar tu carta natal y avanzar en tu camino de autodescubrimiento con confianza.",
}

export default function Page() {
  return (
    <Suspense fallback={<div className="py-16 text-center">Cargando agenda...</div>}>
      <BookingPage />
    </Suspense>
  )
}
