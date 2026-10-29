import type React from "react"
import Image from "next/image"
import {
  BookOpen,
  Brain,
  CalendarDays,
  ChevronDown,
  Clock,
  Compass,
  Eye,
  History,
  PenLine,
  Sparkles,
  Ticket,
  Users,
  Video,
} from "lucide-react"
import { Pendiente, SCROLL_ANCLA, SeccionCielo } from "./marcadores"
import CartaEnCapas from "./carta-en-capas"
import ClaseAbiertaBoton from "./clase-abierta-boton"
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
  centrado = false,
  linea = false,
  lateral,
}: {
  etiqueta: string
  titulo: React.ReactNode
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
        <p className={`${ETIQUETA} mb-3`}>{etiqueta}</p>
        <h2 className={TITULO}>{titulo}</h2>
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
    { icono: CalendarDays, texto: "12 encuentros en directo" },
    { icono: BookOpen, texto: "Práctica con tu propia carta natal" },
    { icono: History, texto: "Grabaciones disponibles durante 3 meses" },
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
            Edición 2027 · Plazas reducidas
          </p>
          <h1 className="text-[2.6rem] md:text-6xl lg:text-[4.25rem] text-white mb-4 md:mb-6 leading-[1.1] md:leading-tight">
            Tu carta natal: <span className="not-italic font-semibold text-dorado">de las partes al todo</span>
          </h1>
          <p className="font-lato italic text-xl md:text-3xl text-white/90 mb-6 md:mb-10">
            Curso vivencial de iniciación a la astrología psicológica
          </p>
          <ul className="flex flex-wrap lg:flex-nowrap justify-center gap-2 md:gap-3 mb-7 md:mb-10">
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
          <a
            href="#preinscripcion"
            className="inline-block bg-white text-primary rounded-lg font-lora font-semibold transition-all hover:bg-accent hover:text-white text-lg px-10 py-3.5 md:py-4 shadow-md"
          >
            Preinscríbete
          </a>
        </div>
      </div>
    </section>
  )
}

/* Ficha rápida: tarjeta blanca que se monta sobre el final de la cabecera */
export function FichaRapida() {
  const ficha = [
    { etiqueta: "Duración", dato: "12 semanas" },
    { etiqueta: "Formato", dato: "En directo por Zoom" },
    { etiqueta: "Grupo", dato: "10 personas como máximo" },
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
      etiqueta: "Vía exploratoria", // ETIQUETA NUEVA (por revisar)
      icono: Compass,
      texto:
        "Para ti, si tienes curiosidad, quieres acercarte al lenguaje simbólico y te apetece un espacio donde hablar de espiritualidad, misticismo o trascendencia sin tener que justificarte, para encontrarte con personas que te entienden y comparten tus inquietudes. Disfrutar aprendiendo es más que suficiente.",
    },
    {
      etiqueta: "Vía introspectiva", // ETIQUETA NUEVA (por revisar)
      icono: Brain,
      texto:
        "Y para ti, si quieres mirarte por dentro. Si te interesa (re)conocer todas tus partes, escuchar qué necesitan y darles un lugar.",
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
            A lo mejor te has visto en las dos. Suele ser la misma persona en dos momentos distintos. Todas tus
            versiones son bienvenidas. No hace falta saber nada de astrología antes de empezar.
          </blockquote>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-0 rounded-2xl bg-dorado/10 dark:bg-white/5 p-8 md:p-12">
          <div className={`md:border-r ${LINEA} md:pr-10 flex flex-col justify-center`}>
            {/* ETIQUETA NUEVA (por revisar) */}
            <p className={`${ETIQUETA} mb-2`}>Acompañamiento abierto</p>
            <h3 className={`${SUBTITULO} text-2xl md:text-3xl`}>Lo que puede pasar por el camino</h3>
          </div>
          <p className="text-body text-lg leading-relaxed md:pl-10">
            Mirarte a ti y a tu carta con curiosidad, paciencia y compasión durante doce semanas casi siempre mueve
            cosas. Puede que veas una tendencia tuya con otros ojos y te preguntes qué conservar y qué quieres cambiar
            de sitio o de narrativa. Si pasa, tendrá su espacio en el curso. Si no pasa, también está bien: vamos a tu
            ritmo y no hay nada que conseguir.
          </p>
        </div>
      </div>
    </section>
  )
}

