import Image from "next/image"
import Link from "next/link"
import ShareButtons from "@/components/share-buttons"

// Datos de ejemplo para los servicios
const services = {
  "carta-natal": {
    title: "Carta Natal",
    description: "Un análisis profundo de tu mapa natal que revela tus potenciales, desafíos y propósito de vida.",
    image: "/placeholder.svg?height=600&width=1200",
    price: "120€",
    duration: "90 minutos",
    details: [
      "Análisis completo de tu carta natal",
      "Exploración de tus fortalezas y desafíos",
      "Identificación de patrones y tendencias",
      "Comprensión de tu propósito de vida",
      "Grabación de la sesión",
      "Informe PDF con tu carta natal",
    ],
    longDescription: `
      La carta natal es un mapa del cielo en el momento exacto de tu nacimiento. Es como una fotografía cósmica que revela la posición de los planetas, signos y casas astrológicas que influyen en tu personalidad, talentos, desafíos y propósito de vida.
      
      En esta sesión, exploraremos en profundidad tu carta natal desde una perspectiva psicológica, ayudándote a comprender los patrones que has estado viviendo, tus dones innatos y cómo puedes alinear tu vida con tu verdadero propósito.
      
      La carta natal es especialmente útil cuando estás en un momento de búsqueda personal, cuando necesitas claridad sobre tu camino o cuando quieres comprender mejor tus patrones de comportamiento y relaciones.
    `,
  },
  "revolucion-solar": {
    title: "Revolución Solar",
    description: "Descubre las energías y oportunidades que te acompañarán durante tu próximo año solar.",
    image: "/placeholder.svg?height=600&width=1200",
    price: "100€",
    duration: "75 minutos",
    details: [
      "Análisis del mapa de tu año solar",
      "Tendencias y oportunidades del año",
      "Periodos favorables para diferentes áreas",
      "Estrategias para aprovechar las energías",
      "Grabación de la sesión",
      "Informe PDF con tu revolución solar",
    ],
    longDescription: `
      La Revolución Solar es un mapa astrológico que se calcula para el momento exacto en que el Sol regresa a la misma posición que ocupaba cuando naciste, lo que ocurre aproximadamente en tu cumpleaños cada año.
      
      Este mapa revela las energías, oportunidades y desafíos específicos que te acompañarán durante tu próximo año solar. Es como un "pronóstico personalizado" que te ayuda a navegar el año con mayor conciencia y preparación.
      
      En esta sesión, analizaremos las áreas de tu vida que estarán más activadas durante el año, los periodos más favorables para diferentes actividades y cómo puedes aprovechar al máximo las energías disponibles.
      
      La Revolución Solar es ideal para realizarla cerca de tu cumpleaños, como una forma de prepararte para tu nuevo ciclo anual.
    `,
  },
  sinastria: {
    title: "Sinastría",
    description: "Análisis de compatibilidad que explora la dinámica entre dos personas a nivel astrológico.",
    image: "/placeholder.svg?height=600&width=1200",
    price: "150€",
    duration: "120 minutos",
    details: [
      "Análisis de compatibilidad entre dos cartas natales",
      "Exploración de la dinámica relacional",
      "Identificación de fortalezas y desafíos en la relación",
      "Estrategias para mejorar la comunicación",
      "Grabación de la sesión",
      "Informe PDF con el análisis de sinastría",
    ],
    longDescription: `
      La Sinastría es un análisis astrológico que compara dos cartas natales para revelar la dinámica energética entre dos personas. Es como un mapa que muestra cómo se conectan e interactúan sus energías a nivel profundo.
      
      En esta sesión, exploraremos la compatibilidad entre ambas cartas, identificando las áreas de armonía natural, los desafíos potenciales y cómo pueden complementarse mutuamente para crear una relación más consciente y satisfactoria.
      
      Analizaremos aspectos como la comunicación, la atracción, los valores compartidos, los patrones emocionales y cómo pueden apoyarse mutuamente en su crecimiento personal.
      
      La Sinastría es ideal para parejas que desean profundizar en su comprensión mutua, para relaciones familiares complejas o para cualquier vínculo importante donde quieras entender mejor la dinámica relacional.
    `,
  },
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services[params.slug as keyof typeof services]

  if (!service) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-lato font-semibold text-primary mb-6">Servicio no encontrado</h1>
        <p className="mb-8">Lo sentimos, el servicio que buscas no está disponible.</p>
        <Link href="/servicios" className="btn-primary">
          Ver todos los servicios
        </Link>
      </div>
    )
  }

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-8">{service.title}</h1>

            <div className="relative h-[400px] rounded-lg overflow-hidden mb-10">
              <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
            </div>

            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-2xl font-lato font-semibold text-primary">{service.price}</p>
                <p className="text-gray-600">Duración: {service.duration}</p>
              </div>

              <div className="flex space-x-4">
                <Link href="/agenda" className="btn-primary">
                  Reservar ahora
                </Link>
                <ShareButtons url={`https://kaleidoscope.com/servicios/${params.slug}`} title={service.title} />
              </div>
            </div>

            <div className="prose prose-lg max-w-none mb-10">
              <h2 className="text-2xl font-lato font-semibold text-primary mb-4">Descripción</h2>
              {service.longDescription.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="bg-neutral-light p-8 rounded-lg mb-10">
              <h2 className="text-2xl font-lato font-semibold text-primary mb-6">¿Qué incluye?</h2>
              <ul className="space-y-3">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <Link href="/agenda" className="btn-primary inline-block">
                Reservar sesión
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

