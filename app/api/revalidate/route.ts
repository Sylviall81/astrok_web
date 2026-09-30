import { revalidatePath } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"
import { timingSafeEqual } from "node:crypto"

// Revalidación bajo demanda, llamada desde WordPress (mu-plugin astrok-revalidate.php)
// al publicar, actualizar, despublicar o enviar a la papelera un post.
// Body: { slug?: string, oldSlug?: string } — oldSlug solo si cambió el permalink.

const SLUG_RE = /^[a-z0-9-]+$/

function isAuthorized(req: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET
  const got = req.headers.get("x-revalidate-secret")
  if (!expected || !got) return false
  const a = Buffer.from(got)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const slugs = [body?.slug, body?.oldSlug].filter(
    (s): s is string => typeof s === "string" && SLUG_RE.test(s),
  )

  revalidatePath("/")
  revalidatePath("/blog")
  revalidatePath("/blog/page/[n]", "page") // un post nuevo desplaza la paginación
  revalidatePath("/api/posts") // lo que lee la sección de artículos del home
  for (const slug of slugs) revalidatePath(`/blog/${slug}`)

  return NextResponse.json({ revalidated: true, slugs })
}
