import { type NextRequest, NextResponse } from "next/server"

const WC_BASE = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const fileUrl = searchParams.get("url")

  if (!fileUrl) {
    return new NextResponse("Missing url", { status: 400 })
  }

  if (!fileUrl.startsWith(WC_BASE)) {
    return new NextResponse("Forbidden", { status: 403 })
  }

  const res = await fetch(fileUrl)
  if (!res.ok) {
    return new NextResponse("Download failed", { status: res.status })
  }

  const filename = decodeURIComponent(fileUrl.split("/").pop()?.split("?")[0] ?? "download")
  const contentType = res.headers.get("Content-Type") ?? "application/octet-stream"

  return new NextResponse(res.body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
