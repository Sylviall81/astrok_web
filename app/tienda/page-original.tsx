import { serverSupabase } from "@/lib/supabase"
import { ProductList } from "./product-list"

export const metadata = {
  title: "Servicios | Kaleidoscope",
  description: "Descubre nuestros servicios de astrología psicológica y productos para tu autodescubrimiento.",
}

async function getProducts() {
  try {
    const supabase = serverSupabase()
    const { data, error } = await supabase.from("products").select("*").order("name")

    if (error) {
      console.error("Error fetching products:", error)
      return []
    }

    return data || []
  } catch (err) {
    console.error("Error in getProducts:", err)
    return []
  }
}

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="container py-10">
      <h1 className="mb-8 text-4xl font-semibold">Tienda de Astrología</h1>
      <p className="mb-10 max-w-3xl text-muted-foreground">
        Explora nuestra selección de servicios astrológicos diseñados para ayudarte en tu camino de autodescubrimiento y
        crecimiento personal.
      </p>
      <ProductList products={products} />
    </div>
  )
}

