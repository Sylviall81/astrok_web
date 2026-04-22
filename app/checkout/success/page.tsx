"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { DownloadProduct } from "@/app/api/checkout/verify/route"

export default function Page() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Procesando tu pago...</div>}>
      <CheckoutSuccessPage />
    </Suspense>
  )
}

function CheckoutSuccessPage() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [isVerifying, setIsVerifying] = useState(true)
  const [customerEmail, setCustomerEmail] = useState<string | null>(null)
  const [downloadableProducts, setDownloadableProducts] = useState<DownloadProduct[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    clearCart()

    if (!sessionId) {
      setIsVerifying(false)
      return
    }

    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setCustomerEmail(data.customerEmail)
          setDownloadableProducts(data.downloadableProducts || [])
        }
      })
      .catch(err => {
        console.error("Error verificando pago:", err)
        setError("No se pudo verificar el pago")
      })
      .finally(() => setIsVerifying(false))
  }, [sessionId])

  return (
    <section className="py-24">
      <div className="container max-w-lg mx-auto text-center">
        <CheckCircle className="mx-auto mb-6 h-16 w-16 text-green-500" />
        <h1 className="text-3xl font-semibold mb-4">¡Pago completado!</h1>

        {isVerifying ? (
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Preparando tu compra...</span>
          </div>
        ) : error ? (
          <p className="text-muted-foreground mb-8">
            Gracias por tu compra. Recibirás un email de confirmación en breve.
          </p>
        ) : (
          <>
            {customerEmail && (
              <p className="text-muted-foreground mb-6">
                Confirmación enviada a <strong>{customerEmail}</strong>
              </p>
            )}

            {/* Descargas disponibles */}
            {downloadableProducts.length > 0 && (
              <div className="bg-muted rounded-lg p-6 mb-8 text-left">
                <h2 className="text-lg font-semibold mb-4">Tus descargas</h2>
                {downloadableProducts.map((product, i) => (
                  <div key={i} className="mb-4">
                    <p className="font-medium mb-2">{product.name}</p>
                    {product.downloads.map((download, j) => (
                      <a
                        key={j}
                        href={download.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                      ><Download className="h-4 w-4" />
                        {download.name}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {downloadableProducts.length === 0 && (
              <p className="text-muted-foreground mb-8">
                Gracias por tu compra. Nos pondremos en contacto contigo pronto para coordinar tu sesión.
              </p>
            )}
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline">Volver al inicio</Button>
          </Link>
          <Link href="/tienda">
            <Button className="bg-primary hover:bg-primary/90">Ver más productos</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}