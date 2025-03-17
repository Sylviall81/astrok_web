"use client"

import type React from "react"

import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Aquí iría la lógica para enviar el formulario a un backend
    // Por ahora, simulamos una respuesta exitosa

    try {
      // Simulación de envío
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus({
        type: "success",
        message: "¡Mensaje enviado con éxito! Te responderé lo antes posible.",
      })

      // Resetear el formulario
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      setStatus({
        type: "error",
        message: "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-lato font-medium text-neutral-dark mb-1">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-lato font-medium text-neutral-dark mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-lato font-medium text-neutral-dark mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Enviar mensaje
      </button>

      {status.type && (
        <div
          className={`p-4 rounded-md ${
            status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}
    </form>
  )
}

