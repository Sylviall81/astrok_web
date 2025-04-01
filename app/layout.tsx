import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
//import { Toaster } from "@/components/ui/toaster"
import {Footer} from "@/components/footer"
import { ProductsProvider } from "@/context/products-context"

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
          <ProductsProvider>
          <Navbar />
          <main>{children}</main>
          {/*<Toaster />*/}
          <Footer/>
          </ProductsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



