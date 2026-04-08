import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
//import { Toaster } from "@/components/ui/toaster"
import { ProductsProvider } from "@/context/products-context"
import { NotificationProvider } from "@/context/notification-context"
import { CartProvider } from "@/context/cart-context"
// import { Notification } from "@/components/ui/notification"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Página de Inicio | Kaleidoscope",
  description: "Bienvenido a Kaleidoscope, astrología psicológica...",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
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
          </CartProvider>
          </ProductsProvider>
          </NotificationProvider>

        </ThemeProvider>
      </body>
    </html>
  )
}

