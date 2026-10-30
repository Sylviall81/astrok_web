import { Resend } from "resend"
import { EXPERIENCIA, HORARIOS, MOTIVOS, PRECIOS, textoDe } from "@/app/curso-carta-natal/opciones"

// Preinscripción del curso "Tu carta natal: de las partes al todo" (/curso-carta-natal).
// Crea o actualiza el contacto en Brevo, en la lista de preinscripción (BREVO_PREINSCRIPCION_LIST_ID) y,
// solo si marca la casilla, también en la de newsletter (BREVO_NEWSLETTER_LIST_ID). Guarda todas las
// respuestas como atributos del contacto, con el mismo texto que ve la persona en el formulario.
// El correo de confirmación lo envía una automatización de Brevo al entrar en la lista, no este código.
// Además avisa a hola@ con Resend (provisional, se revisa al pasar la newsletter de la portada a Brevo).
// Mientras no existan BREVO_API_KEY y BREVO_PREINSCRIPCION_LIST_ID responde 503.

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const json = (body: object, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } })

// Fecha de hoy en Barcelona, en el formato de los atributos de fecha de Brevo (AAAA-MM-DD)
const hoy = () => new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Madrid" })

export async function POST(req: Request) {
  const apiKey = process.env.BREVO_API_KEY
  const listId = Number(process.env.BREVO_PREINSCRIPCION_LIST_ID)
  const newsletterListId = Number(process.env.BREVO_NEWSLETTER_LIST_ID)

  if (!apiKey || !listId) {
    console.error("[preinscripcion] Faltan BREVO_API_KEY o BREVO_PREINSCRIPCION_LIST_ID")
    return json({ message: "La preinscripción todavía no está disponible. Vuelve a intentarlo en unos días." }, 503)
  }

  const data = await req.json().catch(() => null)
  if (!data) return json({ message: "Datos no válidos." }, 400)

  const nombre = typeof data.nombre === "string" ? data.nombre.trim() : ""
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : ""
  const motivo = textoDe(MOTIVOS, data.motivo)
  // Con "De momento, no" el precio no se pregunta: llega vacío y se guarda vacío
  const sinCurso = data.motivo === "no"
  const precio = sinCurso ? "" : textoDe(PRECIOS, data.precio)
  const nivel = textoDe(EXPERIENCIA, data.experiencia)
  const horarios = Array.isArray(data.horarios)
    ? HORARIOS.filter((h) => data.horarios.includes(h.valor)).map((h) => h.texto)
    : []
  const marcaOtro = Array.isArray(data.horarios) && data.horarios.includes("otro")
  const horarioOtro = marcaOtro && typeof data.horarioOtro === "string" ? data.horarioOtro.trim().slice(0, 200) : ""

  if (nombre.length < 2 || nombre.length > 100 || !EMAIL_RE.test(email) || email.length > 254 || !motivo || (!sinCurso && !precio) || !nivel) {
    return json({ message: "Revisa los campos del formulario." }, 400)
  }

  if (data.privacidad !== true) {
    return json({ message: "Debes aceptar la política de privacidad." }, 400)
  }

  const claseAbierta = data.claseAbierta === true
  const newsletter = data.newsletter === true

  // Los atributos existen en Brevo con estos Id. (Settings > CRM > Contactos > Atributos normales)
  const attributes = {
    NOMBRE: nombre,
    PRE_MOTIVO: motivo,
    PRE_PRECIO: precio,
    PRE_NIVEL: nivel,
    PRE_HORARIO: horarios.join(", "),
    PRE_HORARIO_OTRO: horarioOtro,
    PRE_CLASE_ABIERTA: claseAbierta,
    PRE_FECHA: hoy(),
  }

  // Si no marca la newsletter no se añade a esa lista (y, si ya estaba, no se le quita)
  const listIds = [listId]
  if (newsletter) {
    if (newsletterListId) listIds.push(newsletterListId)
    else console.warn("[preinscripcion] Falta BREVO_NEWSLETTER_LIST_ID: no se da de alta en la newsletter")
  }

  // updateEnabled: si el correo ya existe en Brevo, se actualizan sus atributos y se añade a las listas
  let res: Response
  try {
    res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email, attributes, listIds, updateEnabled: true }),
    })
  } catch (err) {
    console.error("[preinscripcion] No se pudo conectar con Brevo:", err)
    return json({ message: "No hemos podido guardar tu preinscripción." }, 502)
  }

  if (!res.ok) {
    console.error("[preinscripcion] Error guardando contacto en Brevo:", res.status, await res.text())
    return json({ message: "No hemos podido guardar tu preinscripción." }, 502)
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
          <li>¿Le interesa el curso?: ${motivo}</li>
          <li>Precio: ${precio || "—"}</li>
          <li>Astrología antes: ${nivel}</li>
          <li>Otro horario: ${horarios.join(", ") || "—"}${horarioOtro ? ` (${escapeHtml(horarioOtro)})` : ""}</li>
          <li>Clase abierta: ${claseAbierta ? "sí" : "no"}</li>
          <li>Newsletter: ${newsletter ? "sí" : "no"}</li>
        </ul>`,
    })
    .catch((err) => console.error("[preinscripcion] Error notificando preinscripción:", err))

  return json({ success: true }, 201)
}
