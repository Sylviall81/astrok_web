import { AuthForm } from "@/components/auth/auth-form"

export const metadata = {
  title: "Iniciar sesión | Kaleidoscope",
  description: "Inicia sesión en tu cuenta para acceder a todos los servicios de astrología.",
}

export default function LoginPage() {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-10">
      <AuthForm />
    </div>
  )
}