/* 3. De las partes al todo: carta natal animada por capas y cuatro tarjetas numeradas unidas por una línea fina */
export function PartesAlTodo() {
  const partes = [
    {
      titulo: "Estructura y elementos",
      texto:
        "El clima de fondo de tu carta: hacia dónde tiende tu energía, más hacia fuera o más hacia dentro, cuál abunda y cuál echas en falta.",
    },
    { titulo: "Signos", texto: "El vestuario con el que cada planeta sale a escena." },
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-12">
          <div>
            {/* ETIQUETA NUEVA (por revisar) */}
            <p className={`${ETIQUETA} mb-3`}>Metodología caleidoscópica</p>
            <h2 className={`${TITULO} mb-6`}>De las partes al todo</h2>
            <p className="text-body text-lg leading-relaxed">
              Una carta natal contiene muchísima información. Por eso vamos parte por parte: entendemos cada pieza,
              vemos cómo se relacionan entre ellas y, al final, armamos el todo.
            </p>
          </div>
          <CartaEnCapas />
        </div>

        <div className="relative">
          {/* Línea que une las tarjetas: solo se ve en los huecos entre ellas */}
          <div aria-hidden="true" className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-dorado/60 lg:block" />
          <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partes.map(({ titulo, texto }, i) => (
              <li key={titulo} className={`${TARJETA} ${TARJETA_CREMA} p-6`}>
                <span
                  aria-hidden="true"
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg border-2 border-primary bg-white font-lato text-2xl font-semibold text-primary dark:border-accent dark:bg-transparent dark:text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`${SUBTITULO} text-2xl mb-2`}>
                  {/* Aquí aterriza la palabra de su capa en la carta; data-marcado pinta la línea dorada un instante */}
                  <span
                    data-capa-titulo={i + 1}
                    className="relative inline-block after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-dorado after:transition-[width] after:duration-700 after:ease-in-out data-[marcado]:after:w-3/5"
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
      icono: Eye,
      titulo: "Tu carta desde el primer día",
      texto:
        "Cada concepto lo buscas en tu carta. Te llevas una tabla de palabras clave por signo para empezar a leer sin memorizar.",
    },
    { icono: Sparkles, titulo: "Visualizaciones", texto: "Para que los símbolos no se queden solo en la cabeza." },
    {
      icono: PenLine,
      titulo: "Ejercicios de integración",
      texto: "Recomendaciones prácticas para llevar lo que ves en la carta a tu vida.",
    },
  ]

  return (
    <section className={`pt-16 pb-12 md:pt-24 md:pb-16 ${FONDO_CREMA}`}>
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
            {/* ETIQUETA NUEVA (por revisar) */}
            <p className={`${ETIQUETA} mb-3`}>Experiencia de aprendizaje</p>
            <h2 className={`${TITULO} mb-6`}>Cómo se vive</h2>
            <p className="font-lato italic text-2xl leading-snug text-primary/90 dark:text-accent/90">
              Desde la primera clase lees parte de tu propia carta. Las clases combinan teoría y práctica. Además de ver
              tus tendencias, nos preguntamos desde dónde haces lo que haces y qué necesidad hay detrás, también de lo
              que no haces.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </section>
  )
}

