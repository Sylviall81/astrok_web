"use client"

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Moon, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { useTheme } from "next-themes"
import { clientSupabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const supabase = clientSupabase()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link href="/" className="flex items-center gap-2">
          <Image src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1742251136/logonegro_snez0h.png" alt="Logotipo Kaleidoscope color negro" width="400" height="200"></Image>
          </Link>
        </div>
        <nav
          className={`${isMenuOpen ? "flex" : "hidden"} absolute top-16 left-0 right-0 flex-col gap-4 border-b bg-background p-4 md:static md:flex md:flex-row md:items-center md:border-0 md:p-0`}
        >
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Inicio
          </Link>
          <Link href="/servicios" className="text-muted-foreground hover:text-foreground">
            Servicios
          </Link>
          <Link href="/tienda" className="text-muted-foreground hover:text-foreground">
            Tienda
          </Link>
          <Link href="/blog" className="text-muted-foreground hover:text-foreground">
            Blog
          </Link>
          <Link href="/sobre-mi" className="text-muted-foreground hover:text-foreground">
            Sobre Mí
          </Link>
          <Link href="/contacto" className="text-muted-foreground hover:text-foreground">
            Contacto
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <CartDrawer />
          <Button variant="ghost" size="icon" onClick={() => router.push("/perfil")}>
            <User className="h-5 w-5" />
            <span className="sr-only">Perfil</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

