import Link from "next/link"
import BlogCard from "./blog-card"

// Datos de ejemplo para los artículos del blog
const blogPosts = [
  {
    title: "Los tránsitos de Plutón y su impacto en la transformación personal",
    excerpt:
      "Descubre cómo los tránsitos de Plutón pueden desencadenar profundos procesos de transformación y renovación en tu vida.",
    image: "/placeholder.svg?height=300&width=400",
    date: "15 Mar 2023",
    readTime: "8 min",
    slug: "transitos-pluton",
  },
  {
    title: "La Luna en la carta natal: Tu mundo emocional revelado",
    excerpt:
      "Aprende cómo la posición de la Luna en tu carta natal influye en tus patrones emocionales y necesidades de seguridad.",
    image: "/placeholder.svg?height=300&width=400",
    date: "28 Feb 2023",
    readTime: "6 min",
    slug: "luna-carta-natal",
  },
  {
    title: "Mercurio retrógrado: Mitos y realidades",
    excerpt:
      "Desmitificando Mercurio retrógrado: qué significa realmente y cómo aprovechar esta energía para la introspección.",
    image: "/placeholder.svg?height=300&width=400",
    date: "10 Feb 2023",
    readTime: "5 min",
    slug: "mercurio-retrogrado",
  },
]

export default function BlogSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Últimos Artículos</h2>
          <p className="section-subtitle mx-auto">
            Explora contenido sobre astrología psicológica, autodescubrimiento y crecimiento personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              date={post.date}
              readTime={post.readTime}
              slug={post.slug}
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/blog" className="btn-secondary">
            Ver más artículos
          </Link>
        </div>
      </div>
    </section>
  )
}

