"use client"

import { useEffect, useRef, useState } from "react"
import { GLIFOS_PLANETAS, GLIFOS_SIGNOS } from "./carta-glifos"

// Carta natal que se construye por capas: estructura y elementos → signos → planetas → casas.
// Pasado a componente desde carta_en_capas.html (versión aprobada), con los mismos datos, orden y tiempos.
// Se anima una sola vez, cuando la carta entra en pantalla. Con prefers-reduced-motion se muestra completa.
//
// Cada palabra sale grande en el centro de la carta, su capa aparece medio segundo después y luego:
// - en escritorio (lg) vuela hasta el título de su tarjeta en "De las partes al todo" ([data-capa-titulo])
//   y se funde con él;
// - en móvil y tableta, donde las tarjetas quedan lejos, se desvanece en el centro.
// En los dos casos, al terminar, su tarjeta se resalta un momento (data-resaltado en la tarjeta: título algo
// más grande, línea fina dorada debajo y borde violeta). Los títulos se ven siempre, nunca se ocultan.

// Datos de astro-seek: 16/01/2027, 10:30, Barcelona, Placidus (longitud eclíptica en grados: Aries 0 = 0°)
const ELEMENTO = ["fuego", "tierra", "aire", "agua"] as const // Aries, Tauro, Géminis, Cáncer...
const lon = (signo: number, g: number, m: number) => signo * 30 + g + m / 60
// En el orden de GLIFOS_PLANETAS
const PLANETAS = [
  lon(9, 26, 0), // Sol Capricornio
  lon(1, 2, 40), // Luna Tauro
  lon(10, 5, 17), // Mercurio Acuario
  lon(8, 9, 37), // Venus Sagitario
  lon(5, 10, 12), // Marte Virgo
  lon(4, 25, 10), // Júpiter Leo
  lon(0, 9, 6), // Saturno Aries
  lon(2, 1, 54), // Urano Géminis
  lon(0, 1, 57), // Neptuno Aries
  lon(10, 4, 49), // Plutón Acuario
]
const CUSPIDES_1_6 = [lon(11, 13, 1), lon(0, 28, 56), lon(1, 28, 41), lon(2, 21, 3), lon(3, 11, 56), lon(4, 6, 19)]
const CUSPIDES = [...CUSPIDES_1_6, ...CUSPIDES_1_6.map((c) => (c + 180) % 360)]
const ASC = CUSPIDES[0]
const MC = CUSPIDES[9]

const C = 400
const R_EXT = 370
const R_SIG = 318
const R_PLAN_TICK = 318
const R_INT = 150
// Margen algo mayor que el original (30) para que quepan ASC, DSC, MC y FC agrandados en móvil
const MARGEN = 48
const ANCHO_VIEWBOX = 800 + 2 * MARGEN

// Ascendente a la izquierda, sentido antihorario
const ang = (l: number) => ((180 + (l - ASC)) * Math.PI) / 180
// Redondeado a centésimas: servidor y navegador difieren en el último decimal de cos/sin y React lo da por error de hidratación
const redondear = (n: number) => Math.round(n * 100) / 100
const pt = (l: number, r: number): [number, number] => [
  redondear(C + r * Math.cos(ang(l))),
  redondear(C - r * Math.sin(ang(l))),
]

function arco(l1: number, l2: number, r1: number, r2: number) {
  const [a, b] = pt(l1, r2)
  const [c, d] = pt(l2, r2)
  const [e, f] = pt(l2, r1)
  const [g, h] = pt(l1, r1)
  return `M${a},${b} A${r2},${r2} 0 0 0 ${c},${d} L${e},${f} A${r1},${r1} 0 0 1 ${g},${h} Z`
}

// Colores del kit. Fondo y líneas cambian en modo oscuro (variables en el contenedor)
const LINEA = "var(--carta-linea)"
const FONDO = "var(--carta-bg)"
const DORADO = "#B09A7B"
const VIOLETA = "#4A3F74"
const TINTE = {
  fuego: "rgba(176,154,123,.45)",
  tierra: "rgba(74,63,116,.62)",
  aire: "rgba(170,156,184,.35)",
  agua: "#FFFFFF",
}
const LEYENDA = [
  { nombre: "Fuego", color: TINTE.fuego },
  { nombre: "Tierra", color: TINTE.tierra },
  { nombre: "Aire", color: TINTE.aire },
  { nombre: "Agua", color: TINTE.agua },
]

