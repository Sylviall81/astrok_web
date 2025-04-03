"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Clock, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShareButtons } from "@/components/share-button"
import { useProducts } from "@/context/products-context"
import { useNotification } from "@/context/notification-context"
import { clientSupabase } from "@/lib/supabase"
import type { Product } from "@/lib/supabase"

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  console.log(slug)
  const { products, loading, error } = useProducts()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { showNotification } = useNotification()
  const supabase = clientSupabase()

  useEffect(() => {
    const fetchProduct = async () => {
      // Primero intentamos encontrar el producto en el contexto
      const foundProduct = products.find((p) => p.slug === slug)

      if (foundProduct) {
        setProduct(foundProduct)
        setIsLoading(false)
        return
      }

      // Si no está en el contexto o el contexto está cargando, lo buscamos directamente
      try {
        const { data, error } = await supabase.from("products").select("*").eq("id", slug).single()

        if (error) {
          throw error
        }

        setProduct(data)
      } catch (err) {
        console.log("Error fetching product:", err)
        showNotification("error", "Error", "No se pudo cargar el producto")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [slug, products, showNotification, supabase])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  // Generar un ID único sin depender de uuid
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const handleAddToCart = async () => {
    if (!product) return

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      // Si no hay sesión, guardamos en localStorage
      try {
        const localCartString = localStorage.getItem("cart")
        const localCart = localCartString ? JSON.parse(localCartString) : []

        // Verificar si el producto ya está en el carrito
        const existingItemIndex = localCart.findIndex((item: any) => item.product.id === product.id)

        if (existingItemIndex >= 0) {
          // Incrementar cantidad
          localCart[existingItemIndex].quantity += 1
        } else {
          // Añadir nuevo item
          localCart.push({
            id: generateId(),
            product,
            quantity: 1,
          })
        }

        localStorage.setItem("cart", JSON.stringify(localCart))

        showNotification("success", "Añadido al carrito", `${product.name} se ha añadido a tu carrito`)
      } catch (err) {
        console.error("Error managing local cart:", err)
        showNotification("error", "Error", "No se pudo añadir al carrito")
      }
      return
    }

    try {
      // Si hay sesión, guardamos en Supabase
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select()
        .eq("user_id", session.user.id)
        .eq("product_id", product.id)
        .single()

      if (existingItem) {
        // Incrementar cantidad
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + 1 })
          .eq("id", existingItem.id)

        if (error) throw error
      } else {
        // Añadir nuevo item
        const { error } = await supabase.from("cart_items").insert({
          user_id: session.user.id,
          product_id: product.id,
          quantity: 1,
        })

        if (error) throw error
      }

      showNotification("success", "Añadido al carrito", `${product.name} se ha añadido a tu carrito`)
    } catch (err) {
      console.error("Error in handleAddToCart:", err)
      showNotification("error", "Error", "No se pudo añadir al carrito")
    }
  }

  if (isLoading) {
    return (
      <div className="container py-16 text-center">
        <p>Cargando producto...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-3xl font-lato font-semibold text-primary mb-6">Producto no encontrado</h1>
        <p className="mb-8">Lo sentimos, el producto que buscas no está disponible.</p>
        <Link
          href="/tienda"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Ver todos los productos
        </Link>
      </div>
    )
  }

  // Crear una URL para compartir
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/tienda/${product.id}` : ""

  return (
    <section className="py-16">
      <div className="container">
        <Link href="/servicios" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver 
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {product.image_url ? (
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary/10">
                <span className="text-secondary">Sin imagen</span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">{product.name}</h1>

            <div className="flex items-center mb-6">
              <p className="text-2xl font-semibold text-primary">{formatPrice(product.price)}</p>
              {product.duration && (
                <div className="ml-4 flex items-center text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{product.duration} minutos</span>
                </div>
              )}
            </div>

            {product.category && (
              <div className="mb-6">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>
            )}

            <div className="prose max-w-none mb-8">
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p>{product.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button onClick={handleAddToCart} className="bg-primary hover:bg-primary/90">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Añadir al carrito
              </Button>

              <Link href="/agenda" passHref>
                <Button variant="outline">Reservar sesión</Button>
              </Link>
            </div>

            <div className="flex items-center justify-between border-t pt-6">
              <span className="text-sm text-muted-foreground">Compartir:</span>
              <ShareButtons url={shareUrl} title={product.name} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

