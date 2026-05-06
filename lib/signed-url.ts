import { createHmac, timingSafeEqual } from "crypto"

const SECRET = process.env.DOWNLOAD_SECRET ?? ""

export function signDownloadUrl(fileUrl: string, ttlSeconds: number): string {
  const expires = Math.floor(Date.now() / 1000) + ttlSeconds
  const payload = `${fileUrl}|${expires}`
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex")
  return sig + "|" + expires
}

export function verifyDownloadToken(fileUrl: string, token: string): boolean {
  const parts = token.split("|")
  if (parts.length !== 2) return false
  const [sig, expiresStr] = parts
  const expires = parseInt(expiresStr, 10)
  if (isNaN(expires) || Date.now() / 1000 > expires) return false

  const payload = `${fileUrl}|${expires}`
  const expected = createHmac("sha256", SECRET).update(payload).digest("hex")

  try {
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))
  } catch {
    return false
  }
}
