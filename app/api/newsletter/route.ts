export async function POST(req: Request) {
  const data = await req.json()

  // Validación básica en el servidor
  if (!data.email || !data.gdpr_consent) {
    return new Response(
      JSON.stringify({ message: "Email y consentimiento GDPR son obligatorios." }),
      { status: 400 }
    )
  }

  const wpAuth = Buffer.from(
    `${process.env.WC_AUTH_USER}:${process.env.WC_AUTH_PASSWORD}`
  ).toString("base64")

  const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/newsletter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${wpAuth}`,
    },
    body: JSON.stringify({
      title: data.email,
      status: "publish",
      acf: {
        email: data.email,
        status: "active",
        source: data.source || "newsletter_section",
        gdpr_consent: data.gdpr_consent,
        created_at: new Date().toISOString().replace("T", " ").substring(0, 19),
      },
    }),
  })

  const result = await res.json()

  if (!res.ok) {
    return new Response(
      JSON.stringify({ message: result.message || "Error al guardar en WordPress." }),
      { status: res.status }
    )
  }

  return new Response(
    JSON.stringify({ success: true, message: "¡Suscripción completada con éxito!" }),
    { status: 201 }
  )
}
