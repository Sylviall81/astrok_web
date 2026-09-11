"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { loadGA, updateConsent } from "@/lib/analytics"

const COOKIE_KEY = "cookie_consent"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY)
    if (!stored) {
      setVisible(true)
    } else if (stored === "accepted") {
      // Visita recurrente que ya había aceptado: el consent default ya se puso en
      // "granted" en el layout, aquí solo cargamos gtag.js para registrar la sesión.
      loadGA()
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted")
    updateConsent(true)
    loadGA()
    setVisible(false)
  }

  const essential = () => {
    localStorage.setItem(COOKIE_KEY, "essential")
    updateConsent(false)
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
            <Button
              size="sm"
              className="bg-primary text-white hover:bg-primary/90"
              onClick={essential}
            >
              Solo esenciales
            </Button>
            <Button
              size="sm"
              className="bg-primary text-white hover:bg-primary/90"
              onClick={accept}
            >
              Aceptar todas
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
