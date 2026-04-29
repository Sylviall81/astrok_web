import { NextResponse } from "next/server"
import { getPosts } from "@/lib/wordpress"

export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json(posts, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=600" },
    })
  } catch (error: any) {
    console.error("Error fetching posts:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
