import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Pago Cancelado | Kaleidoscope",
  description: "Tu pago ha sido cancelado.",
}

export default function CheckoutCancelPage() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-10">
      <div className="mx-auto max-w-md text-center">
        <XCircle className="mx-auto mb-4 h-16 w-16 text-destructive" />
        <h1 className="mb-4 text-3xl font-semibold">Pago Cancelado</h1>
        <p className="mb-8 text-muted-foreground">
          Tu pago ha sido cancelado. No te preocupes, no se ha realizado ningún cargo. Los productos siguen en tu
          carrito si deseas completar la compra más tarde.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/tienda">Volver a la tienda</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

