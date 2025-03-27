"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { clientSupabase } from "@/lib/supabase"
//import { useToast } from "@/hooks/use-toast"

type AuthMode = "signin" | "signup" | "forgot-password"

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  //const { toast } = useToast()
  const supabase = clientSupabase()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          toast({
            title: "Error",
            description: "Las contraseñas no coinciden",
            variant: "destructive",
          })
          return
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) throw error

        toast({
          title: "Registro exitoso",
          description: "Por favor, verifica tu correo electrónico para confirmar tu cuenta",
        })

        // Redirigir a la página de verificación
        router.push("/auth/verify")
      } else if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido/a de nuevo",
        })

        // Redirigir a la página principal
        router.push("/")
        router.refresh()
      } else if (mode === "forgot-password") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        })

        if (error) throw error

        toast({
          title: "Correo enviado",
          description: "Revisa tu correo electrónico para restablecer tu contraseña",
        })
      }
    } catch (error: any) {
      console.error("Authentication error:", error)
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error durante la autenticación",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">
          {mode === "signin" ? "Iniciar sesión" : mode === "signup" ? "Crear cuenta" : "Recuperar contraseña"}
        </CardTitle>
        <CardDescription>
          {mode === "signin"
            ? "Ingresa tus credenciales para acceder a tu cuenta"
            : mode === "signup"
              ? "Crea una nueva cuenta para acceder a todos los servicios"
              : "Te enviaremos un enlace para restablecer tu contraseña"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {mode !== "forgot-password" && (
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                </Button>
              </div>
            </div>
          )}

          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Iniciar sesión" : mode === "signup" ? "Registrarse" : "Enviar enlace"}
          </Button>

          <div className="flex flex-col space-y-2 text-center text-sm">
            {mode === "signin" ? (
              <>
                <Button
                  type="button"
                  variant="link"
                  className="text-primary"
                  onClick={() => setMode("forgot-password")}
                >
                  ¿Olvidaste tu contraseña?
                </Button>
                <div className="text-muted-foreground">
                  ¿No tienes una cuenta?{" "}
                  <Button type="button" variant="link" className="text-primary" onClick={() => setMode("signup")}>
                    Regístrate
                  </Button>
                </div>
              </>
            ) : mode === "signup" ? (
              <div className="text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Button type="button" variant="link" className="text-primary" onClick={() => setMode("signin")}>
                  Inicia sesión
                </Button>
              </div>
            ) : (
              <Button type="button" variant="link" className="text-primary" onClick={() => setMode("signin")}>
                Volver al inicio de sesión
              </Button>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

