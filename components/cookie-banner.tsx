"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const COOKIE_KEY = "cookie_consent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted")
    setVisible(false)
  }

  const essential = () => {
    localStorage.setItem(COOKIE_KEY, "essential")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Usamos cookies propias y de terceros para el funcionamiento del sitio (carrito, pagos) y mejorar tu experiencia. Puedes aceptar todas o usar solo las estrictamente necesarias.{" "}
              <Link href="/politica-cookies" className="underline hover:text-foreground">
                Política de cookies
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={essential}>
              Solo esenciales
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={accept}>
              Aceptar todas
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
