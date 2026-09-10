// app/blog/page.tsx
import BlogList from "@/components/blog-list"
import { getPostsPage, POSTS_PER_PAGE } from "@/lib/wordpress"
import type { Metadata } from "next"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Blog | Kaleidoscope Astrología",
  description:
    "Artículos sobre astrología evolutiva, signos, tránsitos y reflexión interna. Profundiza en tu mapa y gana herramientas prácticas para tu vida.",
}

export default async function BlogPage() {
  let posts: Awaited<ReturnType<typeof getPostsPage>>["posts"] = []
  let totalPages = 1
  try {
    const result = await getPostsPage(1, POSTS_PER_PAGE)
    posts = result.posts
    totalPages = result.totalPages
  } catch {
    // WordPress no disponible temporalmente
  }

  return <BlogList posts={posts} currentPage={1} totalPages={totalPages} />
}
