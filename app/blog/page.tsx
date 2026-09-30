// app/blog/page.tsx
import BlogList from "@/components/blog-list"
import { getPostsPage, POSTS_PER_PAGE } from "@/lib/wordpress"
import type { Metadata } from "next"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blog | Kaleidoscope Astrología",
  description:
    "Artículos sobre astrología evolutiva, signos, tránsitos y reflexión interna. Profundiza en tu mapa y gana herramientas prácticas para tu vida.",
  alternates: {
    canonical: "/blog",
  },
}

export default async function BlogPage() {
  // Sin try/catch a propósito: si WordPress falla durante una regeneración ISR,
  // Next.js descarta el render y sigue sirviendo la última versión buena en vez
  // de cachear una lista vacía durante una hora.
  const { posts, totalPages } = await getPostsPage(1, POSTS_PER_PAGE)

  return <BlogList posts={posts} currentPage={1} totalPages={totalPages} />
}
