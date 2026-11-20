import type React from "react"
import Image from "next/image"
import {
  BookOpen,
  Brain,
  CalendarDays,
  ChevronDown,
  Clock,
  Compass,
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
// "ETIQUETA NUEVA (por revisar)" y están pendientes de aprobar.

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
  lateral,
}: {
  etiqueta?: string
  titulo: React.ReactNode
  subtitulo?: React.ReactNode
  centrado?: boolean
  linea?: boolean
  lateral?: React.ReactNode
}) {
  return (
    <div
      className={`mb-10 md:mb-12 ${linea ? `border-b ${LINEA} pb-8` : ""} ${
        lateral ? "flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12" : ""
      } ${centrado ? "text-center" : ""}`}
    >
      <div>
        {etiqueta && <p className={`${ETIQUETA} mb-3`}>{etiqueta}</p>}
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
      <I className="h-5 w-5" />
    </span>
  )
}

/* 1. Cabecera: violeta liso + Sri Yantra dorado; la ficha rápida se monta sobre su borde inferior */
export function Cabecera() {
  const datos = [
    { icono: CalendarDays, texto: `${EDICION.encuentros} encuentros en directo` },
    { icono: BookOpen, texto: "Práctica con tu propia carta natal" },
    { icono: History, texto: "Acceso a las clases grabadas" },
  ]

  return (
    <section className="relative overflow-hidden bg-primary pt-8 pb-28 md:pt-24 md:pb-44">
      {/* Sri Yantra en SVG (vectorizado de KALEIDOSCOPE_sriyantra_real_dorado.png), nítido a cualquier tamaño.
          Con margen: el dibujo llega al borde y, a sangre, se veía cortado */}
      <div
        aria-hidden="true"
        className="absolute inset-x-4 inset-y-8 bg-[url('/curso/sriyantra-dorado.svg')] bg-contain bg-center bg-no-repeat opacity-25"
      />
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* ETIQUETA NUEVA (por revisar) */}
          <p className="mb-5 md:mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 md:px-4 py-1 md:py-1.5 text-[0.65rem] md:text-xs font-semibold uppercase tracking-[0.12em] md:tracking-[0.15em] text-white/90 backdrop-blur-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dorado" />
            Edición {EDICION.anio} · Plazas reducidas
          </p>
          <h1 className="text-[2.6rem] md:text-6xl lg:text-[4.25rem] text-white mb-4 md:mb-6 leading-[1.1] md:leading-tight">
            Tu carta natal:
            <span className="block not-italic font-semibold text-dorado">de las partes al todo</span>
          </h1>
          <p className="font-lato italic text-xl md:text-3xl text-white/90 mb-6 md:mb-10">
            Curso vivencial de iniciación a la astrología psicológica
          </p>
          <ul className="flex flex-wrap lg:flex-nowrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
            {datos.map(({ icono: I, texto }) => (
              <li
                key={texto}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/15 px-3 md:px-4 py-1.5 md:py-2 text-[0.8rem] md:text-sm text-white backdrop-blur-sm"
              >
                <I aria-hidden="true" className="h-4 w-4 shrink-0 text-white/80" />
                {texto}
              </li>
            ))}
          </ul>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/90 leading-relaxed mb-7 md:mb-10">
            Abrimos inscripciones en diciembre. Apúntate a la lista y recibirás antes que nadie la información del
            curso y la oferta de lanzamiento. Sin compromiso.
          </p>
          <a
            href="#preinscripcion"
            className="inline-block bg-white text-primary rounded-lg font-lora font-semibold transition-all hover:bg-accent hover:text-white text-lg px-10 py-3.5 md:py-4 shadow-md"
          >
            Apúntame
          </a>
          <p className="mt-6 md:mt-8 text-sm text-white/75">
            ¿Quieres ver antes cómo trabajo?{" "}
            <a
              href="#clase-abierta"
              className="underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              Ven a la clase gratuita
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
    { etiqueta: "Formato", dato: "En directo por Zoom" },
    { etiqueta: "Grupo", dato: `${EDICION.maxPersonas} personas como máximo` },
    { etiqueta: "Requisitos", dato: "Sin conocimientos previos" },
    { etiqueta: "Acompaña", dato: "Sylvia Llorente" },
  ]

  return (
    <div className={FONDO_CREMA}>
      <div className="container-custom relative z-10 -mt-20 md:-mt-24">
        <dl
          className={`${TARJETA_BLANCA} grid grid-cols-2 gap-x-6 gap-y-6 rounded-2xl border border-black/5 p-6 shadow-lg dark:border-white/10 md:grid-cols-5 md:gap-0 md:divide-x md:divide-black/10 dark:md:divide-white/10 md:px-4 md:py-8`}
        >
          {ficha.map(({ etiqueta, dato }) => (
            <div
              key={etiqueta}
              className={`last:col-span-2 last:border-t ${LINEA} last:pt-6 md:last:col-span-1 md:last:border-t-0 md:last:pt-0 md:px-6`}
            >
              <dt className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-1.5">{etiqueta}</dt>
              <dd className={`${SUBTITULO} text-xl leading-snug`}>{dato}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

/* 2. Para quién es: dos tarjetas, frase en tarjeta morada y bloque "Lo que puede pasar por el camino" */
export function ParaQuien() {
  const vias = [
    {
      etiqueta: "Disfrute y comunidad", // etiqueta revisada con Sylvia (18/11)
      icono: Compass,
      texto:
        "Para ti, si quieres acercarte al lenguaje simbólico con curiosidad y tener un espacio donde hablar de espiritualidad, misticismo o trascendencia sin tener que justificarte. Para encontrarte con personas que te entienden y comparten tus inquietudes. Disfrutar aprendiendo es más que suficiente.",
    },
    {
      etiqueta: "Autoconocimiento e indagación", // etiqueta revisada con Sylvia (18/11)
      icono: Brain,
      texto:
        "Y para ti, si quieres actualizar tu idea de quién eres. Si te interesa (re)conocer todas tus partes, escuchar qué necesitan y darles un lugar, y mirarte a ti y a tu mapa natal con curiosidad y compasión, sin juicio.",
    },
  ]

  return (
    <section id="para-quien" className={`${FONDO_CREMA} py-16 md:py-24 ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        {/* ETIQUETA NUEVA (por revisar) */}
        <Encabezado etiqueta="El punto de partida" titulo="Para quién es" linea />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vias.map(({ etiqueta, icono, texto }) => (
            <div key={etiqueta} className={`${TARJETA} ${TARJETA_BLANCA} p-8 md:p-12`}>
              <div className={`flex items-center justify-between gap-4 border-b ${LINEA} pb-6 mb-6`}>
                <p className={ETIQUETA}>{etiqueta}</p>
                <Icono icono={icono} />
              </div>
              <p className="text-body text-lg leading-relaxed">{texto}</p>
            </div>
          ))}
        </div>

        {/* Tarjeta morada con el texto en crema */}
        <div className="relative my-6 overflow-hidden rounded-2xl bg-primary px-8 py-12 md:px-16 md:py-16 shadow-md">
          <div
            aria-hidden="true"
            className="absolute -right-16 -bottom-16 h-64 w-64 bg-[url('/curso/sriyantra-dorado.svg')] bg-contain bg-no-repeat opacity-15"
          />
          <blockquote className="relative mx-auto max-w-4xl text-center font-lato italic text-2xl md:text-3xl leading-snug text-crema">
            A lo mejor te has visto en las dos. Todas tus
            versiones son bienvenidas. No hace falta saber nada de astrología antes de empezar.
          </blockquote>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-0 rounded-2xl bg-dorado/10 dark:bg-white/5 p-8 md:p-12">
          <div className={`md:border-r ${LINEA} md:pr-10 flex flex-col justify-center`}>
            {/* ETIQUETA NUEVA (por revisar) */}
            <p className={`${ETIQUETA} mb-2`}>Tu proceso, tu ritmo</p>
            <h3 className={`${SUBTITULO} text-2xl md:text-3xl`}>Todo lo que surja es bienvenido</h3>
          </div>
          <p className="text-body text-lg leading-relaxed md:pl-10">
            Mirar tu carta semana a semana te permitirá 
            observarte con compasión y desapego. Comprender el origen y función de muchos hábitos y conductas, en qué contextos son funcionales 
            y cuándo no. Decidir qué hacer con ellos. Y, a veces, también pueden aparecer cambios de narrativaa mi . Si pasa, te ofrezco un espacio respetuoso para mirarlo. Si no pasa, también está bien: vamos a tu
            ritmo y no hay nada que conseguir.
          </p>
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
        "La base de tu carta, sobre la que se apoya todo lo demás. Miraremos si algún elemento abunda o escasea, cómo se reparten los planetas entre hemisferios y cuadrantes y sus implicaciones.",
    },
    { titulo: "Signos", texto: "El vestuario con el que cada planeta sale a escena: su estilo, su tono, su manera de moverse." },
    { titulo: "Planetas", texto: "Los personajes de tu carta. Cada uno tiene una función y unas necesidades." },
    { titulo: "Casas", texto: "Los escenarios de tu vida, dónde ocurre cada cosa." },
  ]

  return (
    <section className={`relative overflow-hidden py-16 md:py-24 ${FONDO_BLANCO}`}>
      <div
        aria-hidden="true"
        className="absolute -right-10 bottom-6 h-40 w-40 bg-sri-yantra-pattern bg-contain bg-no-repeat opacity-10"
      />
      <div className="container-custom relative">
        {/* La carta ocupa las dos filas de la derecha: arriba alinea con la etiqueta y abajo con las tarjetas */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
          <div className="lg:col-start-1 lg:row-start-1">
            {/* etiqueta revisada con Sylvia (18/11) */}
            <p className={`${ETIQUETA} mb-3`}>Avance progresivo</p>
            <h2 className={`${TITULO} mb-6`}>De las partes al todo</h2>
            <p className="text-body text-lg leading-relaxed">
              Una carta natal contiene muchísima información. Por eso vamos pieza a pieza, entendiendo cada una en profundidad
              y como parte del sistema. Al final, armamos el todo, comprendiendo la lógica de cada símbolo y sin memorizar nada.
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
        "Partimos de ejemplos de tu vida para ver cómo se expresa en tu carta lo que vamos aprendiendo. La teoría se vuelve vivencia.",
    },
    {
      icono: Sparkles,
      titulo: "Visualizaciones guiadas",
      texto:
        "Meditaciones para conectar con la imagen de cada planeta o signo, para que los símbolos no se queden solo en la cabeza.",
    },
    {
      icono: PenLine,
      titulo: "Prácticas de integración",
      texto: "Ejercicios sencillos para llevar lo que ves en la carta a tu día a día.",
    },
    {
      icono: BookOpen,
      titulo: "Herramientas y recursos",
      texto:
        "Para orientarte en tus primeros pasos: guías sacadas de lo que preparo para las clases y bibliografía de referencia.",
    },
  ]

  return (
    <section className={`py-16 md:py-24 ${FONDO_CREMA}`}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-sm order-last lg:order-first">
            <Image
              src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1793218215/kaleidoscope__web_eszgmg.jpg"
              alt="Manos sobre una carta natal impresa, junto a libros de astrología y una vela"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            {/* etiqueta y título revisados con Sylvia (18/11) */}
            <p className={`${ETIQUETA} mb-3`}>Teoría y práctica</p>
            <h2 className={`${TITULO} mb-6`}>Aprendizaje vivencial</h2>
            <p className="font-lato italic text-2xl leading-snug text-primary/90 dark:text-accent/90">
              Todo lo que aprendas lo miramos en tu propia carta natal desde el día uno. Además de identificar
              tus tendencias, indagamos desde dónde haces lo que haces y qué necesidad hay detrás, también de lo
              que no haces.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tarjetas.map(({ icono, titulo, texto }) => (
            <div key={titulo} className={`${TARJETA} ${TARJETA_BLANCA} p-8 md:p-10`}>
              <div className="mb-6">
                <Icono icono={icono} />
              </div>
              <h3 className={`${SUBTITULO} text-2xl mb-2`}>{titulo}</h3>
              <p className="text-body leading-relaxed">{texto}</p>
            </div>
          ))}
        </div>

        {/* Línea de fuentes: nombres elegidos con Sylvia (18/11), por confirmar que son los que más usa */}
        <p className="mx-auto mt-10 max-w-3xl text-center text-body leading-relaxed">
          Me apoyo en autores de referencia de la astrología psicológica y humanista, como Stephen Arroyo, Liz Greene,
          Howard Sasportas, Karen Hamaker-Zondag, Dane Rudhyar o Eugenio Carutti.
        </p>
      </div>
    </section>
  )
}

/* 5. Recorrido: filas a todo el ancho */
export function Recorrido() {
  // "Bloque" y "Semanas" vienen de la referencia: ETIQUETA NUEVA (por revisar), sin comprobar con el temario
  const bloques = [
    {
      semanas: "Sesiones 1 - 2",
      titulo: "El lenguaje y el mapa",
      texto:
        "Qué estás viendo cuando abres una carta natal: el lenguaje de los símbolos y las tres capas del mapa, planetas, signos y casas. Ubicas tu Sol, tu Luna y tu Ascendente, te familiarizas con el gráfico y reconoces cómo se reparten los planetas en hemisferios y cuadrantes.",
    },
    {
      semanas: "Sesiones 3 - 4",
      titulo: "Polaridades, elementos y modalidades",
      texto:
        "Dos polaridades, activa y receptiva, y cuatro elementos: fuego, tierra, aire y agua. Aprendemos a calcular el balance de elementos de tu carta y vemos si hay excesos o carencias. Y conoces las tres modalidades, tres momentos de un mismo flujo energético: iniciar (cardinal), sostener (fijo) y adaptarse (mutable).",
    },
    {
      semanas: "Sesiones 5 - 8",
      titulo: "Los doce signos y sus ejes polares",
      texto:
        "Recorremos la rueda zodiacal, los doce signos de cuatro en cuatro, de acuerdo con su lógica evolutiva, con ejemplos y visualizaciones. Empiezas a reconocerlos en tu carta y en tu expresión, más allá de tu signo solar. Comprendemos por qué los doce signos forman seis ejes de signos opuestos y complementarios.",
    },
    {
      semanas: "Sesiones 9 - 12",
      titulo: "Planetas, casas y primeras lecturas",
      texto:
        "Los planetas como personajes de tu carta y las casas como los escenarios de tu vida. Practicamos la combinación básica (planeta, signo y casa) y hacemos una primera lectura guiada de posiciones de tu carta.",
    },
  ]

  const fila = ({ semanas, titulo, texto }: (typeof bloques)[number], i: number) => (
    <li
      key={titulo}
      className={`${TARJETA} ${TARJETA_CREMA} grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] gap-4 md:gap-0 p-8 md:p-10`}
    >
      <div className={`md:border-r ${LINEA} md:pr-8 flex flex-col justify-center`}>
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-dorado mb-1">
          Bloque {String(i + 1).padStart(2, "0")}
        </p>
        <p className="font-lato text-xl text-primary/70 dark:text-accent/80">{semanas}</p>
      </div>
      <div className="md:pl-8">
        <h3 className={`${SUBTITULO} text-2xl md:text-3xl mb-2`}>{titulo}</h3>
        <p className="text-body leading-relaxed">{texto}</p>
      </div>
    </li>
  )

  return (
    <section id="recorrido" className={`py-16 md:py-24 ${FONDO_BLANCO} ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        {/* ETIQUETA NUEVA (por revisar): etiqueta y texto lateral */}
        <Encabezado
          etiqueta="Estructura del programa"
          titulo="Recorrido"
          linea
          lateral={<p className="text-sm font-medium text-muted-foreground">{EDICION.semanas} sesiones · 4 bloques progresivos</p>}
        />

        <ol className="space-y-4">{bloques.map((b, i) => fila(b, i))}</ol>

        {/* Nota de programa orientativo (redactada con Sylvia el 18/11) */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-body leading-relaxed">
          El programa es orientativo: es la estructura que pienso seguir a grandes rasgos y tiene un orden lógico, pero
          puede cambiar según el ritmo de aprendizaje y las necesidades del grupo. Cualquier cambio lo hablaremos en clase.
        </p>
      </div>
    </section>
  )
}

/* 6. Fechas y formato: cajas en horizontal con icono */
export function Fechas() {
  // Rótulos de cada caja: ETIQUETA NUEVA (por revisar)
  const fechas = [
    { icono: CalendarDays, rotulo: "Calendario", texto: `Una sesión por semana, del ${EDICION.inicio} al ${EDICION.fin}` },
    {
      icono: Clock,
      rotulo: "Horario",
      texto: `${EDICION.horario}, sin clase el ${EDICION.sinClase}`,
    },
    { icono: Video, rotulo: "Dónde", texto: "Online, en directo por Zoom" },
    { icono: Users, rotulo: "Grupo", texto: `${EDICION.maxPersonas} personas como máximo` },
    { icono: History, rotulo: "Grabaciones", texto: `Disponibles hasta ${EDICION.grabacionesMeses} meses después de la última clase` },
  ]

  return (
    <section className={`py-16 md:py-24 ${FONDO_CREMA}`}>
      <div className="container-custom">
        {/* ETIQUETA NUEVA (por revisar) */}
        <Encabezado etiqueta="Detalles prácticos" titulo="Cuándo y cómo" centrado />
        <ul className={`${TARJETA} ${TARJETA_BLANCA} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 p-4 md:p-8`}>
          {fechas.map(({ icono, rotulo, texto }) => (
            <li
              key={rotulo}
              className={`flex gap-4 border-b ${LINEA} px-2 py-5 last:border-b-0 sm:flex-col sm:px-4 lg:border-b-0 lg:border-l lg:py-2 lg:first:border-l-0 lg:px-6`}
            >
              <Icono icono={icono} />
              <div>
                <p className="font-semibold text-primary dark:text-accent mb-1">{rotulo}</p>
                <p className="text-body text-sm leading-relaxed">{texto}</p>
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
        <p className={`${ETIQUETA} !text-dorado mb-3`}>Próximamente</p>
        <h2 className={`${TITULO} !text-white mb-4`}>Abrimos inscripciones en diciembre</h2>
        <p className="font-lato italic text-2xl text-white/90 max-w-2xl mx-auto mb-8">
          Quienes se apunten a la lista recibirán antes que nadie la información del curso y la oferta de lanzamiento.
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
  return (
    <section id="clase-abierta" className={`py-16 md:py-24 ${FONDO_CREMA} ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        <div
          className={`${TARJETA} ${TARJETA_BLANCA} p-8 md:p-14 flex flex-col gap-8 md:flex-row md:items-center md:justify-between`}
        >
          <div className="max-w-2xl">
            {/* ETIQUETA NUEVA (por revisar) */}
            {/* Si en móvil ocupa dos líneas, la pastilla pasa a esquinas redondeadas para envolverlas bien */}
            <p
              className={`${ETIQUETA} mb-4 inline-flex max-w-full items-center gap-2 rounded-xl bg-crema px-3 py-1.5 leading-snug dark:bg-white/10 md:rounded-full`}
            >
              <Ticket aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              Encuentro abierto y gratuito
            </p>
            <h2 className={`${TITULO} mb-3`}>¿Quieres probar antes?</h2>
            <h3 className={`${SUBTITULO} text-2xl md:text-3xl mb-2`}>{EDICION.claseAbierta.nombre}</h3>
            <p className="font-medium text-primary dark:text-accent mb-5">
              Online, el {EDICION.claseAbierta.dia} {EDICION.claseAbierta.fecha}, de {EDICION.claseAbierta.hora} (hora
              de Barcelona).
            </p>
            <div aria-hidden="true" className="w-16 h-px bg-dorado mb-5" />
            {/* Descripción decidida el 17/11/2026 (contenido_landing.md, sección 8): usar tal cual */}
            <div className="space-y-4 text-body text-lg leading-relaxed">
              <p>
                Hay una parte de ti que se muestra primero cuando alguien te conoce, otra que busca expresarse y una
                tercera que necesita sentirse segura.
              </p>
              <p>
                En este encuentro exploraremos cómo el lenguaje simbólico de la astrología psicológica
                entiende el Sol, la Luna y el Ascendente en el contexto de la carta natal.
              </p>
              <p>
                Será también una oportunidad para conocernos: podrás ver cómo abordo la astrología, preguntarme por el
                curso y decidir con tranquilidad si este recorrido te interesa.
              </p>
            </div>
            <p className="mt-6 font-lato italic text-2xl text-primary/80 dark:text-accent/90">
              Apúntate a esta clase introductoria: es gratis y sin compromiso.
            </p>
          </div>
          <div className="w-full shrink-0 md:w-auto">
            <ClaseAbiertaBoton />
          </div>
        </div>
      </div>
    </section>
  )
}

/* 9. Quién soy: dentro de una tarjeta con fondo suave */
export function QuienSoy() {
  return (
    <section className={`py-16 md:py-24 ${FONDO_BLANCO}`}>
      <div className="container-custom">
        <div
          className={`${TARJETA} ${TARJETA_CREMA} p-6 md:p-16 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-16 items-center`}
        >
          <div className="relative h-[400px] md:h-[460px] rounded-xl overflow-hidden shadow-md">
            <Image
              src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1793218211/IMG_9543_web_fvtgd4.jpg"
              alt="Sylvia Llorente"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[center_65%]"
            />
          </div>
          <div>
            {/* etiqueta revisada con Sylvia (18/11) */}
            <p className={`${ETIQUETA} mb-3`}>Imparte y acompaña</p>
            <h2 className={`${TITULO} mb-5`}>Quién soy</h2>
            <div aria-hidden="true" className="w-12 h-px bg-dorado mb-6" />
            <p className="text-body text-lg leading-relaxed mb-6">
              Soy Sylvia, mujer, migrante y neurodivergente. Tengo más de diez años de experiencia en consulta utilizando la astrología psicológica y
              humanista como herramienta de integración terapéutica.
            </p>
            <p className="text-body text-lg leading-relaxed mb-6">
              Mi trayectoria previa en la investigación (soy doctora en Ciencias Políticas) me dio estructura y
              disciplina, y mi formación en astrología me enseñó a escuchar y acompañar. En mi práctica combino rigor y
              cercanía.
            </p>
            <p className="text-body text-lg leading-relaxed mb-6">
              La conciencia social, la perspectiva de género y el enfoque informado en trauma
              (<em>trauma-informed care</em>) son los principios que orientan mi trabajo. Ofrezco un espacio seguro,
              compasivo e inclusivo, sin juicios ni jerarquías. No hay recetas ni fórmulas: tú conoces tu experiencia
              mejor que nadie. Desde la escucha y la validación de tus necesidades, avanzamos a la par.
            </p>
            <p className="text-body leading-relaxed">
              No soy psicóloga clínica, y la astrología no sustituye un diagnóstico.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* 10. Lo que dicen de mi trabajo */
export function Testimonios() {
  const testimonios = [
    {
      texto:
        "He descubierto tu blog recientemente y me ha inspirado mucha confianza. […] Rigor, empatía y una intuición genuina es la combinación que ofrece. La lectura me ha dado herramientas y abierto nuevas vías para continuar con la auto-exploración, integración de partes y evolución hacia una mayor consciencia.",
      origen: "Gloria D. · Carta natal online",
    },
    {
      texto:
        "Muchas gracias por la sesión, tu manera de explicar tan agradable y tu comprensión. Me he sentido muy cómoda. Es increíble todo lo que puedes ver en la carta sobre mí y lo que he vivido.",
      origen: "Raquel B. · Carta natal presencial",
    },
    {
      texto:
        "Me ponía delante cosas que, de alguna manera, estaba evitando pero que sabía que estaban ahí. La sesión contigo me dio fuerza y claridad.",
      origen: "Miriam C. · Sesión online",
    },
    {
      texto:
        "Gracias a ti por inspirarme y por darme herramientas evolutivas para este nuevo año solar que me espera. Estoy con ganas de fijar mis cositas, descansar disfrutando, poner mis manos en la tierra y aprovechar el trabajo intenso que me pide mi luna. Gracias, preciosa, se nota que te apasiona tu trabajo.",
      origen: "Alejandra S. · Revolución solar presencial",
    },
    {
      texto:
        "Me hice una lectura de vínculos con Sylvia, y me ha encantado todo su trabajo y entrega. Mucho material para conocerme y seguir creciendo.",
      origen: "Jesús A. · Sinastría online",
    },
    {
      texto:
        "Es una maravilla todo el trabajo que te tomas en contármelo detalladamente y con palabras tan acertadas, de verdad que es un gusto y estoy muy agradecida. Me lo he leído todo y subrayado algunas cosas que me resuenan en el momento actual, aunque seguro que cuando vuelva dentro de unos meses, encontraré cosas nuevas.",
      origen: "Amaia P. · Sesión integral online",
    },
  ]

  return (
    <section className={`py-16 md:py-24 ${FONDO_CREMA}`}>
      <div className="container-custom">
        <Encabezado etiqueta="Testimonios" titulo="Lo que dicen mis consultantes" linea />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonios.map(({ texto, origen }) => (
            <figure key={texto} className={`${TARJETA} ${TARJETA_BLANCA} p-8 md:p-10 flex flex-col`}>
              <span aria-hidden="true" className="block w-8 h-px bg-dorado mb-6" />
              <blockquote className="text-body italic leading-relaxed flex-1">“{texto}”</blockquote>
              <figcaption className={`mt-6 border-t ${LINEA} pt-4 text-sm font-medium text-muted-foreground`}>
                {origen}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 11. Preguntas frecuentes: acordeón en tarjetas */
export function PreguntasFrecuentes() {
  const preguntas: { pregunta: string; respuesta: React.ReactNode }[] = [
    {
      pregunta: "¿Necesito saber algo de astrología?",
      respuesta: "No. Empezamos desde cero. Solo necesitas tu fecha, hora y lugar de nacimiento.",
    },
    {
      pregunta: "¿Y si no sé mi hora de nacimiento?",
      respuesta:
        "Sin hora no se pueden saber con certeza el Ascendente ni las casas, y el bloque de casas lo trabajamos con tu carta. Antes de inscribirte, intenta conseguirla: en España suele aparecer en el certificado literal de nacimiento del Registro Civil, y a veces la recuerda la familia. Si no la encuentras, escríbeme y lo miramos.",
    },
    {
      pregunta: "¿Y si no puedo conectarme el día de la clase?",
      respuesta:
        `Todas las clases se graban. Las subo durante la semana siguiente a cada clase y las tienes hasta ${EDICION.grabacionesMeses} meses después de la última clase.`,
    },
    {
      pregunta: "¿Para qué usas mis datos de nacimiento?",
      respuesta:
        "Para calcular tu carta, que te envío en PDF, y preparar los ejercicios de clase. No los uso para nada más ni se los doy a nadie.",
    },
    {
      pregunta: "¿Qué pasa si no se llega al mínimo de personas?",
      respuesta:
        `Para que el grupo funcione hacen falta al menos ${EDICION.minPersonas} personas. Las inscripciones cierran el ${EDICION.cierreInscripcion} y el ${EDICION.confirmacionMinimo} te confirmo si hemos llegado. Si no, el curso empieza el ${EDICION.inicioAlternativo}. Si esa fecha no te va bien, o si tampoco llegamos entonces, te devuelvo el dinero entero o te guardo la plaza para la siguiente edición, como prefieras.`,
    },
    {
      pregunta: "¿Puedo hacerlo desde fuera de España?",
      respuesta: "Sí, es online. El horario es el de Barcelona: comprueba a qué hora es en tu zona.",
    },
    {
      pregunta: "¿Cuánto cuesta?",
      respuesta:
        "El precio y la oferta de lanzamiento se comunican al abrir las inscripciones, en diciembre. Quienes estén en la lista los reciben antes que nadie.",
    },
    {
      pregunta: "¿Puedo pagar a plazos?",
      respuesta: "Sí, en dos pagos iguales y sin recargo.",
    },
    {
      pregunta: "¿Puedo pedir la devolución?",
      respuesta:
        "Tienes 14 días naturales desde que te inscribes para desistir y recuperar tu dinero, sin dar explicaciones. Si dentro de ese plazo ya han empezado las clases, descuento la parte proporcional de las que hayas recibido. Una vez extinguido el derecho de desistimiento, pasados esos 14 días naturales que prevé la ley, no se aceptan devoluciones, salvo que sea yo quien no pueda dar el curso o lo cambie de fecha y no te encaje (lo explico en «¿Qué pasa si no se llega al mínimo?»).",
    },
    {
      pregunta: "¿Dejar mis datos me reserva la plaza?",
      respuesta:
        "No. La plaza se reserva al inscribirte. Dejar tus datos sirve para que te escriba cuando abran las inscripciones.",
    },
  ]

  return (
    <section id="preguntas" className={`py-16 md:py-24 ${FONDO_BLANCO} ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* ETIQUETA NUEVA (por revisar) */}
          <Encabezado etiqueta="Claridad y dudas" titulo="Preguntas frecuentes" centrado />
          <div className="space-y-4">
            {preguntas.map(({ pregunta, respuesta }) => (
              <details key={pregunta} className={`group rounded-xl border border-black/5 dark:border-white/10 ${TARJETA_CREMA}`}>
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-lato text-xl font-semibold text-primary dark:text-accent [&::-webkit-details-marker]:hidden">
                  {pregunta}
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-primary/60 dark:text-accent/80 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="px-6 pb-6 text-body leading-relaxed">{respuesta}</div>
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
    <section id="preinscripcion" className={`py-16 md:py-24 ${FONDO_CREMA} ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        <div className={`${TARJETA} ${TARJETA_BLANCA} max-w-3xl mx-auto p-6 md:p-14`}>
          <Encabezado
            titulo="¿Te interesa? Cuéntame"
            subtitulo="Déjame tus datos y recibirás antes que nadie la información del curso y la oferta de lanzamiento. Si marcas la casilla, te apunto también a la clase abierta. Sin compromiso."
            centrado
          />
          <PreinscripcionForm />
          <p className="mt-6 text-center lg:text-sm text-muted-foreground">Dejar tus datos no te compromete a nada.</p>
        </div>
      </div>
    </section>
  )
}
