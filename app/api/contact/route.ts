import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const data = await req.json()

  const res = await fetch("http://kaleidoastro.local/wp-json/wp/v2/contacto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization":
        "Basic " + Buffer.from("admin@kaleidoastro.local:adminastrok111").toString("base64"),
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

  const result = await res.json()


   // 2. Enviar email a tu clienta usando Resend
  await resend.emails.send({
    from: "Contacto Web Kaleidoscope <onboarding@resend.dev>",
    to: "kaleidoscopebcn@gmail.com",
    subject: "Nuevo contacto de Kaleidoscope Web",
    html: `
      <h2>Nuevo mensaje desde Kaleidoscope</h2>
      <p><strong>Nombre:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Mensaje:</strong> ${data.message}</p>
    `,
  })

  return new Response(JSON.stringify(result), { status: 200 })
}