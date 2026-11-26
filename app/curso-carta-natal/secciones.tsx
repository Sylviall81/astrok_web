import type React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  Clock,
  Compass,
  HeartHandshake,
  History,
  PenLine,
  Sparkles,
  Ticket,
  Users,
  Video,
} from "lucide-react"
import { SCROLL_ANCLA, SeccionCielo } from "./marcadores"
import CartaEnCapas from "./carta-en-capas"
import ClaseAbiertaBoton from "./clase-abierta-boton"
import { EDICION } from "./edicion"
import PreinscripcionForm from "./preinscripcion-form"

export { NavegacionCurso } from "./navegacion-curso"

// Textos: contenido_landing.md (versión del 28/10/2026). No añadir textos que no estén allí.
// Excepción: las etiquetas pequeñas sobre los títulos, los rótulos de las cajas de Fechas y los
// "Bloque · Semanas" de Recorrido vienen del diseño de referencia (Stitch). Van marcados con
// "ETIQUETA NUEVA (aprobada)" y las aprobó Sylvia el 25/11/2026.

// Estilo común de la landing, tomado del diseño de referencia.
// Modo oscuro, con el criterio del resto de la web: secciones claras → fondo de la página,
// secciones crema → bg-muted (azul noche), tarjetas → neutral-dark con borde fino; títulos en lila (accent).
const ETIQUETA = "text-xs font-lora font-medium uppercase tracking-[0.2em] text-primary/70 dark:text-accent/80"
const TITULO = "font-lato font-semibold text-4xl md:text-5xl text-primary dark:text-accent leading-tight"
const TARJETA = "rounded-2xl border border-black/5 shadow-sm dark:border-white/10"
const FONDO_BLANCO = "bg-white dark:bg-transparent"
const FONDO_CREMA = "bg-crema dark:bg-muted"
const TARJETA_BLANCA = "bg-white dark:bg-neutral-dark"
const TARJETA_CREMA = "bg-crema dark:bg-muted"
const SUBTITULO = "font-lato font-semibold text-primary dark:text-accent"
const LINEA = "border-black/10 dark:border-white/10"

function Encabezado({
  etiqueta,
  titulo,
  subtitulo,
  centrado = false,
  linea = false,
  compacto = false,
  lateral,
}: {
  etiqueta?: string
  titulo: React.ReactNode
  subtitulo?: React.ReactNode
  centrado?: boolean
  linea?: boolean
  compacto?: boolean
  lateral?: React.ReactNode
}) {
  return (
    <div
      className={`${compacto ? "mb-5" : "mb-6"} ${linea ? `border-b ${LINEA} ${compacto ? "pb-4" : "pb-5"}` : ""} ${
        lateral ? "flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12" : ""
      } ${centrado ? "text-center" : ""}`}
    >
      <div>
        {etiqueta && <p className={`${ETIQUETA} ${compacto ? "mb-1.5" : "mb-3"}`}>{etiqueta}</p>}
        <h2 className={TITULO}>{titulo}</h2>
        {subtitulo && <p className="mt-4 text-body text-lg leading-relaxed">{subtitulo}</p>}
      </div>
      {lateral}
    </div>
  )
}

// Cuadrado con icono de línea, como en la referencia.
// TODO: sustituir por los iconos propios de forma geométrica de grano punteado.
function Icono({ icono: I }: { icono: React.ComponentType<{ className?: string }> }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-crema text-primary dark:bg-white/10 dark:text-accent"
    >
      <I className="h-5 w-5 stroke-[1.5]" />
    </span>
  )
}

