import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { Resend } from "resend"
import { getProductDownloads, getVariationDownloads } from "@/lib/woocommerce"
import { signDownloadUrl } from "@/lib/signed-url"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" })
const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = "Kaleidoscope Astrología <hola@mail.astrokaleido.com>"
const REPLY_TO = "hola@astrokaleido.com"
const SYLVIA_EMAIL = "hola@astrokaleido.com"
const INSTAGRAM_URL = "https://www.instagram.com/astrokaleido/"
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://astrokaleido.com"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 })
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  const sessionWithItems = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items.data.price.product"],
  })

  const lineItems = sessionWithItems.line_items?.data ?? []
  const customerEmail = session.customer_details?.email
  const customerName = session.customer_details?.name?.split(" ")[0] ?? "corazón"

  // Fetch downloads from WooCommerce for all line items
  type DownloadLink = { productName: string; url: string }
  const downloadLinks: DownloadLink[] = []

  for (const item of lineItems) {
    const p = item.price?.product as Stripe.Product
    const wcProductId = p?.metadata?.wc_product_id
    const wcVariationId = p?.metadata?.wc_variation_id
    if (!wcProductId) continue

    try {
      const downloads = wcVariationId
        ? await getVariationDownloads(Number(wcProductId), Number(wcVariationId))
        : await getProductDownloads(Number(wcProductId))

      const TTL_7_DAYS = 7 * 24 * 60 * 60
      for (const d of downloads) {
        const token = signDownloadUrl(d.download_url, TTL_7_DAYS)
        downloadLinks.push({
          productName: p.name ?? "",
          url: `${APP_URL}/api/download?url=${encodeURIComponent(d.download_url)}&token=${token}`,
        })
      }
    } catch {
      // Non-downloadable product or WC error — skip silently
    }
  }

  const isServicio = downloadLinks.length === 0

  if (customerEmail) {
    const { error: customerEmailError } = await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: customerEmail,
      subject: isServicio
        ? "Hemos recibido tu solicitud de sesión"
        : "Acceso a tu contenido — gracias por tu confianza",
      html: isServicio
        ? buildServicioEmail(customerName)
        : buildInfoproductoEmail(customerName, downloadLinks),
    })
    if (customerEmailError) {
      console.error("[webhook] Error enviando email al cliente:", customerEmailError)
    }
  }

  const productSummary = lineItems
    .map((item) => {
      const p = item.price?.product as Stripe.Product
      return `${item.quantity}× ${p?.name ?? "Producto"} — ${((item.amount_total ?? 0) / 100).toFixed(2)} €`
    })
    .join("<br>")

  const { error: sylviaEmailError } = await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: SYLVIA_EMAIL,
    subject: `Nueva venta — ${isServicio ? "Sesión" : "Infoproducto"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px;">
        <h2 style="color: #2c2c2c;">Nueva venta en Kaleidoscope</h2>
        <p><strong>Cliente:</strong> ${session.customer_details?.name ?? "—"}</p>
        <p><strong>Email:</strong> ${customerEmail ?? "—"}</p>
        <p><strong>Productos:</strong><br>${productSummary}</p>
        <p><strong>Total:</strong> ${((session.amount_total ?? 0) / 100).toFixed(2)} €</p>
        <p style="color: #888; font-size: 13px;">ID Stripe: ${session.id}</p>
      </div>
    `,
  })
  if (sylviaEmailError) {
    console.error("[webhook] Error enviando notificación interna:", sylviaEmailError)
  }

  return NextResponse.json({ received: true })
}

