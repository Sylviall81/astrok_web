"use client"

import type React from "react"
import { useState } from "react"

export default function NewsletterSection() {
  
  const [gdprConsent, setGdprConsent] = useState(false)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!gdprConsent) {
      setStatus({ type: "error", message: "Debes aceptar la política de privacidad." })
      return
    }

    setLoading(true)
    setStatus({ type: null, message: "" })

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "newsletter_section",
          gdpr_consent: gdprConsent,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message || "Error desconocido")

      setStatus({ type: "success", message: "¡Te has suscrito con éxito! 🌙" })
      setEmail("")
      setGdprConsent(false)
    } catch {
      setStatus({ type: "error", message: "Hubo un error al procesar tu suscripción." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-20 bg-primary text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-lato font-semibold mb-4">
            Únete a nuestra comunidad
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Recibe contenido exclusivo sobre astrología psicológica y herramientas de autodescubrimiento.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            {/* Fila: input + botón */}
            <div className="flex flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email"
                required
                maxLength={254}
                autoComplete="email"
                className="flex-grow px-4 py-3 rounded-md text-body focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={!gdprConsent || !email || loading}
                className={`bg-accent hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-lato font-semibold transition-all whitespace-nowrap ${
                  !gdprConsent || !email ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Enviando..." : "Suscribirme"}
              </button>
            </div>

            {/* Checkbox GDPR alineado */}
            <div className="flex items-start gap-2 mt-3 text-left">
              <input
                type="checkbox"
                id="gdprConsent"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                className="w-4 h-4 mt-0.5 shrink-0 cursor-pointer accent-accent"
              />
              <label htmlFor="gdprConsent" className="text-sm opacity-90 cursor-pointer leading-snug">
                Acepto recibir comunicaciones y acepto la{" "}
                <a href="/politica-privacidad" className="underline hover:opacity-100">
                  política de privacidad
                </a>
                .
              </label>
            </div>
          </form>

          {/* Mensaje de estado */}
          {status.type && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${
                status.type === "success"
                  ? "bg-green-600 bg-opacity-20"
                  : "bg-red-600 bg-opacity-20"
              }`}
            >
              {status.message}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
  