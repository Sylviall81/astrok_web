import Link from "next/link"
import ServiceCard from "@/components/service-card"

// Datos de ejemplo para todos los servicios
const allServices = [
  {
    title: "Carta Natal",
    description: "Un análisis profundo de tu mapa natal que revela tus potenciales, desafíos y propósito de vida.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "carta-natal",
    price: "120€",
  },
  {
    title: "Revolución Solar",
    description: "Descubre las energías y oportunidades que te acompañarán durante tu próximo año solar.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "revolucion-solar",
    price: "100€",
  },
  {
    title: "Sinastría",
    description: "Análisis de compatibilidad que explora la dinámica entre dos personas a nivel astrológico.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "sinastria",
    price: "150€",
  },
  {
    title: "Pack Integral",
    description: "Combinación de carta natal y revolución solar para una visión completa de tu momento actual.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "pack-integral",
    price: "200€",
  },
  {
    title: "Astro-Report",
    description: "Informe astrológico detallado en formato PDF con interpretaciones personalizadas.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "astro-report",
    price: "80€",
  },
  {
    title: "Tránsitos Anuales",
    description: "Análisis de los movimientos planetarios y su influencia en tu vida durante todo el año.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "transitos-anuales",
    price: "120€",
  },
  {
    title: "Consulta Temática",
    description: "Sesión enfocada en un área específica: relaciones, carrera, propósito de vida, etc.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "consulta-tematica",
    price: "90€",
  },
  {
    title: "Progresiones Secundarias",
    description: "Análisis de tu evolución interna y desarrollo psicológico a lo largo del tiempo.",
    image: "/placeholder.svg?height=300&width=400",
    slug: "progresiones-secundarias",
    price: "110€",
  },
]

export default function ServicesPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-6">Servicios</h1>
          <p className="text-xl text-secondary">
            Descubre cómo la astrología psicológica puede ayudarte a comprender mejor tu camino y potencial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service) => (
            <div key={service.slug} className="flex flex-col h-full">
              <ServiceCard
                title={service.title}
                description={service.description}
                image={service.image}
                slug={service.slug}
              />
              <div className="mt-4 text-center">
                <p className="text-lg font-lato font-semibold text-primary">{service.price}</p>
              </div>
            </div>
          ))}
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
      </div>
    </section>
  )
}

