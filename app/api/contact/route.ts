import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL
const wpAuth = Buffer.from(
  `${process.env.WC_AUTH_USER}:${process.env.WC_AUTH_PASSWORD}`
).toString("base64")

export async function POST(req: Request) {
  const data = await req.json()

  await fetch(`${WP_URL}/wp-json/wp/v2/contacto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${wpAuth}`,
    },
    body: JSON.stringify({
      title: data.name,
      status: "publish",
      acf: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    }),
  })

  await resend.emails.send({
    from: "Kaleidoscope Astrología <hola@mail.astrokaleido.com>",
    to: "kaleidoscopebcn@gmail.com",
    subject: "Nuevo contacto de Kaleidoscope Web",
    html: `
      <h2>Nuevo mensaje desde Kaleidoscope</h2>
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mensaje:</strong> ${data.message}</p>
    `,
  })

  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