/* 1. Cabecera: violeta liso + Sri Yantra dorado; la ficha rápida se monta sobre su borde inferior */
export function Cabecera() {
  const datos = [
    {
      icono: CalendarDays,
      texto: `${EDICION.encuentros} encuentros en directo`,
    },
    { icono: BookOpen, texto: "Práctica con tu propia carta natal" },
    { icono: History, texto: "Acceso a las clases grabadas" },
  ]

  return (
    <section className="relative overflow-hidden bg-primary pt-8 pb-28 md:pt-8 md:pb-24 lg:pt-6 lg:pb-20">
      {/* Sri Yantra en SVG (vectorizado de KALEIDOSCOPE_sriyantra_real_dorado.png), nítido a cualquier tamaño.
          Con margen: el dibujo llega al borde y, a sangre, se veía cortado */}
      <div
        aria-hidden="true"
        className="absolute inset-x-4 inset-y-8 bg-[url('/curso/sriyantra-dorado.svg')] bg-contain bg-center bg-no-repeat opacity-25"
      />
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* ETIQUETA NUEVA (aprobada) */}
          <p className="mb-3 md:mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 md:px-4 py-1 md:py-1.5 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.12em] md:tracking-[0.15em] text-white/90 backdrop-blur-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dorado" />
            Edición {EDICION.anio} · Plazas limitadas
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dorado" />
          </p>
          <h1 className="text-[2.6rem] md:text-5xl lg:text-[3.25rem] text-white mb-2 md:mb-2 leading-[1.05] md:leading-[1.08]">
            Tu carta natal:
            <span className="block not-italic font-semibold text-dorado">de las partes al todo</span>
          </h1>
          <p className="font-lato italic text-xl md:text-2xl text-white/90 mb-5 md:mb-5">
            Curso vivencial de iniciación a la astrología psicológica
          </p>
          <ul className="flex flex-wrap lg:flex-nowrap justify-center gap-2 md:gap-3 mb-6 md:mb-6">
            {datos.map(({ icono: I, texto }) => (
              <li
                key={texto}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/15 px-3 md:px-4 py-1.5 md:py-2 text-[0.8rem] md:text-sm text-white backdrop-blur-sm"
              >
                <I aria-hidden="true" className="h-4 w-4 shrink-0 stroke-[1.5] text-white/80" />
                {texto}
              </li>
            ))}
          </ul>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/90 leading-relaxed mb-5 md:mb-6">
            <strong className="mb-1 block text-xl font-semibold text-white md:text-2xl">
              Apertura de inscripciones en diciembre
            </strong>
            Apúntate a la lista, sin compromiso, y entérate de todos los detalles y de la oferta de lanzamiento.
          </p>
          <a
            href="#preinscripcion"
            className="inline-block bg-white text-primary rounded-lg font-lora font-semibold transition-all hover:bg-accent hover:text-white text-lg px-10 py-3.5 md:py-4 shadow-md"
          >
            Apúntame
          </a>
          <p className="mt-4 md:mt-5 text-sm text-white/75">
            ¿Quieres probar antes de decidir?{" "}
            <a
              href="#clase-abierta"
              className="whitespace-nowrap underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Ven a la clase <strong className="font-semibold">gratis</strong>
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

/* Ficha rápida: tarjeta blanca que se monta sobre el final de la cabecera */
export function FichaRapida() {
  const ficha = [
    { etiqueta: "Duración", dato: `${EDICION.semanas} sesiones` },
    { etiqueta: "Formato", dato: "Zoom (clases en directo)" },
    { etiqueta: "Grupo", dato: `${EDICION.maxPersonas} personas (máx.)` },
    { etiqueta: "Acompaña", dato: "Sylvia Llorente", enlace: "/sobre-mi" },
  ]

  return (
    <div className={FONDO_CREMA}>
      <div className="container-custom relative z-10 -mt-16 md:-mt-12 lg:-mt-8">
        <div
          className={`${TARJETA_BLANCA} rounded-2xl border border-black/5 p-5 shadow-lg dark:border-white/10 md:px-4 md:py-5`}
        >
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4 md:gap-0 md:divide-x md:divide-black/10 dark:md:divide-white/10">
            {ficha.map(({ etiqueta, dato, enlace }) => (
              <div key={etiqueta} className="md:px-6">
                <dt className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                  {etiqueta}
                </dt>
                <dd className={`${SUBTITULO} text-xl leading-snug`}>
                  {enlace ? (
                    <Link
                      href={enlace}
                      className="underline decoration-dorado/60 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                    >
                      {dato}
                    </Link>
                  ) : (
                    dato
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className={`mt-4 border-t ${LINEA} pt-3 text-center ${SUBTITULO} text-xl md:mt-4`}>
            No es necesario tener conocimientos previos de astrología
          </p>
        </div>
      </div>
    </div>
  )
}

/* 2. Para quién es: dos tarjetas, frase en tarjeta morada y bloque "Lo que puede pasar por el camino" */
export function ParaQuien() {
  const vias = [
    {
      etiqueta: "Disfrute y comunidad", // etiqueta revisada con Sylvia (18/11)
      icono: HeartHandshake,
      texto:
        "Para ti, que quieres acercarte al lenguaje astrológico con curiosidad, hablar de espiritualidad y misticismo sin justificarte, y compartir el camino con personas afines.",
    },
    {
      etiqueta: "Autoconocimiento e indagación", // etiqueta revisada con Sylvia (18/11)
      icono: Compass,
      texto:
        "Y para ti, que quieres actualizar tu idea de quién eres. Reencontrarte con todas tus partes y sus necesidades, darles un lugar. Mirarte a ti y a tu mapa natal sin juicio y con compasión.",
    },
  ]

  return (
    <section id="para-quien" className={`${FONDO_CREMA} py-8 md:py-10 ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        {/* ETIQUETA NUEVA (aprobada) */}
        <Encabezado etiqueta="Punto de partida" titulo="Para quién es" linea compacto />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vias.map(({ etiqueta, icono, texto }) => (
            <div key={etiqueta} className={`${TARJETA} ${TARJETA_BLANCA} p-5 md:p-6`}>
              <div className={`flex items-center justify-between gap-4 border-b ${LINEA} pb-3 mb-3`}>
                <p className={ETIQUETA.replace("font-medium", "font-bold")}>{etiqueta}</p>
                <Icono icono={icono} />
              </div>
              <p className="text-body text-lg leading-relaxed">{texto}</p>
            </div>
          ))}
        </div>

        {/* Tarjeta morada con el texto en crema */}
        <div className="relative my-4 overflow-hidden rounded-2xl bg-primary px-8 py-4 md:px-16 md:py-5 shadow-md">
          <div
            aria-hidden="true"
            className="absolute -right-10 -bottom-10 h-40 w-40 bg-[url('/curso/sriyantra-dorado.svg')] bg-contain bg-no-repeat opacity-15"
          />
          <blockquote className="relative mx-auto max-w-4xl text-center font-lato italic text-2xl md:text-3xl leading-snug text-crema">
            Quizás te identificas con ambas y está bien.
            <span className="block font-semibold text-dorado">Todas tus versiones son bienvenidas.</span>
          </blockquote>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-0 rounded-2xl bg-dorado/10 dark:bg-white/5 p-5 md:p-6">
          <div className={`md:border-r ${LINEA} md:pr-10 flex flex-col justify-center`}>
            {/* ETIQUETA NUEVA (aprobada) */}
            <p className={`${ETIQUETA} mb-2`}>Tu proceso, tu ritmo</p>
            <h3 className={`${SUBTITULO} text-2xl md:text-3xl`}><span className="block text-[1.625rem] font-bold italic md:text-[2rem]">Abrazamos</span>
              todo lo que surja
            </h3>
          </div>
          <div className="space-y-4 text-body text-lg leading-relaxed md:pl-10">
            <p>
              Mirar tu carta semana a semana te permitirá observarte con{" "}
              <strong className="font-bold italic">compasión y distancia</strong>. Con el tiempo, ese ejercicio de
              atención se convierte en vínculo: no estás mirando un mapa externo, sino reconociéndote en él.
            </p>
            <p>
              Si algo te conmueve o te interpela, te ofrezco un espacio seguro y respetuoso para mirarlo. Si no, también
              está bien: iremos a tu ritmo, sin urgencia y sin tener que buscar una versión mejorada de ti; sin pretender
              nada más que cultivar una relación más honesta y amable con lo que ya eres.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 3. De las partes al todo: en escritorio, texto y cuatro tarjetas en 2 × 2 a la izquierda y la carta animada
   a la derecha, a la misma altura. En móvil: texto, carta y tarjetas */
export function PartesAlTodo() {
  const partes = [
    {
      titulo: "Estructura y elementos",
      texto:
        "La base de tu carta: elementos, hemisferios y cuadrantes. Cómo se distribuyen, qué predomina, qué escasea y sus efectos.",
    },
    {
      titulo: "Signos",
      texto: "El vestuario con el que cada planeta sale a escena: su estilo, su tono, su manera de moverse.",
    },
    {
      titulo: "Planetas",
      texto: "Los personajes de tu carta. Cada uno tiene una función y unas necesidades.",
    },
    {
      titulo: "Casas",
      texto: "Los escenarios de tu vida, dónde ocurre cada cosa.",
    },
  ]

  return (
    <section className={`relative overflow-hidden py-10 md:py-12 ${FONDO_BLANCO}`}>
      <div
        aria-hidden="true"
        className="absolute -right-[130px] -bottom-[135px] h-[340px] w-[340px] bg-[url('/curso/sriyantra-dorado.svg')] bg-contain bg-no-repeat opacity-25"
      />
      <div className="container-custom relative">
        {/* La carta ocupa las dos filas de la derecha: arriba alinea con la etiqueta y abajo con las tarjetas */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
          <div className="lg:col-start-1 lg:row-start-1">
            {/* etiqueta revisada con Sylvia (18/11) */}
            <p className={`${ETIQUETA} mb-3`}>Avance progresivo</p>
            <h2 className={`${TITULO} mb-6`}>De las partes al todo</h2>
            <p className="text-body text-lg leading-relaxed">
              Una carta natal contiene muchísima información. Por eso vamos pieza a pieza, entendiendo cada una en
              profundidad y como parte del sistema. Al final, armamos el todo, comprendiendo la lógica de cada símbolo y
              sin memorizar nada.
            </p>
          </div>
          {/* En escritorio el marco se estira hasta abajo de las tarjetas y la carta queda centrada dentro */}
          <CartaEnCapas className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:flex-col lg:justify-center" />

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-start-1 lg:row-start-2">
            {partes.map(({ titulo, texto }, i) => (
              // La carta animada pone data-oculta hasta que sale su capa y data-resaltado un momento al salir
              <li
                key={titulo}
                className={`group ${TARJETA} ${TARJETA_CREMA} p-5 transition-[border-color,box-shadow,opacity,transform] duration-700 ease-in-out data-[oculta]:translate-y-3 data-[oculta]:opacity-0 data-[resaltado]:border-primary data-[resaltado]:shadow-md motion-reduce:transition-none dark:data-[resaltado]:border-accent`}
              >
                <h3 className={`${SUBTITULO} mb-2 flex items-center gap-3 text-xl`}>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-2 border-primary bg-white text-base font-semibold [font-variant-numeric:lining-nums] dark:border-accent dark:bg-transparent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* La carta animada busca la tarjeta por data-capa-titulo. Al resaltarla: algo más grande y línea dorada debajo */}
                  <span
                    data-capa-titulo={i + 1}
                    className="relative inline-block origin-left transition-transform duration-500 ease-in-out group-data-[resaltado]:scale-110 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-dorado after:transition-[width] after:duration-700 after:ease-in-out group-data-[resaltado]:after:w-3/5"
                  >
                    {titulo}
                  </span>
                </h3>
                <p className="text-body leading-relaxed lg:text-[0.95rem]">{texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* 4. Cómo se vive */
export function ComoSeVive() {
  const tarjetas = [
    {
      icono: Users,
      titulo: "Clases participativas",
      texto:
        "Partimos de ejemplos de tu vida para ver cómo se expresa en tu carta lo que aprendemos. La teoría se vuelve vivencia.",
    },
    {
      icono: Sparkles,
      titulo: "Visualizaciones guiadas",
      texto:
        "Meditaciones para conectar con la imagen de cada planeta y signo, y que los símbolos no se queden solo en la cabeza.",
    },
    {
      icono: PenLine,
      titulo: "Prácticas de integración",
      texto: "Ejercicios sencillos para llevar lo que ves en tu carta a tu día a día.",
    },
    {
      icono: BookOpen,
      titulo: "Herramientas y recursos",
      texto:
        "Guías de apoyo y bibliografía para acompañarte en tus primeros pasos.",
    },
  ]

  return (
    <section className={`py-10 md:py-12 ${FONDO_CREMA}`}>
      <div className="container-custom">
        {/* Escritorio: foto a la izquierda a toda la altura; título, frase y las cuatro tarjetas (en lista) a la derecha.
            Móvil: título y frase, foto y tarjetas, en ese orden */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-5">
          <div className="lg:col-start-2 lg:row-start-1">
            {/* etiqueta y título revisados con Sylvia (18/11) */}
            <p className={`${ETIQUETA} mb-3`}>Teoría y práctica</p>
            <h2 className={`${TITULO} mb-4`}>Aprendizaje vivencial</h2>
            <p className="font-lato italic text-2xl leading-snug text-primary/90 dark:text-accent/90">
              Todo lo que aprendemos lo miramos en <strong className="font-bold">tu propia carta natal</strong> desde el
              primer día, para entender no solo qué haces, sino desde dónde lo haces.
            </p>
          </div>

          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-sm lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:min-h-[26rem]">
            <Image
              src="/curso/foto-practica-carta.jpg"
              alt="Sylvia dibujando sobre una carta natal en una carpeta, junto a libros de astrología"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-2.5 lg:col-start-2 lg:row-start-2 lg:content-start">
            {tarjetas.map(({ icono, titulo, texto }) => (
              <div key={titulo} className={`${TARJETA} ${TARJETA_BLANCA} flex items-start gap-4 p-3.5 md:p-4`}>
                <Icono icono={icono} />
                <div>
                  <h3 className={`${SUBTITULO} mb-1 text-xl`}>{titulo}</h3>
                  <p className="text-body leading-relaxed lg:text-[0.95rem]">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Línea de fuentes: redactada con Sylvia (25/11) */}
        <p className="mx-auto mt-6 max-w-3xl text-center text-body leading-relaxed">
          Para preparar las guías y las lecturas me apoyo en diversas fuentes de la astrología psicológica y humanista,
          como <strong className="font-bold italic">Stephen Arroyo</strong>,{" "}
          <strong className="font-bold italic">Liz Greene</strong>,{" "}
          <strong className="font-bold italic">Howard Sasportas</strong> y{" "}
          <strong className="font-bold italic">Eugenio Carutti</strong>.
        </p>
      </div>
    </section>
  )
}

/* 5. Recorrido: filas a todo el ancho */
export function Recorrido() {
  // "Bloque" y "Semanas" vienen de la referencia: ETIQUETA NUEVA (aprobada)
  const bloques = [
    {
      semanas: "Sesiones 1 - 2",
      titulo: "Tu primer mapa",
      subtitulo: "Introducción al lenguaje simbólico",
      texto:
        <>Empiezas a reconocer qué estás viendo al abrir una carta natal: el lenguaje de los símbolos y las tres capas del mapa —planetas, signos y casas—. Ubicas <strong className="font-semibold">tu Sol, tu Luna y tu Ascendente</strong>, te familiarizas con el gráfico y observas cómo se distribuye tu energía entre hemisferios y cuadrantes.</>,
    },
    {
      semanas: "Sesiones 3 - 4",
      titulo: "Tu balance energético",
      subtitulo: "Polaridades, elementos y modalidades",
      texto:
        <>Descubres las dos polaridades —activa y receptiva—, los cuatro elementos —<strong className="font-semibold">fuego, tierra, aire y agua</strong>— y las tres modalidades: iniciar, sostener y adaptarse. Calculas el balance de tu carta y empiezas a reconocer tus formas más innatas de moverte en la vida.</>,
    },
    {
      semanas: "Sesiones 5 - 8",
      titulo: "La rueda zodiacal",
      subtitulo: "Doce signos, seis ejes polares",
      texto:
        <>Recorres la rueda zodiacal y sus <strong className="font-semibold">doce signos</strong>, de cuatro en cuatro, a través de su lógica evolutiva, con ejemplos y visualizaciones. Aprendes a reconocerlos más allá de tu signo solar y comprendes los seis ejes de opuestos complementarios: dos formas distintas de vivir una misma necesidad.</>,
    },
    {
      semanas: "Sesiones 9 - 12",
      titulo: "Tu carta en acción",
      subtitulo: "Planetas, casas y primeras lecturas",
      texto:
        <>Conoces a los planetas como personajes de tu carta y a las casas como los escenarios donde se expresan. Aprendes a integrar <strong className="font-semibold">planeta, signo y casa</strong> para hacer <strong className="font-semibold">tus primeras lecturas guiadas</strong> y empezar a leer tu propia carta con más confianza.</>,
    },
  ]

  // Escritorio: los cuatro bloques en una fila, de izquierda a derecha; tablet 2 × 2; móvil en columna
  const fila = ({ semanas, titulo, subtitulo, texto }: (typeof bloques)[number], i: number) => (
    <li key={titulo} className={`${TARJETA} ${TARJETA_CREMA} flex flex-col p-5`}>
      <div className={`mb-4 border-b ${LINEA} pb-3`}>
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-dorado">
          Bloque {String(i + 1).padStart(2, "0")}
        </p>
        <p className="font-lato text-xl text-primary/70 dark:text-accent/80">{semanas}</p>
      </div>
      <h3 className={`${SUBTITULO} text-2xl leading-tight`}>{titulo}</h3>
      {subtitulo && <p className="mt-1 font-lato text-lg italic leading-snug text-primary/80 dark:text-accent/80">{subtitulo}</p>}
      <p className="mt-3 text-body leading-relaxed lg:text-[0.95rem]">{texto}</p>
    </li>
  )

  return (
    <section id="recorrido" className={`py-10 md:py-12 ${FONDO_BLANCO} ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        {/* ETIQUETA NUEVA (aprobada): etiqueta y texto lateral */}
        <Encabezado
          etiqueta="Recorrido"
          titulo="Estructura del programa"
          linea
          lateral={
            <p className="text-sm font-medium text-muted-foreground">
              {EDICION.semanas} sesiones · 4 bloques progresivos
            </p>
          }
        />

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">{bloques.map((b, i) => fila(b, i))}</ol>

        {/* Nota de programa orientativo (redactada con Sylvia el 18/11) */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-body leading-relaxed">
          El programa es orientativo. Mantengo un orden lógico y unos lineamientos generales, pero algunos detalles pueden
          adaptarse al ritmo y a las necesidades del grupo. Antes de cualquier cambio, siempre lo comentaré con quienes
          participan.
        </p>
      </div>
    </section>
  )
}

/* 6. Fechas y formato: cajas en horizontal con icono */
export function Fechas() {
  // Rótulos de cada caja: ETIQUETA NUEVA (aprobada)
  const N = ({ children }: { children: React.ReactNode }) => <strong className="font-bold italic">{children}</strong>
  const anioFin = EDICION.fin.match(/ de (\d{4})$/)?.[1]
  const finSinAnio = EDICION.fin.replace(/ de \d{4}$/, "")
  const fechas = [
    {
      icono: CalendarDays,
      rotulo: "Calendario",
      texto: (
        <>
          Una sesión por semana, del{" "}
          <N>
            {EDICION.inicio} al {finSinAnio}
          </N>{" "}
          de {anioFin}
        </>
      ),
    },
    {
      icono: Clock,
      rotulo: "Horario",
      texto: (
        <>
          <N>{EDICION.horarioClase}</N>, hora de <N>{EDICION.ciudadHorario}</N> (no hay clase el {EDICION.sinClase})
        </>
      ),
    },
    {
      icono: Video,
      rotulo: "Dónde",
      texto: (
        <>
          <N>Online</N>, en directo por Zoom
        </>
      ),
    },
    {
      icono: Users,
      rotulo: "Grupo",
      texto: (
        <>
          <N>{EDICION.maxPersonas} personas</N> como máximo
        </>
      ),
    },
    {
      icono: History,
      rotulo: "Grabaciones",
      texto: (
        <>
          Disponibles hasta <N>{EDICION.grabacionesMeses} meses</N> después de la última clase
        </>
      ),
    },
  ]

  return (
    <section className={`py-10 md:py-12 ${FONDO_CREMA}`}>
      <div className="container-custom">
        {/* ETIQUETA NUEVA (aprobada) */}
        <Encabezado etiqueta="Detalles prácticos" titulo="Cuándo y cómo" centrado />
        <ul className={`${TARJETA} ${TARJETA_BLANCA} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 p-4 md:p-6`}>
          {fechas.map(({ icono, rotulo, texto }) => (
            <li
              key={rotulo}
              className={`flex gap-4 border-b ${LINEA} px-2 py-5 last:border-b-0 sm:col-span-1 sm:px-4 sm:last:col-span-2 lg:grid lg:grid-cols-[auto_1fr] lg:items-center lg:gap-x-3 lg:gap-y-3 lg:border-b-0 lg:border-l lg:py-2 lg:first:border-l-0 lg:px-6 lg:last:col-span-1`}
            >
              <Icono icono={icono} />
              <div className="lg:contents">
                <p className="mb-1 font-semibold text-primary dark:text-accent lg:col-start-2 lg:row-start-1 lg:mb-0">
                  {rotulo}
                </p>
                <p className="text-body text-sm leading-relaxed lg:col-span-2 lg:row-start-2">{texto}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 7. Inscripciones: cielo estrellado suave, sin precios hasta que se abran (van primero a la lista) */
export function Precio() {
  return (
    <SeccionCielo id="precio" className={SCROLL_ANCLA}>
      <div className="text-center">
        <p className={`${ETIQUETA.replace("font-medium", "font-bold")} !text-dorado mb-3`}>
          Edición {EDICION.anio} · {EDICION.maxPersonas} plazas
        </p>
        <h2 className={`${TITULO} !text-white mb-4`}>
          <span className="block text-2xl md:text-3xl">Abro inscripciones en</span>
          <span className="block text-5xl font-bold italic text-dorado md:text-7xl lg:text-6xl">diciembre</span>
        </h2>
        <p className="font-lato italic text-2xl text-white/90 max-w-2xl mx-auto mb-8">
          <span className="block">
            <strong className="font-bold">Apúntate a la lista</strong>, sin compromiso,
          </span>
          y recibe antes que nadie el enlace de inscripción con la
          <span className="block">
            <strong className="font-bold">oferta de lanzamiento</strong>.
          </span>
        </p>
        <a
          href="#preinscripcion"
          className="inline-block bg-white text-primary rounded-lg font-lora font-semibold transition-all hover:bg-accent hover:text-white text-lg px-10 py-4"
        >
          Apúntame
        </a>
      </div>
    </SeccionCielo>
  )
}

/* 8. Clase abierta: tarjeta horizontal con el botón a la derecha */
export function ClaseAbierta() {
  // "Tres maneras de ser tú: Sol, Luna y Ascendente" → título y subtítulo, como en los bloques del programa
  const [nombreClase, subtituloClase] = EDICION.claseAbierta.nombre.split(": ")
  return (
    <section id="clase-abierta" className={`py-10 md:py-12 ${FONDO_CREMA} ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        {/* Franja corta: qué es, cuándo y dónde y el botón arriba; un solo párrafo debajo */}
        <div className={`${TARJETA} ${TARJETA_BLANCA} grid gap-6 p-6 md:grid-cols-[1fr_auto] md:gap-x-10 md:p-8`}>
          <div>
            {/* ETIQUETA NUEVA (aprobada) */}
            {/* Si en móvil ocupa dos líneas, la pastilla pasa a esquinas redondeadas para envolverlas bien */}
            <p
              className={`${ETIQUETA} mb-3 inline-flex max-w-full items-center gap-2 rounded-xl bg-crema px-3 py-1.5 leading-snug dark:bg-white/10 md:rounded-full`}
            >
              <Ticket aria-hidden="true" className="h-3.5 w-3.5 shrink-0 stroke-[1.5]" />
              ¿Quieres conocerme antes?
            </p>
            <h2 className={`${TITULO} mb-2`}>Clase abierta</h2>
            <h3 className={`${SUBTITULO} text-2xl font-bold md:text-3xl`}>{nombreClase}</h3>
            {subtituloClase && (
              <p className="mb-2 font-lato text-2xl font-bold italic text-dorado md:text-3xl">{subtituloClase}</p>
            )}
            <p className="font-medium text-primary dark:text-accent">
              Online · {EDICION.claseAbierta.dia} {EDICION.claseAbierta.fecha} · {EDICION.claseAbierta.hora} h
              (Barcelona)
            </p>
          </div>

          <div className="order-last w-full shrink-0 md:order-none md:flex md:w-auto md:items-start">
            <ClaseAbiertaBoton />
          </div>

          {/* Descripción decidida el 17/11/2026 (contenido_landing.md, sección 8); resumida con Sylvia el 25/11 */}
          <p className={`border-t ${LINEA} pt-5 text-body text-lg leading-relaxed md:col-span-2`}>
            Hay una parte de ti que se muestra primero, otra que busca expresarse y otra que necesita sentirse segura.
            Exploraremos Sol, Luna y Ascendente desde la astrología psicológica, tendremos espacio para conocernos,
            resolver dudas sobre el curso y descubrir si este camino es para ti.
          </p>

          <p className="font-lato text-2xl font-bold italic text-primary dark:text-accent md:col-span-2">
            Apúntate: es gratis y sin compromiso.
          </p>
        </div>
      </div>
    </section>
  )
}

/* 9. Quién soy: dentro de una tarjeta con fondo suave */
export function QuienSoy() {
  return (
    <section className={`py-10 md:py-12 ${FONDO_BLANCO}`}>
      <div className="container-custom">
        <div
          className={`${TARJETA} ${TARJETA_CREMA} p-6 md:p-10 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-center`}
        >
          <div className="relative h-[400px] md:h-[360px] lg:h-[420px] rounded-xl overflow-hidden shadow-md">
            <Image
              src="/curso/foto-quien-soy-v3.jpg"
              alt="Sylvia Llorente"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[center_30%] lg:object-center"
            />
          </div>
          <div>
            {/* etiqueta revisada con Sylvia (18/11) */}
            <p className={`${ETIQUETA} mb-3`}>Imparte y acompaña</p>
            <h2 className={`${TITULO} mb-5`}>Quién soy</h2>
            <div aria-hidden="true" className="w-12 h-px bg-dorado mb-6" />
            <p className="text-body text-lg leading-relaxed mb-6">
              Soy Sylvia, <strong className="font-bold italic">mujer</strong>, <strong className="font-bold italic">migrante</strong> y{" "}
              <strong className="font-bold italic">neurodivergente</strong>. Llevo más de diez años acompañando procesos personales con
              astrología psicológica y humanista.
            </p>
            <p className="text-body text-lg leading-relaxed mb-4">
              Mi trayectoria en investigación me dio rigor; la astrología me enseñó a escuchar y acompañar. Trabajo desde
              la conciencia social, la perspectiva de género y un enfoque informado en trauma, en un{" "}
              <strong className="font-bold italic">espacio seguro, inclusivo y sin imposiciones</strong>.
            </p>
            <p className="mb-6">
              <Link
                href="/sobre-mi"
                className="font-medium text-primary underline decoration-dorado/70 underline-offset-4 transition-colors hover:decoration-primary dark:text-accent"
              >
                Más sobre mi formación y mi trayectoria →
              </Link>
            </p>
            <p className="text-body leading-relaxed">
              No soy psicóloga clínica y la astrología no sustituye un diagnóstico.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 10. Lo que dicen de mi trabajo */
export function Testimonios() {
  const N = ({ children }: { children: React.ReactNode }) => <strong className="font-bold italic">{children}</strong>
  // Ordenados de más a menos fuertes. Las frases en negrita y cursiva son las que más pesan; si sobran, se quitan.
  // Los recortes van marcados con […] para no alterar lo que dijeron.
  const testimonios = [
    {
      texto: (
        <>
          Me ponía delante cosas que, de alguna manera, estaba evitando pero que sabía que estaban ahí. La sesión
          contigo me dio <N>fuerza y claridad</N>.
        </>
      ),
      origen: "Miriam C. · Sesión online",
    },
    {
      texto: (
        <>
          Ante todo muchas gracias por la sesión, <N>tu manera de explicar tan agradable y tu comprensión</N>. Me ha
          gustado mucho la sesión y me he sentido muy cómoda. Es increíble todo lo que puedes ver en la carta sobre mí
          y lo que he vivido...
        </>
      ),
      origen: "Ingrid D. · Carta natal presencial",
    },
    {
      texto: (
        <>
          He descubierto tu blog recientemente y me ha inspirado mucha confianza. […]{" "}
          <N>Rigor, empatía y una intuición genuina</N> es la combinación que ofrece. La lectura me ha dado
          herramientas para continuar con la auto-exploración y la integración de partes.
        </>
      ),
      origen: "Gloria D. · Carta natal online",
    },
    {
      texto: (
        <>
          Es una maravilla todo el trabajo que te tomas en contármelo detalladamente y con{" "}
          <N>palabras tan acertadas</N>. […] Me lo he leído todo y subrayado algunas cosas que me resuenan en el
          momento actual.
        </>
      ),
      origen: "Amaia P. · Sesión integral online",
    },
    {
      texto: (
        <>
          Me hice una lectura de vínculos con Sylvia, y me ha encantado <N>todo su trabajo y entrega</N>. Mucho
          material para conocerme y seguir creciendo.
        </>
      ),
      origen: "Jesús A. · Sinastría online",
    },
    {
      texto: (
        <>
          Gracias a ti por inspirarme y por <N>darme herramientas evolutivas</N> para este nuevo año solar que me
          espera. […] Gracias, preciosa, <N>se nota que te apasiona tu trabajo</N>.
        </>
      ),
      origen: "Alejandra S. · Revolución solar presencial",
    },
  ]

  return (
    <section className={`py-10 md:py-12 ${FONDO_CREMA}`}>
      <div className="container-custom">
        <Encabezado etiqueta="Testimonios" titulo="Lo que dicen mis consultantes" linea />
        {/* Una tarjeta blanca a todo el ancho con las seis filas separadas por líneas finas; círculo lila con la inicial y aro dorado */}
        <ul className={`${TARJETA} ${TARJETA_BLANCA} divide-y divide-black/10 px-6 py-1 dark:divide-white/10 md:px-10`}>
          {testimonios.map(({ texto, origen }) => (
            <li key={origen} className="flex gap-4 py-4 md:gap-5">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/25 font-lato text-xl font-semibold text-primary ring-1 ring-dorado/70 dark:bg-white/10 dark:text-accent"
              >
                {origen.charAt(0)}
              </span>
              <figure>
                <blockquote className="text-body text-[0.95rem] italic leading-relaxed">“{texto}”</blockquote>
                <figcaption className="mt-1 text-sm font-medium text-muted-foreground">{origen}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 11. Preguntas frecuentes: acordeón en tarjetas */
export function PreguntasFrecuentes() {
  // Texto revisado con Sylvia el 25/11, ordenado de más a menos decisivo para quien duda.
  // La respuesta de devolución remite al título exacto de la pregunta del mínimo de personas: si se cambia uno, cambiar el otro.
  const preguntas: { pregunta: string; respuesta: React.ReactNode }[] = [
    {
      pregunta: "¿Necesito saber algo de astrología?",
      respuesta: "No. Empezamos desde cero. Solo necesitas tu fecha, hora y lugar de nacimiento.",
    },
    {
      pregunta: "¿Y si no sé mi hora de nacimiento?",
      respuesta:
        "Sin hora no podemos conocer con certeza tu Ascendente ni tus casas, que trabajaremos durante el curso. Antes de inscribirte, intenta conseguirla: en España suele aparecer en el certificado literal de nacimiento y a veces la recuerda tu familia. Si no la encuentras, escríbeme y lo vemos.",
    },
    {
      pregunta: "¿Cuánto cuesta?",
      respuesta: (
        <>
          El precio y la oferta de lanzamiento se comunicarán al abrir las inscripciones, en diciembre. Quienes estén
          en la lista recibirán primero el enlace de inscripción.{" "}
          <a
            href="#preinscripcion"
            className="whitespace-nowrap font-medium text-primary underline decoration-dorado/70 underline-offset-4 transition-colors hover:decoration-primary dark:text-accent"
          >
            Apúntame a la lista →
          </a>
        </>
      ),
    },
    {
      pregunta: "¿Dejar mis datos me reserva una plaza?",
      respuesta:
        "No. La plaza se reserva al inscribirte. Dejar tus datos sirve para que te avise cuando abran las inscripciones.",
    },
    {
      pregunta: "¿Puedo pagar a plazos?",
      respuesta: "Sí, en dos pagos iguales y sin recargo.",
    },
    {
      pregunta: "¿Y si no puedo asistir a una clase?",
      respuesta: `Todas las clases se graban. Las subiré durante la semana siguiente y podrás verlas hasta ${EDICION.grabacionesMeses} meses después de la última sesión.`,
    },
    {
      pregunta: "¿Qué pasa si no llegamos al mínimo de personas?",
      respuesta: `Para que el grupo funcione, necesitamos al menos ${EDICION.minPersonas} personas. Las inscripciones cierran el ${EDICION.cierreInscripcion} y el ${EDICION.confirmacionMinimo} te confirmaré si el curso puede comenzar. Si no, empezará el ${EDICION.inicioAlternativo}. Si esa fecha no te encaja, o si tampoco llegamos entonces, podrás elegir entre recuperar el importe íntegro o guardar tu plaza para la siguiente edición.`,
    },
    {
      pregunta: "¿Puedo pedir la devolución?",
      respuesta:
        "Tienes 14 días naturales desde la inscripción para desistir y recuperar tu dinero, sin necesidad de dar explicaciones. Si las clases ya han comenzado, descontaré la parte proporcional de las sesiones recibidas. Una vez transcurrido ese plazo, no se aceptan devoluciones, salvo que yo no pueda impartir el curso o cambie la fecha y esta no te encaje (lo explico en «¿Qué pasa si no llegamos al mínimo de personas?»).",
    },
    {
      pregunta: "¿Puedo hacerlo desde fuera de España?",
      respuesta: "Sí. El curso es online y el horario es el de Barcelona; comprueba la hora en tu zona.",
    },
    {
      pregunta: "¿Para qué usas mis datos de nacimiento?",
      respuesta:
        "Para calcular tu carta —que recibirás en PDF— y preparar los ejercicios de clase. No los uso para nada más ni los comparto con nadie.",
    },
  ]

  return (
    <section id="preguntas" className={`py-10 md:py-12 ${FONDO_BLANCO} ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        <div>
          {/* ETIQUETA NUEVA (aprobada) */}
          <Encabezado etiqueta="Claridad y dudas" titulo="Preguntas frecuentes" linea />
          <div className="space-y-2.5">
            {preguntas.map(({ pregunta, respuesta }) => (
              <details
                key={pregunta}
                className={`group rounded-xl border border-black/5 dark:border-white/10 ${TARJETA_CREMA}`}
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 font-lato text-xl font-semibold text-primary dark:text-accent [&::-webkit-details-marker]:hidden">
                  {pregunta}
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 stroke-[1.5] text-primary/60 dark:text-accent/80 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-5 pb-5 text-body leading-relaxed">{respuesta}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* 12. Formulario de preinscripción: tarjeta blanca sobre fondo crema */
export function Preinscripcion() {
  return (
    <section id="preinscripcion" className={`py-10 md:py-12 ${FONDO_CREMA} ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        <div className={`${TARJETA} ${TARJETA_BLANCA} max-w-3xl mx-auto p-6 md:p-10`}>
          <Encabezado
            titulo="¿Te interesa? Cuéntame"
            subtitulo="Déjame tus datos y estarás entre quienes primero reciban la oferta de lanzamiento y el enlace de inscripción."
            centrado
          />
          <PreinscripcionForm />
          <p className="mt-6 text-center lg:text-sm text-muted-foreground">Dejar tus datos no te compromete a nada y solo te enviaré información sobre el curso y lo que marques en las casillas.</p>
        </div>
      </div>
    </section>
  )
}
