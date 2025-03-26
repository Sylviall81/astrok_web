"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/servicios" },
  { name: "Sobre Mí", href: "/sobre-mi" },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/contacto" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
           <div className="flex items-center">
              <Link href="/" className="flex items-center">
              <Image src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1742251136/logonegro_snez0h.png" alt="Logotipo Kaleidoscope color negro" width="400" height="200">
                {/*<span className="text-2xl font-lato font-bold text-primary">Kaleidoscope</span>*/}</Image>
              </Link>
            </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-lato text-neutral-dark hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
           
            <Link href="/agenda" className="btn-primary">
              Agenda tu sesión
            </Link>
          </div>


          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-dark hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4 pb-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-lato text-neutral-dark hover:text-primary transition-colors px-2 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/agenda" className="btn-primary inline-block text-center" onClick={() => setIsOpen(false)}>
                Agenda tu sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

