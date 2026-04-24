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

  const { error } = await resend.contacts.create({
    audienceId: process.env.RESEND_AUDIENCE_ID!,
    email: data.email,
    unsubscribed: false,
  })

  if (error) {
    console.error("[newsletter] Error guardando contacto en Resend:", error)
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
