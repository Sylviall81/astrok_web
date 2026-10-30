"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

// Única barra de la landing: el navbar general se oculta en esta ruta (components/navbar.tsx).
// Escritorio: una fila. Móvil: logo, casita, modo oscuro y "Avísame cuando abra" en pequeño (en dos líneas) arriba;
// debajo, todas las anclas a la vista (sin deslizar).
const ANCLAS = [
  { href: "#para-quien", texto: "Para quién es" },
  { href: "#recorrido", texto: "Recorrido" },
  { href: "#precio", texto: "Precio" },
  { href: "#clase-abierta", texto: "Clase gratis" },
  { href: "#preguntas", texto: "Preguntas", textoMovil: "FAQ" },
]


const LOGO_CLARO = "https://res.cloudinary.com/dgtuiirc7/image/upload/v1742251136/logonegro_snez0h.png"
const LOGO_OSCURO = "https://res.cloudinary.com/dgtuiirc7/image/upload/v1776253747/logoBlanco_gs6lzj.png"

export function NavegacionCurso() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])


  const oscuro = mounted && resolvedTheme === "dark"

  const ancla = "flex h-full shrink-0 items-center text-muted-foreground transition-colors hover:text-primary dark:hover:text-white"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container-custom flex h-16 items-center gap-3 lg:h-20 lg:gap-6">
        <div className="flex shrink-0 items-center gap-1 lg:gap-3">
          <Link href="/" aria-label="Kaleidoscope, ir a la página de inicio">
            <Image
              src={oscuro ? LOGO_OSCURO : LOGO_CLARO}
              alt="Logotipo Kaleidoscope"
              width={400}
              height={100}
              className="h-[18px] w-auto object-contain min-[380px]:h-5 lg:h-10"
            />
          </Link>
          <Link
            href="/"
            aria-label="Ir a la página de inicio"
            className="flex h-10 w-8 items-center justify-center rounded-md text-primary transition-colors hover:bg-crema dark:text-white dark:hover:bg-white/10 lg:w-9"
          >
            <Home className="h-5 w-5" />
          </Link>
        </div>

        <nav aria-label="Secciones del curso" className="mx-auto hidden h-full items-center gap-7 lg:flex">
          {ANCLAS.map(({ href, texto }) => (
            <a key={href} href={href} className={`${ancla} text-sm`}>
              {texto}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0 lg:gap-2">
          <button
            type="button"
            aria-label={oscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            onClick={() => setTheme(oscuro ? "light" : "dark")}
            className="flex h-10 w-8 items-center justify-center rounded-md text-primary transition-colors hover:bg-crema dark:text-white dark:hover:bg-white/10 lg:w-9"
          >
            {oscuro ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <a
            href="#preinscripcion"
            className="flex min-h-9 max-w-[6.5rem] items-center rounded-lg bg-primary px-3 py-1 text-center text-xs font-semibold leading-tight text-white transition-all hover:bg-opacity-90 lg:min-h-10 lg:max-w-none lg:px-6 lg:py-0 lg:text-sm"
          >
            Avísame cuando abra
          </a>
        </div>
      </div>

      <div className="border-t border-black/5 dark:border-white/10 lg:hidden">
        <nav aria-label="Secciones del curso" className="container-custom flex h-11 items-center justify-between">
          {ANCLAS.map(({ href, texto, textoMovil }) => (
            <a key={href} href={href} className={`${ancla} text-[0.8rem]`}>
              {textoMovil ?? texto}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
