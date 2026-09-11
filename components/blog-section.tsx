"use client"

import { useEffect, useRef, useState } from "react"
import BlogCard from "@/components/blog-card"
import { formatDate, readingTime } from "@/lib/wordpress"
import type { WPPost } from "@/lib/wordpress"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Máximo de artículos a mostrar en el home (destacados + slider); el resto solo se ve en /blog
const MAX_HOME_POSTS = 6

export default function BlogSection() {
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)

  const sliderRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth } = sliderRef.current
      const scrollAmount = clientWidth * 0.8
      const maxScroll = scrollWidth - clientWidth
      const newPosition =
        direction === "right"
          ? Math.min(scrollPosition + scrollAmount, maxScroll)
          : Math.max(scrollPosition - scrollAmount, 0)

      sliderRef.current.scrollTo({ left: newPosition, behavior: "smooth" })
      setScrollPosition(newPosition)
    }
  }

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const skeleton = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <section className="py-16 md:py-24 section-alt">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Últimos Artículos</h2>
          <p className="section-subtitle mx-auto">
            Explora contenido sobre astrología psicológica, autodescubrimiento y crecimiento personal.
          </p>
        </div>

        {loading ? skeleton : (
          <div className="relative mb-10">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md text-primary hover:text-accent transition-colors"
              aria-label="Anterior"
              disabled={scrollPosition === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div
              ref={sliderRef}
              className="flex items-stretch overflow-x-auto gap-4 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {posts.slice(0, MAX_HOME_POSTS).map((post) => (
                <div key={post.slug} className="flex-none w-80 md:w-96">
                  <BlogCard
                    title={post.title.rendered}
                    excerpt={post.excerpt.rendered.replace(/<[^>]+>/g, "")}
                    image={post.featuredImageUrl ?? "/placeholder.svg?height=300&width=400"}
                    date={formatDate(post.date)}
                    readTime={readingTime(post.content.rendered)}
                    slug={post.slug}
                    showShareButtons={false}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md text-primary hover:text-accent transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}

        <div className="text-center">
          <Link href="/blog" className="btn-secondary">
            Ver más artículos
          </Link>
        </div>
      </div>
    </section>
  )
}
