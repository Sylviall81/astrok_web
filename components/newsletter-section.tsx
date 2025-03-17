"use client"

import type React from "react"

import { useState } from "react"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí iría la lógica para suscribir al usuario
    // Por ahora, simulamos una respuesta exitosa

    try {
      // Simulación de envío
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus({
        type: "success",
        message: "¡Te has suscrito con éxito! Pronto recibirás contenido exclusivo.",
      })

      // Resetear el formulario
      setEmail("")
    } catch (error) {
      setStatus({
        type: "error",
        message: "Hubo un error al procesar tu suscripción. Por favor, intenta nuevamente.",
      })
    }
  }

  return (
    <section className="py-16 md:py-20 bg-primary text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-lato font-semibold mb-4">Únete a nuestra comunidad</h2>
          <p className="text-lg mb-8 opacity-90">
            Recibe contenido exclusivo sobre astrología psicológica y herramientas de autodescubrimiento.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              required
              className="flex-grow px-4 py-3 rounded-md text-neutral-dark focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="bg-accent hover:bg-opacity-90 text-white px-6 py-3 rounded-md font-lato font-semibold transition-all"
            >
              Suscribirme
            </button>
          </form>

          {status.type && (
            <div
              className={`mt-4 p-3 rounded-md ${
                status.type === "success" ? "bg-green-600 bg-opacity-20" : "bg-red-600 bg-opacity-20"
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

