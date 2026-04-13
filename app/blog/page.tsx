// app/blog/page.tsx
import BlogCard from "@/components/blog-card"
import { getPosts, formatDate, readingTime } from "@/lib/wordpress"

export const revalidate = 3600 // revalida cada hora

export default async function BlogPage() {
  const posts = await getPosts()

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
      </div>
    </section>
  )
}
