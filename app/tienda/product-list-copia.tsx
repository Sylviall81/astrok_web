"use client"

import { useState } from "react"
import type { Product } from "@/lib/supabase"
import { ProductCard } from "@/components/ui/product-card"
import { clientSupabase } from "@/lib/supabase"
//import { useToast } from "@/hooks/use-toast"

interface ProductListProps {
  products: Product[]
}

export function ProductList({ products }: ProductListProps) {
  const [categories, setCategories] = useState<string[]>([])
  //const { toast } = useToast()
  const supabase = clientSupabase()

  // Extraer categorías únicas de los productos
  const uniqueCategories = Array.from(new Set(products.map((product) => product.category).filter(Boolean))) as string[]

  // Filtrar productos por categoría seleccionada
  const filteredProducts =
    categories.length > 0
      ? products.filter((product) => product.category && categories.includes(product.category))
      : products

  const toggleCategory = (category: string) => {
    setCategories((prev) => (prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]))
  }

  // Generamos un ID único sin depender de uuid
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  const handleAddToCart = async (product: Product) => {
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

        toast({
          title: "Añadido al carrito",
          description: `${product.name} se ha añadido a tu carrito`,
        })
      } catch (err) {
        console.error("Error managing local cart:", err)
        toast({
          title: "Error",
          description: "No se pudo añadir al carrito",
          variant: "destructive",
        })
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

        if (error) {
          console.error("Error updating cart item:", error)
          toast({
            title: "Error",
            description: "No se pudo actualizar el carrito",
            variant: "destructive",
          })
          return
        }
      } else {
        // Añadir nuevo item
        const { error } = await supabase.from("cart_items").insert({
          user_id: session.user.id,
          product_id: product.id,
          quantity: 1,
        })

        if (error) {
          console.error("Error adding to cart:", error)
          toast({
            title: "Error",
            description: "No se pudo añadir al carrito",
            variant: "destructive",
          })
          return
        }
      }

      toast({
        title: "Añadido al carrito",
        description: `${product.name} se ha añadido a tu carrito`,
      })
    } catch (err) {
      console.error("Error in handleAddToCart:", err)
      toast({
        title: "Error",
        description: "No se pudo añadir al carrito",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      {uniqueCategories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {uniqueCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`rounded-full px-4 py-1 text-sm ${
                categories.includes(category)
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
          {categories.length > 0 && (
            <button
              onClick={() => setCategories([])}
              className="rounded-full px-4 py-1 text-sm text-muted-foreground hover:bg-muted/80"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-lg text-muted-foreground">No se encontraron productos con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  )
}

