import { Suspense } from "react"
import BookingPage from "./BookingPage"

export default function Page() {
  return (
    <Suspense fallback={<div className="py-16 text-center">Cargando agenda...</div>}>
      <BookingPage />
    </Suspense>
  )
}
