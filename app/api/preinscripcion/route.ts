import { Resend } from "resend"

// Preinscripción del curso "Tu carta natal: de las partes al todo" (/curso-carta-natal).
// Alta en la lista de preinscripción de Brevo (BREVO_LIST_ID) y, si marca la casilla,
// también en la lista de newsletter (BREVO_NEWSLETTER_LIST_ID). Aviso a hola@ con Resend.
// Mientras no existan BREVO_API_KEY y BREVO_LIST_ID responde 503: el formulario no está conectado.
// TODO: nombre de la lista de Brevo (propuesta: "Preinscripción curso carta natal 2027").

const resend = new Resend(process.env.RESEND_API_KEY)

const MOTIVOS = ["curso", "pensando", "clase-abierta"]
const PRECIOS = ["apoyo", "estandar", "solidario", "no-lo-se"]
const EXPERIENCIA = ["nada", "algo", "bastante"]
const HORARIOS = ["entre-semana-tarde", "entre-semana-noche", "otro"]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const json = (body: object, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } })

export async function POST(req: Request) {
  const apiKey = process.env.BREVO_API_KEY
  const listId = Number(process.env.BREVO_LIST_ID)
  const newsletterListId = Number(process.env.BREVO_NEWSLETTER_LIST_ID)

  if (!apiKey || !listId) {
    return json({ message: "La preinscripción todavía no está disponible. Vuelve a intentarlo en unos días." }, 503)
  }

  const data = await req.json().catch(() => null)
  if (!data) return json({ message: "Datos no válidos." }, 400)

  const nombre = typeof data.nombre === "string" ? data.nombre.trim() : ""
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : ""
  const horarios: string[] = Array.isArray(data.horarios)
    ? data.horarios.filter((h: unknown) => typeof h === "string" && HORARIOS.includes(h))
    : []
  const horarioOtro =
    horarios.includes("otro") && typeof data.horarioOtro === "string" ? data.horarioOtro.trim().slice(0, 200) : ""

  if (
    nombre.length < 2 ||
    nombre.length > 100 ||
    !EMAIL_RE.test(email) ||
    email.length > 254 ||
    !MOTIVOS.includes(data.motivo) ||
    !PRECIOS.includes(data.precio) ||
    !EXPERIENCIA.includes(data.experiencia)
  ) {
    return json({ message: "Revisa los campos del formulario." }, 400)
  }

  if (data.privacidad !== true) {
    return json({ message: "Debes aceptar la política de privacidad." }, 400)
  }

  const claseAbierta = data.claseAbierta === true
  const newsletter = data.newsletter === true
  const horario = [...horarios.filter((h) => h !== "otro"), horarioOtro && `otro: ${horarioOtro}`]
    .filter(Boolean)
    .join(", ")

  // Los atributos tienen que existir en Brevo con estos nombres (Contactos > Configuración > Atributos).
  const attributes = {
    FIRSTNAME: nombre,
    PRE_MOTIVO: data.motivo,
    PRE_PRECIO: data.precio,
    PRE_EXPERIENCIA: data.experiencia,
    PRE_HORARIO: horario,
    PRE_CLASE_ABIERTA: claseAbierta,
  }

  const listIds = [listId]
  if (newsletter) {
    if (newsletterListId) listIds.push(newsletterListId)
    else console.warn("[preinscripcion] Falta BREVO_NEWSLETTER_LIST_ID: no se da de alta en la newsletter")
  }

  // updateEnabled: si el correo ya existe en Brevo, se actualizan los atributos y se añade a las listas
  const res = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, attributes, listIds, updateEnabled: true }),
  })

  if (!res.ok) {
    console.error("[preinscripcion] Error guardando contacto en Brevo:", res.status, await res.text())
    return json({ message: "Error al procesar la preinscripción." }, 500)
  }

  await resend.emails
    .send({
      from: "Kaleidoscope Astrología <hola@mail.astrokaleido.com>",
      to: "hola@astrokaleido.com",
      subject: "Nueva preinscripción — Curso carta natal",
      html: `
        <p>Nueva preinscripción al curso <strong>Tu carta natal: de las partes al todo</strong>:</p>
        <ul>
          <li>Nombre: ${escapeHtml(nombre)}</li>
          <li>Email: ${escapeHtml(email)}</li>
          <li>Qué le trae: ${data.motivo}</li>
          <li>Precio: ${data.precio}</li>
          <li>Astrología antes: ${data.experiencia}</li>
          <li>Otro horario: ${escapeHtml(horario) || "—"}</li>
          <li>Clase abierta: ${claseAbierta ? "sí" : "no"}</li>
          <li>Newsletter: ${newsletter ? "sí" : "no"}</li>
        </ul>`,
    })
    .catch((err) => console.error("[preinscripcion] Error notificando preinscripción:", err))

  return json({ success: true }, 201)
}
