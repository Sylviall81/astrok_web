import { type NextRequest, NextResponse } from "next/server"
import { verifyDownloadToken } from "@/lib/signed-url"

const WC_BASE = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? ""

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const fileUrl = searchParams.get("url")
  const token = searchParams.get("token")

  if (!fileUrl) {
    return new NextResponse("Missing url", { status: 400 })
  }

  // If a token is present (email links), verify signature and expiry
  if (token !== null) {
    if (!verifyDownloadToken(fileUrl, token)) {
      return new NextResponse("Este enlace ha caducado o no es válido.", { status: 410 })
    }
  } else {
    // No token — only allow from our own WC domain (success page links)
    if (!fileUrl.startsWith(WC_BASE)) {
      return new NextResponse("Forbidden", { status: 403 })
    }
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
