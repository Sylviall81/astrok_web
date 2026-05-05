"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Download, Play, Loader2, AlertCircle } from "lucide-react"
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
  const [hasDownloadables, setHasDownloadables] = useState(false)
  const [wcError, setWcError] = useState<string | null>(null)
  const [fatalError, setFatalError] = useState<string | null>(null)

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
          setFatalError(data.error)
        } else {
          setCustomerEmail(data.customerEmail)
          setDownloadableProducts(data.downloadableProducts || [])
          setHasDownloadables(data.hasDownloadables ?? false)
          setWcError(data.wcError ?? null)
        }
      })
      .catch(err => {
        console.error("Error verificando pago:", err)
        setFatalError("No se pudo verificar el pago")
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
        ) : fatalError ? (
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
                      <div key={j} className="flex flex-wrap gap-3 items-center">
                        <a
                          href={`/api/download?url=${encodeURIComponent(download.url)}&stream=1`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                        ><Play className="h-4 w-4" />
                          Abrir
                        </a>
                        <a
                          href={`/api/download?url=${encodeURIComponent(download.url)}`}
                          download
                          className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                        ><Download className="h-4 w-4" />
                          Descargar
                        </a>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Error al generar descarga */}
            {wcError && downloadableProducts.length === 0 && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-8 text-left flex gap-3">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-destructive mb-1">
                    No se pudo generar el enlace de descarga automáticamente.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tu pago se ha procesado correctamente. Escríbenos a{" "}
                    <a href="mailto:hola@astrokaleido.com" className="underline">hola@astrokaleido.com</a>{" "}
                    y te enviaremos el archivo en breve.
                  </p>
                </div>
              </div>
            )}

            {/* Servicio (sin descargables) */}
            {!hasDownloadables && (
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
