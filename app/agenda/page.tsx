"use client"

import { useEffect } from "react"

export default function BookingPage() {
  useEffect(() => {
    ;(function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) { a.q.push(ar) }
      let d = C.document
      C.Cal = C.Cal || function () {
        let cal = C.Cal
        let ar = arguments
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement("script")).src = A
          cal.loaded = true
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments) }
          const namespace = ar[1]
          api.q = api.q || []
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api
            p(cal.ns[namespace], ar)
            return
          }
          p(cal, ar)
          return
        }
        p(cal, ar)
      }
    })(window, "https://app.cal.com/embed/embed.js", "init")

    const Cal = (window as any).Cal
    Cal("init", "kaleidoscope", { origin: "https://cal.com" })
    Cal.ns.kaleidoscope("inline", {
      elementOrSelector: "#cal-embed",
      config: { layout: "month_view" },
      calLink: "kaleidoscope-astrologia-psicologica-tj7xzl",
    })
    Cal.ns.kaleidoscope("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    })
  }, [])

  const infoItems = [
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "Para la carta natal y otros análisis astrológicos precisos, necesitarás proporcionar tu fecha, hora y lugar exactos de nacimiento.",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      text: "Recibirás un correo de confirmación con los detalles de tu reserva y las instrucciones para la sesión.",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 10l4.553-2.069A1 1 0 0121 8.867V15a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
      ),
      text: "Las sesiones se realizan por videollamada (Zoom) o presencialmente en Barcelona, según tu preferencia.",
    },
    {
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      text: "Si necesitas cancelar o reprogramar tu cita, por favor hazlo con al menos 24 horas de antelación.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-6">Agenda tu sesión</h1>
        </div>

        <div className="mb-10 border-l-4 border-primary bg-neutral-light p-6 rounded-r-lg">
          <h2 className="text-lg font-lato font-semibold text-primary mb-4">Antes de reservar</h2>
          <ul className="space-y-3">
            {infoItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary mt-0.5 flex-shrink-0">{item.icon}</span>
                <span className="text-secondary text-sm leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div id="cal-embed" style={{ width: "100%", height: "800px", overflow: "scroll" }} />
        </div>
      </div>
    </section>
  )
}