/* Puente entre "Cómo se vive" y "Recorrido": la foto se monta sobre el cambio de fondo (mitad crema, mitad blanco) */
export function PuenteRecorrido() {
  return (
    <div className="bg-[linear-gradient(to_bottom,#F6F5EF_50%,#ffffff_50%)] dark:bg-[linear-gradient(to_bottom,hsl(var(--muted))_50%,transparent_50%)]">
      <div className="container-custom">
        <div className="relative aspect-[16/9] md:aspect-[7/2] rounded-2xl overflow-hidden shadow-md">
          <Image
            src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1793218217/IMG_9694_web_pcq8zv.jpg"
            alt="Carta natal en una tablilla junto al libro Las doce casas"
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

/* 5. Recorrido: filas a todo el ancho */
export function Recorrido() {
  // "Bloque" y "Semanas" vienen de la referencia: ETIQUETA NUEVA (por revisar), sin comprobar con el temario
  const bloques = [
    {
      semanas: "Semanas 1 - 3",
      titulo: "Orientarte en tu carta",
      texto:
        "Qué estás viendo cuando abres una carta natal. Ubicas tu Sol, tu Luna y tu Ascendente, y empiezas a reconocer cómo se reparten los planetas en hemisferios y cuadrantes.",
    },
    {
      semanas: "Semanas 4 - 6",
      titulo: "Polaridades, elementos y modalidades",
      texto:
        "Fuego, tierra, aire y agua: los cuatro temperamentos. Ves cómo aparecen en tu carta, y conoces las tres maneras de moverse por la vida: arrancar, sostener, adaptar.",
    },
    {
      semanas: "Semanas 7 - 9",
      titulo: "Los doce signos",
      texto:
        "Los recorremos uno a uno, con ejemplos y visualizaciones. Los vas ubicando en tu carta, más allá de tu signo solar.",
    },
    {
      semanas: "Semanas 10 - 12",
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
    <section id="recorrido" className={`pt-12 pb-16 md:pt-16 md:pb-24 ${FONDO_BLANCO} ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        {/* ETIQUETA NUEVA (por revisar): etiqueta y texto lateral */}
        <Encabezado
          etiqueta="Estructura del programa"
          titulo="Recorrido"
          linea
          lateral={<p className="text-sm font-medium text-muted-foreground">12 semanas · 4 bloques progresivos</p>}
        />

        <ol className="space-y-4">{bloques.map((b, i) => fila(b, i))}</ol>
      </div>
    </section>
  )
}

/* 6. Fechas y formato: cajas en horizontal con icono */
export function Fechas() {
  // Rótulos de cada caja: ETIQUETA NUEVA (por revisar)
  const fechas = [
    { icono: CalendarDays, rotulo: "Calendario", texto: "Del 16 de enero al 10 de abril de 2027" },
    {
      icono: Clock,
      rotulo: "Horario",
      texto: "Sábados de 10:30 a 12:30, hora de Barcelona, sin clase el 27 de marzo",
    },
    { icono: Video, rotulo: "Canal", texto: "En directo por Zoom" },
    { icono: Users, rotulo: "Grupo", texto: "Grupo de 10 personas como máximo" },
    { icono: History, rotulo: "Grabaciones", texto: "Grabaciones disponibles hasta el 10 de julio de 2027" },
  ]

  return (
    <section className={`py-16 md:py-24 ${FONDO_CREMA}`}>
      <div className="container-custom">
        {/* ETIQUETA NUEVA (por revisar) */}
        <Encabezado etiqueta="Coordenadas del encuentro" titulo="Fechas y formato" centrado />
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

/* 7. Precio: cielo estrellado suave con tres tarjetas blancas iguales */
export function Precio() {
  const precios = [
    { nombre: "Apoyo", texto: "Si ahora no puedes pagar el precio estándar. Plazas limitadas." },
    { nombre: "Estándar", texto: "El precio del curso." },
    { nombre: "Solidario", texto: "Tu aportación ayuda a cubrir parte de una plaza de apoyo." },
  ]

  return (
    <SeccionCielo id="precio" className={SCROLL_ANCLA}>
      <div className="text-center mb-12">
        {/* ETIQUETA NUEVA (por revisar) */}
        <p className={`${ETIQUETA} !text-dorado mb-3`}>Escala consciente</p>
        <h2 className={`${TITULO} !text-white mb-4`}>Precio</h2>
        <p className="font-lato italic text-2xl text-white/90 max-w-2xl mx-auto">
          Hay tres precios. Elige el que puedas sostener ahora: no te pido justificantes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {precios.map(({ nombre, texto }) => (
          <div
            key={nombre}
            className={`${TARJETA_BLANCA} rounded-2xl p-8 md:p-10 shadow-md flex flex-col dark:border dark:border-white/10`}
          >
            <h3 className={`${SUBTITULO} text-3xl mb-4`}>{nombre}</h3>
            {/* TODO: cifras después de la cita del PAE (3/11), según el curso lleve IVA o no */}
            <div className="mb-5">
              <Pendiente>Cifra</Pendiente>
            </div>
            <p className="text-body text-lg leading-relaxed">{texto}</p>
            {nombre === "Apoyo" && (
              // TODO: número de plazas de apoyo
              <div className="mt-3">
                <Pendiente>Número de plazas de apoyo</Pendiente>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-white text-lg mb-8">
          Las inscripciones se abren en diciembre. Preinscríbete y te escribo cuando abran.
        </p>
        <a
          href="#preinscripcion"
          className="inline-block bg-white text-primary rounded-lg font-lora font-semibold transition-all hover:bg-accent hover:text-white text-lg px-10 py-4"
        >
          Preinscríbete
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
            <p className={`${ETIQUETA} mb-4 inline-flex items-center gap-2 rounded-full bg-crema px-3 py-1.5 dark:bg-white/10`}>
              <Ticket aria-hidden="true" className="h-3.5 w-3.5" />
              Encuentro abierto y gratuito
            </p>
            <h2 className={`${TITULO} mb-2`}>¿Quieres probar antes?</h2>
            <p className="font-lato italic text-2xl text-primary/80 dark:text-accent/90 mb-5">
              Clase abierta y gratuita de una hora, el sábado 12 de diciembre.
            </p>
            <div aria-hidden="true" className="w-16 h-px bg-dorado mb-5" />
            {/* TODO: hora de la clase abierta */}
            {/* TODO: qué se hace en la clase abierta, en una frase */}
            <div className="flex flex-wrap gap-2">
              <Pendiente>Hora</Pendiente>
              <Pendiente>Qué se hace en la clase, en una frase</Pendiente>
            </div>
          </div>
          <div className="shrink-0">
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
            {/* ETIQUETA NUEVA (por revisar) */}
            <p className={`${ETIQUETA} mb-3`}>Acompañamiento y rigor</p>
            <h2 className={`${TITULO} mb-5`}>Quién soy</h2>
            <div aria-hidden="true" className="w-12 h-px bg-dorado mb-6" />
            <p className="text-body text-lg leading-relaxed mb-6">
              Soy Sylvia. Llevo más de diez años acompañando a personas a mirar su carta natal desde la astrología
              psicológica. Soy doctora en Ciencias Políticas, y eso se nota en cómo explico: con estructura y con
              fuentes. Acompaño con perspectiva de género y de forma informada en trauma, respetando el ritmo y las
              necesidades de cada persona. Cuido que el grupo sea un espacio seguro e inclusivo, sin juicios.
            </p>
            <p className="text-body leading-relaxed">
              No soy psicóloga clínica. Uso la astrología como una puerta y una herramienta para conocerte, nunca como
              sustituto de un diagnóstico.
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
        "Rigor, empatía y una intuición genuina es la combinación que ofrece. La lectura me ha dado herramientas y abierto nuevas vías para continuar con la auto-exploración, integración de partes y evolución hacia una mayor consciencia.",
      origen: "Consultante · sesión online",
    },
    {
      texto:
        "Muchas gracias por la sesión, tu manera de explicar tan agradable y tu comprensión. Me he sentido muy cómoda. Es increíble todo lo que puedes ver en la carta sobre mí y lo que he vivido.",
      origen: "Consultante · sesión online",
    },
    {
      texto:
        "Me ponía delante cosas que, de alguna manera, estaba evitando pero que sabía que estaban ahí. La sesión contigo me dio fuerza y claridad.",
      origen: "Consultante · sesión online",
    },
    {
      texto:
        "Llevo bastante tiempo interesándome por la astrología y últimamente estoy leyendo mucho e investigando al respecto. Sigo sobre todo la escuela de Carutti y recientemente también a la gente de Cosmograma. De hecho, me planteo hacer alguna formación, aunque en un primer momento con comprender mi carta natal ya tengo bastante. He descubierto tu blog hoy mismo y me ha inspirado mucha confianza.",
      origen: "Consultante · lectora del blog",
    },
  ]

  return (
    <section className={`py-16 md:py-24 ${FONDO_CREMA}`}>
      <div className="container-custom">
        {/* ETIQUETA NUEVA (por revisar) */}
        <Encabezado etiqueta="Voces y testimonios" titulo="Lo que dicen de mi trabajo" linea />
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
      pregunta: "¿Y si un sábado no puedo conectarme?",
      respuesta:
        "Todas las clases se graban. Las subo durante la semana siguiente a cada clase y las tienes hasta el 10 de julio de 2027.",
    },
    {
      pregunta: "¿Para qué usas mis datos de nacimiento?",
      respuesta:
        "Para calcular tu carta, que te envío en PDF, y preparar los ejercicios de clase. No los uso para nada más ni se los doy a nadie.",
    },
    {
      pregunta: "¿Qué pasa si no se llega al mínimo de personas?",
      respuesta:
        "Para que el grupo funcione hacen falta al menos 4 personas. Si el 8 de enero no hemos llegado, el curso empieza el 30 de enero. Si esa fecha no te va bien, o si tampoco llegamos entonces, te devuelvo el dinero entero o te guardo la plaza para la siguiente edición, como prefieras.",
    },
    {
      pregunta: "¿Puedo hacerlo desde fuera de España?",
      respuesta: "Sí, es online. El horario es el de Barcelona: comprueba a qué hora es en tu zona.",
    },
    {
      pregunta: "¿Puedo pagar a plazos?",
      // TODO: segundo pago manual, sin confirmar
      respuesta: <Pendiente>Pago a plazos</Pendiente>,
    },
    {
      pregunta: "¿Puedo pedir la devolución?",
      // TODO: se pregunta en el PAE (derecho de desistimiento de 14 días en compras online)
      respuesta: <Pendiente>Devoluciones</Pendiente>,
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
          {/* ETIQUETA NUEVA (por revisar) */}
          <Encabezado etiqueta="Reserva de plaza" titulo="Preinscríbete" centrado />
          <PreinscripcionForm />
          <p className="mt-6 text-center lg:text-sm text-muted-foreground">La preinscripción no te compromete a nada.</p>
        </div>
      </div>
    </section>
  )
}
