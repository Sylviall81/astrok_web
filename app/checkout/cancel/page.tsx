"use client"

import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CheckoutCancelPage() {
  return (
    <section className="py-24">
      <div className="container max-w-lg mx-auto text-center">
        <XCircle className="mx-auto mb-6 h-16 w-16 text-red-400" />
        <h1 className="text-3xl font-semibold mb-4">Pago cancelado</h1>
        <p className="text-muted-foreground mb-8">
          No se ha realizado ningún cargo. Puedes volver al carrito y completar tu compra cuando quieras.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/servicios">
            <Button variant="outline">Seguir comprando</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