function buildInfoproductoEmail(name: string, downloads: { productName: string; url: string }[]): string {
  const downloadBlock = downloads.map(d => `
    <div style="margin:8px 0;">
      <p style="margin:0 0 4px; font-size:15px;">${d.productName}</p>
      <a href="${d.url}"
         style="display:inline-block; background:#2c2c2c; color:#fff; text-decoration:none; padding:10px 20px; border-radius:4px; font-size:14px;">
        Descargar
      </a>
    </div>
  `).join("")

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0; padding:0; background-color:#f9f7f4;">
  <div style="max-width:560px; margin:40px auto; background:#fff; padding:48px; border-radius:8px; font-family:Georgia,serif; color:#2c2c2c;">
    <p style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:#9b8c7a; margin:0 0 36px;">Kaleidoscope Astrología</p>

    <h1 style="font-size:22px; font-weight:normal; margin:0 0 28px; line-height:1.4;">Hola ${name},</h1>

    <p style="font-size:16px; line-height:1.75; margin:0 0 20px;">Gracias por confiar en Kaleidoscope Astrología y en mi trabajo.</p>

    <p style="font-size:16px; line-height:1.75; margin:0 0 20px;">Tu compra se ha realizado correctamente. Aquí tienes tu enlace de descarga:</p>

    <div style="background:#f9f7f4; border-radius:6px; padding:20px 24px; margin:0 0 28px;">
      ${downloadBlock}
    </div>

    <p style="font-size:14px; color:#9b8c7a; margin:0 0 28px;">Guarda este email para poder acceder a tu contenido cuando lo necesites.</p>

    <p style="font-size:15px; font-style:italic; line-height:1.75; color:#5a5a5a; margin:28px 0;">Mirar hacia dentro a través del lenguaje de las estrellas.</p>

    <p style="font-size:16px; line-height:1.75; margin:0 0 20px;">Si tienes cualquier comentario, sugerencia o duda sobre el material, puedes responder directamente a este email. Intento responder en un plazo de 24–48 horas.</p>

    <p style="font-size:16px; line-height:1.75; margin:0 0 28px;">También puedes seguir profundizando en este espacio aquí:<br>
      <a href="${INSTAGRAM_URL}" style="color:#2c2c2c;">@astrokaleido</a>
    </p>

    <p style="font-size:16px; line-height:1.75; margin:0;">Un abrazo,<br>
      <strong>Sylvia Llorente</strong><br>
      <span style="color:#9b8c7a;">Kaleidoscope Astrología</span>
    </p>
  </div>
</body>
</html>`
}

function buildServicioEmail(name: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0; padding:0; background-color:#f9f7f4;">
  <div style="max-width:560px; margin:40px auto; background:#fff; padding:48px; border-radius:8px; font-family:Georgia,serif; color:#2c2c2c;">
    <p style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:#9b8c7a; margin:0 0 36px;">Kaleidoscope Astrología</p>

    <h1 style="font-size:22px; font-weight:normal; margin:0 0 28px; line-height:1.4;">Hola ${name},</h1>

    <p style="font-size:16px; line-height:1.75; margin:0 0 20px;">Gracias por confiar en Kaleidoscope Astrología y en mi acompañamiento.</p>

    <p style="font-size:16px; line-height:1.75; margin:0 0 20px;">He recibido correctamente tu solicitud de sesión y la propuesta de fecha. En un plazo de 24–48 horas confirmaré personalmente la disponibilidad y te escribiré con los siguientes pasos.</p>

    <p style="font-size:15px; font-style:italic; line-height:1.75; color:#5a5a5a; margin:28px 0;">Mirar hacia dentro a través del lenguaje de las estrellas.</p>

    <p style="font-size:16px; line-height:1.75; margin:0 0 20px;">Si deseas compartir previamente alguna información o tienes alguna duda, puedes responder directamente a este email.</p>

    <p style="font-size:16px; line-height:1.75; margin:0 0 28px;">También puedes seguir mi trabajo y contenidos aquí:<br>
      <a href="${INSTAGRAM_URL}" style="color:#2c2c2c;">@astrokaleido</a>
    </p>

    <p style="font-size:16px; line-height:1.75; margin:0;">Un abrazo,<br>
      <strong>Sylvia Llorente</strong><br>
      <span style="color:#9b8c7a;">Kaleidoscope Astrología</span>
    </p>
  </div>
</body>
</html>`
}
