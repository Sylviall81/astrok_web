import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = "Kaleidoscope Astrología <hola@mail.astrokaleido.com>"
const REPLY_TO = "hola@astrokaleido.com"
const SYLVIA_EMAIL = "hola@astrokaleido.com"
const INSTAGRAM_URL = "https://www.instagram.com/astrokaleido/"

export async function POST(req: NextRequest) {
  const secret = process.env.CAL_WEBHOOK_SECRET
  if (secret) {
    const signature = req.headers.get("x-cal-signature-256")
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 })
    }
    // Verificación HMAC opcional — activar cuando se configure el secret en cal.com
    // const body = await req.text()
    // const expected = createHmac("sha256", secret).update(body).digest("hex")
    // if (signature !== expected) return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  let payload: any
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  // Cal.com envía { triggerEvent, payload: { ... } }
  const triggerEvent: string = payload.triggerEvent ?? payload.type ?? ""
  const booking = payload.payload ?? payload

  // Solo procesamos reservas confirmadas/creadas
  if (!["BOOKING_CREATED", "BOOKING_CONFIRMED", "BOOKING_PAID"].includes(triggerEvent)) {
    return NextResponse.json({ received: true })
  }

  const attendee = booking.attendees?.[0]
  const customerEmail: string | undefined = attendee?.email
  const customerName: string = attendee?.name?.split(" ")[0] ?? "corazón"
  const eventTitle: string = booking.title ?? booking.eventType?.title ?? "sesión"
  const startTime: string | undefined = booking.startTime

  const formattedDate = startTime
    ? new Date(startTime).toLocaleString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Madrid",
      })
    : null

  if (customerEmail) {
    const { error } = await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: customerEmail,
      subject: "Tu sesión está confirmada — Kaleidoscope Astrología",
      html: buildConfirmacionEmail(customerName, eventTitle, formattedDate),
    })
    if (error) {
      console.error("[cal-webhook] Error enviando email al cliente:", error)
    }
  }

  await resend.emails.send({
    from: FROM,
    replyTo: REPLY_TO,
    to: SYLVIA_EMAIL,
    subject: `Nueva reserva — ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px;">
        <h2 style="color: #2c2c2c;">Nueva reserva confirmada</h2>
        <p><strong>Cliente:</strong> ${attendee?.name ?? "—"}</p>
        <p><strong>Email:</strong> ${customerEmail ?? "—"}</p>
        <p><strong>Sesión:</strong> ${eventTitle}</p>
        ${formattedDate ? `<p><strong>Fecha:</strong> ${formattedDate}</p>` : ""}
      </div>
    `,
  })

  return NextResponse.json({ received: true })
}

function buildConfirmacionEmail(name: string, eventTitle: string, fecha: string | null): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0; padding:0; background-color:#f9f7f4;">
  <div style="max-width:560px; margin:40px auto; background:#fff; padding:48px; border-radius:8px; font-family:Georgia,serif; color:#2c2c2c;">
    <p style="font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:#9b8c7a; margin:0 0 36px;">Kaleidoscope Astrología</p>

    <h1 style="font-size:22px; font-weight:normal; margin:0 0 28px; line-height:1.4;">Hola ${name},</h1>

    <p style="font-size:16px; line-height:1.75; margin:0 0 20px;">Tu sesión de <strong>${eventTitle}</strong> está confirmada.</p>

    ${fecha ? `<p style="font-size:16px; line-height:1.75; margin:0 0 20px;"><strong>Fecha y hora:</strong> ${fecha}</p>` : ""}

    <p style="font-size:16px; line-height:1.75; margin:0 0 20px;">Recibirás los detalles de acceso a la videollamada en el correo de confirmación de cal.com. Si prefieres sesión presencial en Barcelona, escríbeme para coordinarlo.</p>

    <p style="font-size:15px; font-style:italic; line-height:1.75; color:#5a5a5a; margin:28px 0;">Mirar hacia dentro a través del lenguaje de las estrellas.</p>

    <p style="font-size:16px; line-height:1.75; margin:0 0 20px;">Si tienes cualquier pregunta antes de la sesión, puedes responder directamente a este email.</p>

    <p style="font-size:16px; line-height:1.75; margin:0 0 28px;">También puedes seguir mi trabajo aquí:<br>
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
