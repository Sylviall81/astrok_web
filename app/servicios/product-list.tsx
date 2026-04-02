"use client"

import { useCart } from "@/context/cart-context"
import { ProductCard } from "@/components/ui/product-card"
import { useNotification } from "@/context/notification-context"
import type { WCProduct } from "@/lib/woocomerce"

interface ProductListProps {
  products: WCProduct[]
}

export function ProductList({ products }: ProductListProps) {
  const { addToCart } = useCart()
  const { showNotification } = useNotification()

  const handleAddToCart = (product: WCProduct) => {
    addToCart(product)
    showNotification("success", "Añadido al carrito", `${product.name} se ha añadido a tu carrito`)
  }

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-lg text-muted-foreground">No hay productos disponibles.</p>
        </div>
      )}
    </div>
  )
}