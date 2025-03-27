import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Pago Exitoso | Kaleidoscope",
  description: "Tu pago ha sido procesado con éxito.",
}

export default function CheckoutSuccessPage() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-10">
      <div className="mx-auto max-w-md text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="mb-4 text-3xl font-semibold">¡Pago Exitoso!</h1>
        <p className="mb-8 text-muted-foreground">
          Gracias por tu compra. Hemos recibido tu pago y estamos procesando tu pedido. Recibirás un correo electrónico
          con los detalles de tu compra.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/tienda">Seguir comprando</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/perfil/pedidos">Ver mis pedidos</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

