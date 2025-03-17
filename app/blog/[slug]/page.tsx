import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import ShareButtons from "@/components/share-buttons"

// Datos de ejemplo para los artículos del blog
const blogPosts = {
  "transitos-pluton": {
    title: "Los tránsitos de Plutón y su impacto en la transformación personal",
    excerpt:
      "Descubre cómo los tránsitos de Plutón pueden desencadenar profundos procesos de transformación y renovación en tu vida.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "15 Mar 2023",
    readTime: "8 min",
    content: `
      <p>Plutón, el planeta más lejano de nuestro sistema solar, representa en astrología las fuerzas de transformación profunda, muerte y renacimiento, poder y regeneración. Cuando Plutón forma aspectos significativos con planetas en nuestra carta natal a través de sus tránsitos, podemos experimentar algunos de los cambios más profundos y transformadores de nuestra vida.</p>
      
      <h2>¿Qué son los tránsitos de Plutón?</h2>
      
      <p>Los tránsitos ocurren cuando un planeta en su movimiento actual forma aspectos con los planetas en nuestra carta natal. Plutón es el más lento de todos los planetas, tardando aproximadamente 248 años en completar su órbita alrededor del Sol. Esto significa que sus tránsitos son de larga duración, pudiendo afectar áreas de nuestra vida durante 2-3 años.</p>
      
      <p>Debido a su naturaleza transformadora, los tránsitos de Plutón suelen asociarse con:</p>
      
      <ul>
        <li>Procesos de muerte y renacimiento simbólicos</li>
        <li>Transformaciones profundas e irreversibles</li>
        <li>Confrontación con aspectos de la sombra personal</li>
        <li>Experiencias de poder y control (o su pérdida)</li>
        <li>Regeneración y renovación</li>
      </ul>
      
      <h2>Fases de un tránsito plutoniano</h2>
      
      <p>Los tránsitos de Plutón suelen seguir un patrón reconocible que podemos dividir en tres fases:</p>
      
      <h3>1. Desintegración</h3>
      
      <p>En esta primera fase, estructuras, relaciones o situaciones que ya no sirven a nuestro crecimiento comienzan a desmoronarse. Puede manifestarse como crisis, pérdidas o situaciones que nos obligan a enfrentar verdades incómodas. Esta fase puede ser dolorosa, ya que implica soltar lo familiar, incluso si ya no nos sirve.</p>
      
      <h3>2. Limbo</h3>
      
      <p>Tras la desintegración viene un periodo de incertidumbre, donde lo viejo ya no existe pero lo nuevo aún no ha tomado forma. Esta fase intermedia puede ser desconcertante pero es esencial para el proceso transformativo. Es un tiempo de introspección profunda, de confrontar nuestra sombra y de reconectar con aspectos olvidados de nosotros mismos.</p>
      
      <h3>3. Renacimiento</h3>
      
      <p>Finalmente, emerge una nueva versión de nosotros mismos o de la situación. Esta fase se caracteriza por un sentido de empoderamiento, claridad y propósito renovado. Lo que surge de este proceso es más auténtico y alineado con nuestra verdadera esencia.</p>
      
      <h2>Tránsitos de Plutón a planetas personales</h2>
      
      <p>El impacto de Plutón varía según el planeta natal con el que forma aspectos:</p>
      
      <h3>Plutón - Sol</h3>
      
      <p>Transformación de la identidad y propósito vital. Puede manifestarse como una crisis de identidad seguida por un profundo redescubrimiento de quiénes somos realmente.</p>
      
      <h3>Plutón - Luna</h3>
      
      <p>Transformación emocional profunda. Patrones emocionales inconscientes salen a la superficie para ser sanados, llevando a una mayor inteligencia emocional y autenticidad.</p>
      
      <h3>Plutón - Mercurio</h3>
      
      <p>Transformación de la mente y forma de comunicación. Puede manifestarse como un periodo de investigación profunda o el desarrollo de habilidades psicológicas y perceptivas.</p>
      
      <h3>Plutón - Venus</h3>
      
      <p>Transformación en relaciones y valores. Relaciones superficiales pueden terminar, mientras que las auténticas se profundizan. También puede transformar nuestra relación con el dinero y los recursos.</p>
      
      <h3>Plutón - Marte</h3>
      
      <p>Transformación de la voluntad y la forma de actuar. Puede manifestarse como un periodo de intenso trabajo interior para liberar patrones de ira reprimida o agresión, resultando en un uso más consciente de nuestra energía.</p>
      
      <h2>Cómo trabajar conscientemente con los tránsitos de Plutón</h2>
      
      <p>Aunque los tránsitos de Plutón pueden ser desafiantes, ofrecen una oportunidad incomparable para el crecimiento y la transformación. Aquí hay algunas sugerencias para trabajar conscientemente con estas energías:</p>
      
      <ol>
        <li><strong>Practica la rendición:</strong> Resistirse al cambio plutoniano solo intensifica el sufrimiento. Aprende a soltar y confiar en el proceso.</li>
        <li><strong>Trabaja con tu sombra:</strong> Plutón saca a la luz aspectos reprimidos. La terapia, el trabajo con sueños o la meditación pueden ayudarte a integrar estos aspectos.</li>
        <li><strong>Cultiva la honestidad radical:</strong> Plutón demanda autenticidad. Sé honesto contigo mismo sobre lo que realmente deseas y necesitas.</li>
        <li><strong>Busca el significado más profundo:</strong> Pregúntate qué lección o crecimiento te está ofreciendo esta experiencia.</li>
        <li><strong>Confía en tu capacidad de regeneración:</strong> Recuerda que después de cada "muerte" simbólica viene un renacimiento.</li>
      </ol>
      
      <h2>Conclusión</h2>
      
      <p>Los tránsitos de Plutón, aunque desafiantes, son oportunidades para una profunda transformación y evolución personal. Al comprender la naturaleza de estas energías y trabajar conscientemente con ellas, podemos navegar estos periodos con mayor gracia y emerger más empoderados, auténticos y alineados con nuestro verdadero ser.</p>
      
      <p>Recuerda que la astrología es una herramienta para el autoconocimiento y el crecimiento personal. Los tránsitos no determinan nuestro destino, sino que iluminan oportunidades para nuestra evolución consciente.</p>
    `,
  },
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-lato font-semibold text-primary mb-6">Artículo no encontrado</h1>
        <p className="mb-8">Lo sentimos, el artículo que buscas no está disponible.</p>
        <Link href="/blog" className="btn-primary">
          Ver todos los artículos
        </Link>
      </div>
    )
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-lato font-bold text-primary mb-6">{post.title}</h1>

          <div className="flex items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          <div className="flex justify-end mb-8">
            <ShareButtons url={`https://kaleidoscope.com/blog/${params.slug}`} title={post.title} />
          </div>

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="border-t border-gray-200 mt-12 pt-8">
            <h3 className="text-xl font-lato font-semibold text-primary mb-4">¿Te ha gustado este artículo?</h3>
            <p className="mb-6">
              Si quieres profundizar en este tema, puedes agendar una sesión personalizada donde exploraremos cómo estos
              tránsitos están afectando tu carta natal específica.
            </p>
            <Link href="/agenda" className="btn-primary">
              Agenda tu sesión
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

