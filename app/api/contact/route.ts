import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

async function alertWpSaveFailure(detail: string) {
  try {
    await resend.emails.send({
      from: "Kaleidoscope Astrología <hola@mail.astrokaleido.com>",
      to: "hola@astrokaleido.com",
      subject: "⚠️ Fallo guardando contacto en WordPress",
      html: `<p>Un envío del formulario de contacto llegó por email pero no se pudo guardar en WordPress.</p><pre>${detail}</pre>`,
    })
  } catch (error) {
    console.error("Error enviando alerta de fallo WP:", error)
  }
}

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
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.text()
          console.error("Error guardando contacto en WP:", res.status, body)
          await alertWpSaveFailure(`HTTP ${res.status}: ${body}`)
        }
      })
      .catch(async (error) => {
        console.error("Error guardando contacto en WP:", error)
        await alertWpSaveFailure(String(error))
      })
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
