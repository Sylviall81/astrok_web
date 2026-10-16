import { getProducts } from "@/lib/woocommerce"
import { TiendaClient } from "./tienda-client"

export const revalidate = 300

export default async function TiendaPage() {
  const products = await getProducts()
  const infoproductos = products.filter(p =>
    p.categories?.some(c => c.slug === "infoproductos")
  )

  return (
    <div className="container-custom py-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-6">Tienda</h1>
          <p className="text-xl text-secondary">
            Recursos digitales para acompañarte en tu camino de autoconocimiento.
          </p>
        </div>

        <TiendaClient initialProducts={infoproductos} />
      </div>
    </div>
  )
}
