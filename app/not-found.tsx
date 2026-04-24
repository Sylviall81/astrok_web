import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-custom text-center max-w-lg mx-auto">
        <p className="text-6xl font-lato font-bold text-primary mb-4">404</p>
        <h1 className="text-2xl font-lato font-semibold mb-4">Página no encontrada</h1>
        <p className="text-muted-foreground mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90">Volver al inicio</Button>
          </Link>
          <Link href="/servicios">
            <Button variant="outline">Ver servicios</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
