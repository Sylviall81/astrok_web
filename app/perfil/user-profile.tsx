"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, LogOut, Package } from "lucide-react"
import { clientSupabase } from "@/lib/supabase"
//import { useToast } from "@/hooks/use-toast"
import type { Order } from "@/lib/supabase"

interface UserProfileProps {
  user: any
  profile: any
  orders: Order[]
}

export function UserProfile({ user, profile, orders }: UserProfileProps) {
  const [name, setName] = useState(profile?.name || "")
  const [phone, setPhone] = useState(profile?.phone || "")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  //const { toast } = useToast()
  const supabase = clientSupabase()

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        name,
        phone,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      toast({
        title: "Perfil actualizado",
        description: "Tu información ha sido actualizada correctamente",
      })
    } catch (error: any) {
      console.error("Update profile error:", error)
      toast({
        title: "Error",
        description: error.message || "Ocurrió un error al actualizar el perfil",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Pagado</span>
      case "pending":
        return (
          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">Pendiente</span>
        )
      case "failed":
        return <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">Fallido</span>
      default:
        return <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">{status}</span>
    }
  }

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="account">Mi cuenta</TabsTrigger>
        <TabsTrigger value="orders">Mis pedidos</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Información personal</CardTitle>
              <CardDescription>Actualiza tu información personal</CardDescription>
            </CardHeader>
            <form onSubmit={handleUpdateProfile}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" value={user.email} disabled />
                  <p className="text-xs text-muted-foreground">El correo electrónico no se puede cambiar</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Tu número de teléfono"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Guardar cambios
                </Button>
                <Button type="button" variant="outline" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Button>
              </CardFooter>
            </form>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cambiar contraseña</CardTitle>
              <CardDescription>Actualiza tu contraseña para mantener tu cuenta segura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Para cambiar tu contraseña, primero debes cerrar sesión y luego usar la opción "¿Olvidaste tu
                contraseña?" en la página de inicio de sesión.
              </p>
              <Button variant="outline" className="w-full" onClick={handleSignOut}>
                Cerrar sesión para cambiar contraseña
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="orders">
        <Card>
          <CardHeader>
            <CardTitle>Historial de pedidos</CardTitle>
            <CardDescription>Revisa tus pedidos anteriores y su estado</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Package className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-medium">No tienes pedidos aún</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cuando realices una compra, tus pedidos aparecerán aquí
                </p>
                <Button className="mt-4" onClick={() => router.push("/tienda")}>
                  Ir a la tienda
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-lg border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-medium">Pedido #{order.id.substring(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">{formatPrice(order.total)}</p>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

