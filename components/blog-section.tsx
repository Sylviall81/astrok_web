import BlogCard from "@/components/blog-card"
import { getPosts, formatDate, readingTime } from "@/lib/wordpress"
import Link from "next/link"



export default async function BlogSection() {
 const posts = await getPosts()

  return (
    <section className="py-16 md:py-24 section-alt">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Últimos Artículos</h2>
          <p className="section-subtitle mx-auto">
            Explora contenido sobre astrología psicológica, autodescubrimiento y crecimiento personal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title.rendered}
              excerpt={post.excerpt.rendered.replace(/<[^>]+>/g, "")} // quita tags HTML del excerpt
              image="/placeholder.svg?height=300&width=400" // placeholder hasta tener imagen destacada
              date={formatDate(post.date)}
              readTime={readingTime(post.content.rendered)}
              slug={post.slug}
              showShareButtons={true}
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

