"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const phoneNumber = "34123456789" // Reemplaza con tu número real
  const message = "Hola, me gustaría obtener más información sobre tus servicios de astrología."

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}

