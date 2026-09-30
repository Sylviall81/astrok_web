import { NextResponse } from "next/server"
import { getPosts } from "@/lib/wordpress"

// ISR (no Cache-Control s-maxage): así /api/revalidate puede invalidarla con
// revalidatePath("/api/posts") al publicar o editar en WordPress.
export const revalidate = 3600

export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json(posts)
  } catch (error: any) {
    console.error("Error fetching posts:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
