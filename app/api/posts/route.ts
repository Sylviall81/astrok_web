import { NextResponse } from "next/server"
import { getPosts } from "@/lib/wordpress"

export const runtime = "edge"

export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json(posts, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=600" },
    })
  } catch (error: any) {
    console.error("Error fetching posts:", error.message)

    // Debug temporal: muestra los primeros 300 chars de la respuesta problemática
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=1`,
        { headers: { "User-Agent": "Mozilla/5.0 (compatible; AstrokWeb/1.0)" } }
      )
      const text = await res.text()
      console.error("[debug] raw response snippet:", text.slice(0, 300))
      return NextResponse.json({ error: error.message, debug: text.slice(0, 300) }, { status: 500 })
    } catch (e2: any) {
      return NextResponse.json({ error: error.message, debug: e2.message }, { status: 500 })
    }
  }
}
