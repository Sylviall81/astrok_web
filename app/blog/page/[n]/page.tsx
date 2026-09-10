// app/blog/page/[n]/page.tsx
import { redirect, notFound } from "next/navigation"
import type { Metadata } from "next"
import BlogList from "@/components/blog-list"
import { getPostsPage, POSTS_PER_PAGE } from "@/lib/wordpress"

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const { totalPages } = await getPostsPage(1, POSTS_PER_PAGE)
    return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({ n: String(i + 2) }))
  } catch {
    return []
  }
}

export const metadata: Metadata = {
  title: "Blog | Kaleidoscope Astrología",
  description:
    "Artículos sobre astrología evolutiva, signos, tránsitos y reflexión interna. Profundiza en tu mapa y gana herramientas prácticas para tu vida.",
}

export default async function BlogPaginatedPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params
  const page = Number(n)

  if (!Number.isInteger(page) || page < 1) notFound()
  if (page === 1) redirect("/blog")

  const { posts, totalPages } = await getPostsPage(page, POSTS_PER_PAGE)
  if (posts.length === 0) notFound()

  return <BlogList posts={posts} currentPage={page} totalPages={totalPages} />
}