// Planetas muy juntos: se alternan en dos radios para que no se pisen
const RADIO_PLANETA = (() => {
  const orden = PLANETAS.map((l, i) => ({ l, i, r: 270 })).sort((a, b) => a.l - b.l)
  orden.forEach((p, n) => {
    const anterior = orden[n - 1]
    if (anterior && Math.abs(p.l - anterior.l) < 9) p.r = anterior.r === 270 ? 234 : 270
  })
  return orden.sort((a, b) => a.i - b.i).map((p) => p.r)
})()

// Orden de aparición: 0 círculo, 1 estructura y elementos, 2 signos, 3 planetas, 4 casas
const TIEMPOS = [0, 800, 3400, 6000, 8600] // ms en que sale cada palabra
const VUELO = 2400 // ms: aparece en el centro, se queda mientras sale su capa y aterriza en su sitio
const CAPA_EN = 500 // ms desde que sale la palabra hasta que aparece su capa
const FUNDIDO = 300 // ms en que la palabra, ya sobre el título, se funde con él (solo escritorio)
const RESALTE = 1200 // ms que la tarjeta queda resaltada
const PALABRAS = ["", "Estructura y elementos", "Signos", "Planetas", "Casas"]

function Glifo({ d, x, y, tam, fill }: { d: string; x: number; y: number; tam: number; fill: string }) {
  return <path d={d} transform={`translate(${x} ${y}) scale(${tam / 100})`} fill={fill} fillRule="evenodd" />
}

