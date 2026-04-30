import type React from "react"
import "./globals.css"
import { Cormorant_Garamond, Raleway } from "next/font/google"
//import type { Metadata } from "next"

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--font-lato" })
const raleway = Raleway({ subsets: ["latin"], variable: "--font-lora" })
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
//import { Toaster } from "@/components/ui/toaster"
import { ProductsProvider } from "@/context/products-context"
import { NotificationProvider } from "@/context/notification-context"
import { CartProvider } from "@/context/cart-context"
// import { Notification } from "@/components/ui/notification"
import { Footer } from "@/components/footer"
import { CookieBanner } from "@/components/cookie-banner"

export const metadata = {
  metadataBase: new URL("https://astrokaleido.com"),
  title: "Inicio | Kaleidoscope Astrología",
  description:
    "Astrología psicológica evolutiva para (re)conectar con tu claridad interna, navegar tránsitos y abrazar tu propósito. Acompañamiento con Sylvia Llorente.",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${raleway.variable}`}>
           <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >

        <NotificationProvider>
          <ProductsProvider>
            <CartProvider>

            
            <Navbar />
            <main>{children}</main>
            {/*<Toaster />*/}
            <Footer />
            <CookieBanner />
          </CartProvider>
          </ProductsProvider>
          </NotificationProvider>

        </ThemeProvider>
      </body>
    </html>
  )
}

