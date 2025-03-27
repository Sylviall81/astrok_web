import { redirect } from "next/navigation"
import { serverSupabase } from "@/lib/supabase"
import { UserProfile } from "./user-profile"

export const metadata = {
  title: "Mi Perfil | Kaleidoscope",
  description: "Gestiona tu perfil y accede a tus servicios de astrología.",
}

export default async function ProfilePage() {
  const supabase = serverSupabase()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Obtener información del usuario
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  // Obtener pedidos del usuario
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="container py-10">
      <h1 className="mb-8 text-4xl font-semibold">Mi Perfil</h1>
      <UserProfile user={session.user} profile={profile} orders={orders || []} />
    </div>
  )
}