export default function CartaEnCapas() {
  const contenedor = useRef<HTMLDivElement>(null)
  const palabra = useRef<HTMLSpanElement>(null)
  const [capas, setCapas] = useState([false, false, false, false, false])
  const [leyenda, setLeyenda] = useState(false)
  // Ancho real / ancho del viewBox: los textos pequeños se agrandan para que se lean en móvil
  const [escala, setEscala] = useState(520 / ANCHO_VIEWBOX)

  useEffect(() => {
    const caja = contenedor.current
    if (!caja) return
    const ro = new ResizeObserver(([e]) => setEscala(e.contentRect.width / ANCHO_VIEWBOX))
    ro.observe(caja)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const caja = contenedor.current
    if (!caja) return
    const titulos = [...(caja.closest("section")?.querySelectorAll<HTMLElement>("[data-capa-titulo]") ?? [])]
    const titulo = (paso: number) => titulos.find((t) => t.dataset.capaTitulo === String(paso))
    const sinMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches
    const escritorio = matchMedia("(min-width: 1024px)").matches

    if (sinMovimiento) {
      setCapas([true, true, true, true, true])
      setLeyenda(true)
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    const animaciones: Animation[] = []
    const encender = (i: number) => setCapas((c) => c.map((v, n) => v || n === i))

    const volar = (paso: number) => {
      const span = palabra.current
      const destino = titulo(paso)
      if (!span) return
      span.textContent = PALABRAS[paso]
      // El tamaño en el centro imita al original (unos 34 px), sin pasarse del ancho de la carta en móvil
      const base = parseFloat(getComputedStyle(span).fontSize)
      const s = Math.min(34, caja.clientWidth * 0.085) / base
      const centro = `translate(0px, 0px) scale(${s})`
      const aterriza = escritorio && destino
      // En escritorio la animación dura VUELO + FUNDIDO: aterriza en el mismo momento que en el original
      // y después se funde con el título; los offsets del original se reescalan a esa duración
      const duracion = aterriza ? VUELO + FUNDIDO : VUELO
      const k = VUELO / duracion
      const fotogramas: Keyframe[] = [
        { transform: centro, opacity: 0, offset: 0 },
        { transform: centro, opacity: 1, offset: 0.17 * k },
        { transform: centro, opacity: 1, offset: 0.6 * k },
      ]
      if (aterriza) {
        const a = span.getBoundingClientRect()
        const b = destino.getBoundingClientRect()
        const dx = b.left + b.width / 2 - (a.left + a.width / 2)
        const dy = b.top + b.height / 2 - (a.top + a.height / 2)
        const sobreTitulo = `translate(${dx}px, ${dy}px) scale(1)`
        fotogramas.push({ transform: sobreTitulo, opacity: 1, offset: k }, { transform: sobreTitulo, opacity: 0, offset: 1 })
      } else {
        fotogramas.push({ transform: centro, opacity: 0, offset: 1 })
      }
      const vuelo = span.animate(fotogramas, { duration: duracion, easing: "ease-in-out" })
      animaciones.push(vuelo)
      vuelo.onfinish = () => (span.textContent = "")

      // La tarjeta se resalta cuando la palabra llega (escritorio) o se desvanece (móvil)
      const tarjeta = destino?.closest<HTMLElement>("li")
      if (!tarjeta) return
      timers.push(
        setTimeout(() => {
          tarjeta.dataset.resaltado = ""
          timers.push(setTimeout(() => delete tarjeta.dataset.resaltado, RESALTE))
        }, VUELO),
      )
    }

    const empezar = () => {
      TIEMPOS.forEach((t, i) =>
        timers.push(
          setTimeout(() => {
            if (i === 0) return encender(0) // el círculo base no lleva palabra
            volar(i)
            timers.push(setTimeout(() => encender(i), CAPA_EN))
            if (i === 1) timers.push(setTimeout(() => setLeyenda(true), VUELO))
          }, t),
        ),
      )
    }

    // Una sola vez, cuando la carta entra en pantalla
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        document.fonts.ready.then(empezar)
      },
      { threshold: 0.5 },
    )
    io.observe(caja)

    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
      animaciones.forEach((a) => a.cancel())
      titulos.forEach((t) => {
        const tarjeta = t.closest<HTMLElement>("li")
        if (tarjeta) delete tarjeta.dataset.resaltado
      })
    }
  }, [])

  // Tamaños en unidades del viewBox: los del original, o los mínimos que se leen al tamaño real
  const tam = {
    eje: Math.max(11, 11 / escala),
    casa: Math.max(23, 12.5 / escala),
    signo: Math.max(30, 12 / escala),
    planeta: Math.max(33, 19 / escala), // en móvil, glifo de unos 19 px reales
  }
  const capa = (i: number) => `transition-opacity [transition-duration:900ms] ease-in-out motion-reduce:transition-none ${capas[i] ? "opacity-100" : "opacity-0"}`
  const ejes: [number, string][] = [
    [ASC, "ASC"],
    [(ASC + 180) % 360, "DSC"],
    [MC, "MC"],
    [(MC + 180) % 360, "FC"],
  ]

  return (
    <div
      className="rounded-2xl border border-black/5 bg-[var(--carta-bg)] p-4 shadow-sm [--carta-bg:#F6F5EF] [--carta-linea:#4A3F74] dark:border-white/10 dark:[--carta-bg:hsl(var(--muted))] dark:[--carta-linea:#F6F5EF] md:p-6"
    >
      <div ref={contenedor} className="relative mx-auto w-full max-w-[520px]">
        <svg
          viewBox={`${-MARGEN} ${-MARGEN} ${ANCHO_VIEWBOX} ${ANCHO_VIEWBOX}`}
          role="img"
          aria-label="Carta natal construida por capas: estructura y elementos, signos, planetas y casas"
          className="block h-auto w-full"
        >
          {/* Capa 0: círculo */}
          <g className={capa(0)}>
            <circle cx={C} cy={C} r={R_EXT} fill="none" stroke={LINEA} strokeWidth={1.4} />
          </g>

          {/* Capa 1: estructura (ejes, cuadrantes) y elementos (anillo coloreado) */}
          <g className={capa(1)}>
            {Array.from({ length: 12 }, (_, s) => (
              <path key={s} d={arco(s * 30, s * 30 + 30, R_SIG, R_EXT)} fill={TINTE[ELEMENTO[s % 4]]} stroke="none" />
            ))}
            {/* Cuadrantes: sombreado suave alterno en el centro */}
            {[
              [ASC, CUSPIDES[3]],
              [CUSPIDES[6], MC],
            ].map(([a, b]) => (
              <path key={a} d={arco(a, b, 0.01, R_SIG)} fill="rgba(74,63,116,.05)" stroke="none" />
            ))}
            <circle cx={C} cy={C} r={R_SIG} fill="none" stroke={LINEA} strokeWidth={1} />
            {ejes.map(([l, nombre], i) => {
              const [x1, y1] = pt(l, R_EXT + 6)
              const [x2, y2] = pt(l + 180, R_EXT + 6)
              // Separación del anillo según el tamaño de la etiqueta (el original la ponía a R_EXT + 20 con tamaño 11)
              const medioAncho = (nombre.length * 0.68 * tam.eje) / 2
              const medioAlto = tam.eje * 0.4
              const a = ang(l)
              const [tx, ty] = pt(l, R_EXT + 9 + Math.abs(Math.cos(a)) * medioAncho + Math.abs(Math.sin(a)) * medioAlto)
              return (
                <g key={nombre}>
                  {i % 2 === 0 && <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={DORADO} strokeWidth={2} />}
                  <text
                    x={tx}
                    y={ty}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={LINEA}
                    fontSize={tam.eje}
                    className="font-lora font-medium tracking-[.12em]"
                  >
                    {nombre}
                  </text>
                </g>
              )
            })}
          </g>

          {/* Capa 2: signos */}
          <g className={capa(2)}>
            {Array.from({ length: 12 }, (_, s) => {
              const [x1, y1] = pt(s * 30, R_SIG)
              const [x2, y2] = pt(s * 30, R_EXT)
              const [tx, ty] = pt(s * 30 + 15, (R_SIG + R_EXT) / 2)
              const elemento = ELEMENTO[s % 4]
              // Sobre tierra (violeta) el glifo va en blanco; sobre agua (blanco), siempre en violeta
              const color = elemento === "tierra" ? "#FFFFFF" : elemento === "agua" ? VIOLETA : LINEA
              return (
                <g key={s}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={LINEA} strokeWidth={1} />
                  {[5, 10, 15, 20, 25].map((g) => {
                    const [a, b] = pt(s * 30 + g, R_SIG)
                    const [c, d] = pt(s * 30 + g, R_SIG + (g % 10 ? 5 : 9))
                    return <line key={g} x1={a} y1={b} x2={c} y2={d} stroke={LINEA} strokeWidth={0.6} opacity={0.6} />
                  })}
                  <Glifo d={GLIFOS_SIGNOS[s]} x={tx} y={ty} tam={tam.signo} fill={color} />
                </g>
              )
            })}
          </g>

          {/* Capa 4: casas (se dibuja antes que los planetas para que queden debajo) */}
          <g className={capa(4)}>
            <circle cx={C} cy={C} r={R_INT} fill="none" stroke={LINEA} strokeWidth={1} />
            {CUSPIDES.map((c, i) => {
              if (i % 3 === 0) return null // ejes ya dibujados
              const [x1, y1] = pt(c, R_INT)
              const [x2, y2] = pt(c, R_SIG)
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={LINEA} strokeWidth={0.9} opacity={0.75} />
            })}
            {CUSPIDES.map((c, i) => {
              const sig = CUSPIDES[(i + 1) % 12]
              const medio = c + (((sig - c) + 360) % 360) / 2
              const [tx, ty] = pt(medio, R_INT + 22)
              return (
                <text
                  key={i}
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={LINEA}
                  fontSize={tam.casa}
                  className="font-lato font-medium [font-variant-numeric:lining-nums]"
                >
                  {i + 1}
                </text>
              )
            })}
          </g>

          {/* Capa 3: planetas, uno tras otro */}
          <g className={capa(3)}>
            {PLANETAS.map((l, n) => {
              const [a, b] = pt(l, R_PLAN_TICK)
              const [c, d] = pt(l, R_PLAN_TICK - 10)
              const [tx, ty] = pt(l, RADIO_PLANETA[n])
              return (
                <g
                  key={n}
                  className="transition-[opacity,transform] duration-500 ease-in-out motion-reduce:transition-none"
                  style={{
                    transitionDelay: `${n * 0.15}s`,
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    opacity: capas[3] ? 1 : 0,
                    transform: capas[3] ? "scale(1)" : "scale(.6)",
                  }}
                >
                  <line x1={a} y1={b} x2={c} y2={d} stroke={DORADO} strokeWidth={2} />
                  <circle cx={tx} cy={ty} r={Math.max(21, tam.planeta * 0.55)} fill={FONDO} />
                  <Glifo d={GLIFOS_PLANETAS[n]} x={tx} y={ty} tam={tam.planeta} fill={LINEA} />
                </g>
              )
            })}
          </g>
        </svg>

        {/* Palabra de cada capa: sale grande en el centro de la carta */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          <span
            ref={palabra}
            className="inline-block whitespace-nowrap font-lato text-2xl font-semibold text-primary opacity-0 [text-shadow:0_0_4px_var(--carta-bg),0_0_8px_var(--carta-bg),0_0_12px_var(--carta-bg)] dark:text-accent"
          />
        </div>
      </div>

      <div
        className={`mt-3 flex flex-wrap justify-center gap-4 text-xs text-[var(--carta-linea)] transition-opacity [transition-duration:800ms] ease-in-out motion-reduce:transition-none ${
          leyenda ? "opacity-100" : "opacity-0"
        }`}
      >
        {LEYENDA.map(({ nombre, color }) => (
          <span key={nombre} className="inline-flex items-center gap-1.5">
            <i
              aria-hidden="true"
              className="inline-block h-3 w-3 rounded-[3px] border border-[rgba(74,63,116,.25)] dark:border-white/30"
              style={{ background: color }}
            />
            {nombre}
          </span>
        ))}
      </div>
    </div>
  )
}
