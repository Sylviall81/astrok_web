import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const data = await req.json()

  if (!data.email || !data.gdpr_consent) {
    return new Response(
      JSON.stringify({ message: "Email y consentimiento GDPR son obligatorios." }),
      { status: 400 }
    )
  }

  const { error } = await resend.emails.send({
    from: "Kaleidoscope Astrología <hola@mail.astrokaleido.com>",
    replyTo: data.email,
    to: "kaleidoscopebcn@gmail.com",
    subject: "Nueva suscripción al newsletter",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px;">
        <h2 style="color: #2c2c2c;">Nueva suscripción</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Fuente:</strong> ${data.source || "newsletter_section"}</p>
        <p><strong>GDPR:</strong> Aceptado</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}</p>
      </div>
    `,
  })

  if (error) {
    console.error("[newsletter] Error enviando notificación:", error)
    return new Response(
      JSON.stringify({ message: "Error al procesar la suscripción." }),
      { status: 500 }
    )
  }

  return new Response(
    JSON.stringify({ success: true, message: "¡Suscripción completada con éxito!" }),
    { status: 201 }
  )
}
