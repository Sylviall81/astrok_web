"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { EVENTO_CLASE_ABIERTA } from "./clase-abierta-boton"

// Mismo aspecto que components/contact-form.tsx. Envía a /api/preinscripcion (Brevo).

const MOTIVOS = [
  { valor: "curso", texto: "Quiero hacer el curso" },
  { valor: "pensando", texto: "Me lo estoy pensando" },
  { valor: "clase-abierta", texto: "De momento, solo la clase abierta" },
]

const PRECIOS = [
  { valor: "apoyo", texto: "Apoyo" },
  { valor: "estandar", texto: "Estándar" },
  { valor: "solidario", texto: "Solidario" },
  { valor: "no-lo-se", texto: "Aún no lo sé" },
]

const EXPERIENCIA = [
  { valor: "nada", texto: "Nada" },
  { valor: "algo", texto: "Algo" },
  { valor: "bastante", texto: "Bastante" },
]

const HORARIOS = [
  { valor: "entre-semana-tarde", texto: "Entre semana por la tarde" },
  { valor: "entre-semana-noche", texto: "Entre semana por la noche" },
  { valor: "otro", texto: "Otro" },
]

const ESTADO_INICIAL = {
  nombre: "",
  email: "",
  motivo: "",
  precio: "",
  experiencia: "",
  horarios: [] as string[],
  horarioOtro: "",
  claseAbierta: false,
  privacidad: false,
  newsletter: false,
}

const inputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
const labelClass = "block text-sm font-medium text-primary mb-1"
const legendClass = "text-sm font-medium text-primary mb-2"
const opcionClass = "flex items-center gap-2 text-body cursor-pointer"
const checkClass = "w-4 h-4 shrink-0 cursor-pointer accent-primary"

function GrupoRadio({
  nombre,
  leyenda,
  opciones,
  valor,
  onChange,
}: {
  nombre: string
  leyenda: string
  opciones: { valor: string; texto: string }[]
  valor: string
  onChange: (valor: string) => void
}) {
  return (
    <fieldset>
      <legend className={legendClass}>{leyenda}</legend>
      <div className="space-y-2">
        {opciones.map((opcion) => (
          <label key={opcion.valor} className={opcionClass}>
            <input
              type="radio"
              name={nombre}
              value={opcion.valor}
              checked={valor === opcion.valor}
              onChange={() => onChange(opcion.valor)}
              required
              className={checkClass}
            />
            {opcion.texto}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function PreinscripcionForm() {
  const [form, setForm] = useState(ESTADO_INICIAL)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  // Marca la casilla de la clase abierta si se llega desde su botón o con ?clase-abierta=1
  useEffect(() => {
    const marcar = () => setForm((prev) => ({ ...prev, claseAbierta: true }))
    if (new URLSearchParams(window.location.search).has("clase-abierta")) marcar()
    window.addEventListener(EVENTO_CLASE_ABIERTA, marcar)
    return () => window.removeEventListener(EVENTO_CLASE_ABIERTA, marcar)
  }, [])

  const set = <K extends keyof typeof ESTADO_INICIAL>(campo: K, valor: (typeof ESTADO_INICIAL)[K]) =>
    setForm((prev) => ({ ...prev, [campo]: valor }))

  const toggleHorario = (valor: string) =>
    setForm((prev) => ({
      ...prev,
      horarios: prev.horarios.includes(valor)
        ? prev.horarios.filter((h) => h !== valor)
        : [...prev.horarios, valor],
    }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: null, message: "" })

    try {
      const res = await fetch("/api/preinscripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          horarioOtro: form.horarios.includes("otro") ? form.horarioOtro : "",
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || "Error en el envío")

      setStatus({
        type: "success",
        message: "¡Gracias! Ya estás en la lista de preinscripción. Te escribo cuando abran las inscripciones.",
      })
      setForm(ESTADO_INICIAL)
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err instanceof Error && err.message !== "Error en el envío"
            ? err.message
            : "Hubo un error al enviar la preinscripción. Inténtalo de nuevo.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="pre-nombre" className={labelClass}>
          Nombre
        </label>
        <input
          type="text"
          id="pre-nombre"
          value={form.nombre}
          onChange={(e) => set("nombre", e.target.value)}
          required
          minLength={2}
          maxLength={100}
          autoComplete="given-name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="pre-email" className={labelClass}>
          Correo electrónico
        </label>
        <input
          type="email"
          id="pre-email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          required
          maxLength={254}
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <GrupoRadio
        nombre="motivo"
        leyenda="¿Qué te trae por aquí?"
        opciones={MOTIVOS}
        valor={form.motivo}
        onChange={(v) => set("motivo", v)}
      />

      <GrupoRadio
        nombre="precio"
        leyenda="¿Qué precio te planteas?"
        opciones={PRECIOS}
        valor={form.precio}
        onChange={(v) => set("precio", v)}
      />

      <GrupoRadio
        nombre="experiencia"
        leyenda="¿Has estudiado astrología antes?"
        opciones={EXPERIENCIA}
        valor={form.experiencia}
        onChange={(v) => set("experiencia", v)}
      />

      <fieldset>
        <legend className={legendClass}>¿Te iría mejor otro horario? (opcional)</legend>
        <div className="space-y-2">
          {HORARIOS.map((opcion) => (
            <label key={opcion.valor} className={opcionClass}>
              <input
                type="checkbox"
                checked={form.horarios.includes(opcion.valor)}
                onChange={() => toggleHorario(opcion.valor)}
                className={checkClass}
              />
              {opcion.texto}
            </label>
          ))}
        </div>
        {form.horarios.includes("otro") && (
          <input
            type="text"
            aria-label="Otro horario"
            value={form.horarioOtro}
            onChange={(e) => set("horarioOtro", e.target.value)}
            maxLength={200}
            className={`${inputClass} mt-3`}
          />
        )}
        <p className="mt-2 text-sm text-muted-foreground">Me ayuda a planificar las próximas ediciones.</p>
      </fieldset>

      <div className="space-y-3 border-t border-neutral-light pt-6">
        <label className="flex items-start gap-2 text-body cursor-pointer">
          <input
            type="checkbox"
            checked={form.claseAbierta}
            onChange={(e) => set("claseAbierta", e.target.checked)}
            className={`${checkClass} mt-1`}
          />
          Quiero ir a la clase abierta del 12 de diciembre
        </label>

        <label className="flex items-start gap-2 text-body cursor-pointer">
          <input
            type="checkbox"
            checked={form.privacidad}
            onChange={(e) => set("privacidad", e.target.checked)}
            required
            className={`${checkClass} mt-1`}
          />
          <span>
            Acepto la{" "}
            <a href="/politica-privacidad" target="_blank" className="underline hover:text-primary">
              política de privacidad
            </a>
          </span>
        </label>

        <label className="flex items-start gap-2 text-body cursor-pointer">
          <input
            type="checkbox"
            checked={form.newsletter}
            onChange={(e) => set("newsletter", e.target.checked)}
            className={`${checkClass} mt-1`}
          />
          Quiero recibir la newsletter
        </label>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
        {loading ? "Enviando..." : "Preinscríbete"}
      </button>

      {status.type && (
        <div
          role="status"
          className={`p-4 rounded-md ${
            status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}
    </form>
  )
}
