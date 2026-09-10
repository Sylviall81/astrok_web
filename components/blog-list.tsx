import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import BlogCard from "@/components/blog-card"
import { formatDate, readingTime } from "@/lib/wordpress"
import type { WPPost } from "@/lib/wordpress"

const hrefForPage = (page: number) => (page <= 1 ? "/blog" : `/blog/page/${page}`)

// Construye la lista de páginas a mostrar: primera, última, la actual ±1 y "…" entre huecos
function pageItems(current: number, total: number): (number | "ellipsis")[] {
  const pages = new Set<number>([1, total, current - 1, current, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)

  const items: (number | "ellipsis")[] = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) items.push("ellipsis")
    items.push(p)
  })
  return items
}

export default function BlogList({
  posts,
  currentPage,
  totalPages,
}: {
  posts: WPPost[]
  currentPage: number
  totalPages: number
}) {
  const sideLink =
    "inline-flex items-center gap-1 text-sm font-lato tracking-wide text-secondary transition-colors hover:text-primary"

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
              excerpt={post.excerpt.rendered.replace(/<[^>]+>/g, "")}
              image={post.featuredImageUrl ?? "/placeholder.svg?height=300&width=400"}
              date={formatDate(post.date)}
              readTime={readingTime(post.content.rendered)}
              slug={post.slug}
              showShareButtons={true}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            className="mt-14 flex items-center justify-center gap-3 sm:gap-6"
            aria-label="Paginación del blog"
          >
            {currentPage > 1 ? (
              <Link href={hrefForPage(currentPage - 1)} className={sideLink} rel="prev">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Anterior</span>
              </Link>
            ) : (
              <span className={`${sideLink} pointer-events-none opacity-30`} aria-hidden="true">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Anterior</span>
              </span>
            )}

            <ul className="flex items-center gap-1">
              {pageItems(currentPage, totalPages).map((item, i) =>
                item === "ellipsis" ? (
                  <li key={`e${i}`} className="px-1 text-sm text-secondary/40 select-none">
                    …
                  </li>
                ) : item === currentPage ? (
                  <li key={item}>
                    <span
                      aria-current="page"
                      className="flex h-9 min-w-9 items-center justify-center rounded-full bg-primary px-2 text-sm font-lato text-white"
                    >
                      {item}
                    </span>
                  </li>
                ) : (
                  <li key={item}>
                    <Link
                      href={hrefForPage(item)}
                      className="flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-sm font-lato text-secondary transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            {currentPage < totalPages ? (
              <Link href={hrefForPage(currentPage + 1)} className={sideLink} rel="next">
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className={`${sideLink} pointer-events-none opacity-30`} aria-hidden="true">
                <span className="hidden sm:inline">Siguiente</span>
                <ChevronRight className="h-4 w-4" />
              </span>
            )}
          </nav>
        )}
      </div>
    </section>
  )
}
