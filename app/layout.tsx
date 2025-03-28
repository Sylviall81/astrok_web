import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
//import { Toaster } from "@/components/ui/toaster"
import {Footer} from "@/components/footer"

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
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
          {/*<Toaster />*/}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  )
}



