import Link from "next/link"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Verifica tu correo | Kaleidoscope",
  description: "Por favor, verifica tu correo electrónico para completar el registro.",
}

export default function VerifyPage() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-10">
      <div className="mx-auto max-w-md text-center">
        <Mail className="mx-auto mb-4 h-16 w-16 text-primary" />
        <h1 className="mb-4 text-3xl font-semibold">Verifica tu correo electrónico</h1>
        <p className="mb-8 text-muted-foreground">
          Hemos enviado un enlace de verificación a tu correo electrónico. Por favor, haz clic en el enlace para
          completar el proceso de registro.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

