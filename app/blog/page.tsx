import BlogCard from "@/components/blog-card"

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
  {
    title: "El Nodo Norte: Tu camino de evolución espiritual",
    excerpt:
      "Explora cómo el Nodo Norte en tu carta natal señala el camino de crecimiento y evolución que tu alma busca en esta vida.",
    image: "/placeholder.svg?height=300&width=400",
    date: "25 Ene 2023",
    readTime: "7 min",
    slug: "nodo-norte",
  },
  {
    title: "Venus retrógrado: Reevaluando relaciones y valores",
    excerpt: "Cómo aprovechar el periodo de Venus retrógrado para revisar y sanar tus relaciones y sistema de valores.",
    image: "/placeholder.svg?height=300&width=400",
    date: "12 Ene 2023",
    readTime: "6 min",
    slug: "venus-retrogrado",
  },
  {
    title: "Saturno: El maestro de las lecciones kármicas",
    excerpt:
      "Comprende cómo Saturno en tu carta natal revela tus mayores desafíos y el camino hacia la maestría personal.",
    image: "/placeholder.svg?height=300&width=400",
    date: "5 Ene 2023",
    readTime: "9 min",
    slug: "saturno-lecciones-karmicas",
  },
]

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-6">Blog</h1>
          <p className="text-xl text-secondary">
            Explora artículos sobre astrología psicológica, autodescubrimiento y crecimiento personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              date={post.date}
              readTime={post.readTime}
              slug={post.slug}
              showShareButtons={true}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

