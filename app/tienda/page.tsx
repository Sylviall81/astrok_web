import { serverSupabase } from "@/lib/supabase"
import { ProductList } from "./product-list"
import Link from "next/link"


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
    <section className="py-16 md:py-24">
      <div className="container-custom">
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-6">Servicios</h1>
          <p className="text-xl text-secondary">
            Descubre cómo la astrología psicológica puede ayudarte a comprender mejor tu camino y potencial.
          </p>
          <p className="text-xl text-secondary">
            Explora nuestra selección de servicios astrológicos diseñados para ayudarte en tu camino de autodescubrimiento y
            crecimiento personal.
          </p>
        </div>
        
        <div className="container py-10">
      
      <ProductList products={products} />
    </div>
    
    <div className="mt-16 text-center">
          <h2 className="text-2xl font-lato font-semibold text-primary mb-6">¿No encuentras lo que buscas?</h2>
          <p className="text-neutral-dark mb-8 max-w-2xl mx-auto">
            Si necesitas un servicio personalizado o tienes alguna consulta específica, no dudes en contactarme. Podemos
            diseñar una sesión adaptada a tus necesidades.
          </p>
          <Link href="/contacto" className="btn-primary">
            Contáctame
          </Link>
        </div>
      </div> {/*cierra container custom*/ } 
    </section>
  )
}

