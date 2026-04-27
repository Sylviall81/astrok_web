import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

export async function POST(req: Request) {
  const data = await req.json()

  // Guardado en WP: no bloqueante, best-effort con timeout de 5s
  if (process.env.WC_AUTH_USER && process.env.WC_AUTH_PASSWORD) {
    const wpAuth = Buffer.from(
      `${process.env.WC_AUTH_USER}:${process.env.WC_AUTH_PASSWORD}`
    ).toString("base64")
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    fetch(`${WP_URL}/wp-json/wp/v2/contacto`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${wpAuth}` },
      body: JSON.stringify({ title: data.name, status: "publish", acf: { name: data.name, email: data.email, message: data.message } }),
      signal: controller.signal,
    })
      .catch(() => {})
      .finally(() => clearTimeout(timeout))
  }

  try {
    await resend.emails.send({
      from: "Kaleidoscope Astrología <hola@mail.astrokaleido.com>",
      replyTo: data.email,
      to: "hola@astrokaleido.com",
      subject: "Nuevo contacto de Kaleidoscope Web",
      html: `
        <h2>Nuevo mensaje desde Kaleidoscope</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mensaje:</strong> ${data.message}</p>
      `,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return new Response(JSON.stringify({ error: "Error enviando email" }), { status: 500 })
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
