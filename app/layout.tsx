import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Lato, Lora } from "next/font/google"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Kaleidoscope | Astrología Psicológica",
  description:
    "Explora tu universo interior a través de la astrología psicológica. Autodescubrimiento, integración y claridad a través de la astrología junguiana.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${lato.variable} ${lora.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-neutral-dark">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}

