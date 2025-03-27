import { type NextRequest, NextResponse } from "next/server"
import { serverSupabase } from "@/lib/supabase"

// Esta ruta maneja la redirección después de la verificación de correo electrónico
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = serverSupabase()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Redirigir a la página principal
  return NextResponse.redirect(new URL("/", requestUrl.origin))
}

