import type React from "react"
import Image from "next/image"
import { HuecoIcono, HuecoImagen, Pendiente, SCROLL_ANCLA, SeccionCielo } from "./marcadores"
import ClaseAbiertaBoton from "./clase-abierta-boton"
import PreinscripcionForm from "./preinscripcion-form"

// Textos: contenido_landing.md (versión del 28/10/2026). No añadir textos que no estén allí.

/* Barra de anclas bajo el menú general: fija en escritorio (lg), deslizable y no fija en móvil */
export function NavegacionCurso() {
  const anclas = [
    { href: "#para-quien", texto: "Para quién es" },
    { href: "#recorrido", texto: "Recorrido" },
    { href: "#precio", texto: "Precio" },
    { href: "#clase-abierta", texto: "Clase abierta" },
    { href: "#preguntas", texto: "Preguntas" },
  ]

  return (
    <nav
      aria-label="Secciones del curso"
      className="z-40 border-b border-neutral-light bg-white/90 backdrop-blur lg:sticky lg:top-16"
    >
      <div className="container-custom flex h-12 items-center gap-6 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {anclas.map(({ href, texto }) => (
          <a
            key={href}
            href={href}
            className="flex h-full items-center text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {texto}
          </a>
        ))}
        <a
          href="#preinscripcion"
          className="ml-auto flex min-h-11 shrink-0 items-center rounded-md bg-primary px-4 text-sm lg:min-h-0 lg:py-1.5 font-semibold text-white transition-all hover:bg-opacity-90"
        >
          Preinscríbete
        </a>
      </div>
    </nav>
  )
}

/* 1. Cabecera: violeta liso + Sri Yantra al 6 %, sin cielo estrellado */
export function Cabecera() {
  const datos = [
    "12 encuentros en directo",
    "Práctica con tu propia carta natal",
    "Grabaciones disponibles durante 3 meses",
  ]

  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      {/* Con margen: el dibujo llega al borde del PNG y, a sangre, se veía cortado */}
      {/* TODO: versión elegida, dorado al 75 % con líneas finas. Falta el SVG con trazo #B09A7B; mientras, PNG dorado al 50 % */}
      <div
        aria-hidden="true"
        className="absolute inset-x-4 inset-y-8 bg-sri-yantra-dorado bg-contain bg-center bg-no-repeat opacity-50"
      />
      <div className="container-custom relative z-10">
        <div className="relative max-w-3xl mx-auto text-center">
          {/* Degradado violeta detrás del texto: tapa las líneas del Sri Yantra bajo las letras y se desvanece hacia fuera */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 -inset-x-8 -z-10 bg-[radial-gradient(closest-side,rgba(74,63,116,0.95)_60%,rgba(74,63,116,0)_100%)] md:bg-[radial-gradient(closest-side,rgba(74,63,116,0.95)_35%,rgba(74,63,116,0)_100%)]"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Tu carta natal: de las partes al todo
          </h1>
          <p className="text-xl md:text-2xl text-white/85 mb-8 font-lato font-semibold md:font-normal">
            Curso vivencial de iniciación a la astrología psicológica
          </p>
          <ul className="flex flex-wrap justify-center gap-3 mb-10">
            {datos.map((dato) => (
              <li key={dato} className="rounded-full border border-white/30 bg-primary/75 px-4 py-1.5 text-sm text-white/90">
                {dato}
              </li>
            ))}
          </ul>
          <a
            href="#preinscripcion"
            className="inline-block bg-white text-primary rounded-md font-lora font-semibold transition-all hover:bg-accent hover:text-white text-lg px-8 py-4"
          >
            Preinscríbete
          </a>
        </div>
      </div>
    </section>
  )
}

/* Ficha rápida: franja bajo la cabecera */
export function FichaRapida() {
  const ficha = [
    { etiqueta: "Duración", dato: "12 semanas" },
    { etiqueta: "Formato", dato: "En directo por Zoom" },
    { etiqueta: "Grupo", dato: "10 personas como máximo" },
    { etiqueta: "Requisitos", dato: "Sin conocimientos previos" },
    { etiqueta: "Acompaña", dato: "Sylvia Llorente" },
  ]

  return (
    <section className="bg-crema border-b border-dorado/40">
      <div className="container-custom">
        <dl className="grid grid-cols-2 md:grid-cols-5 divide-dorado/40 md:divide-x">
          {ficha.map(({ etiqueta, dato }) => (
            <div key={etiqueta} className="px-4 py-6 text-center last:col-span-2 md:last:col-span-1">
              <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{etiqueta}</dt>
              <dd className="font-lato font-semibold text-lg text-primary">{dato}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/* 2. Para quién es: dos tarjetas con la tarjeta oscura en el centro */
export function ParaQuien() {
  return (
    <section id="para-quien" className={`py-16 md:py-24 ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        <h2 className="section-title text-center">Para quién es</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          <div className="bg-white border border-neutral-light rounded-lg p-8 shadow-sm">
            <p className="text-body leading-relaxed">
              Para ti, si tienes curiosidad, quieres acercarte al lenguaje simbólico y te apetece un espacio donde
              hablar de espiritualidad, misticismo o trascendencia sin tener que justificarte, para encontrarte con
              personas que te entienden y comparten tus inquietudes. Disfrutar aprendiendo es más que suficiente.
            </p>
          </div>

          <div className="relative overflow-hidden bg-primary text-white rounded-lg p-8 shadow-md flex items-center">
            <div
              aria-hidden="true"
              className="absolute -right-16 -bottom-16 w-56 h-56 bg-sri-yantra-pattern bg-contain bg-no-repeat opacity-10 brightness-0 invert"
            />
            <blockquote className="relative z-10 font-lato text-2xl leading-snug">
              A lo mejor te has visto en las dos. Suele ser la misma persona en dos momentos distintos. Todas tus
              versiones son bienvenidas. No hace falta saber nada de astrología antes de empezar.
            </blockquote>
          </div>

          <div className="bg-white border border-neutral-light rounded-lg p-8 shadow-sm">
            <p className="text-body leading-relaxed">
              Y para ti, si quieres mirarte por dentro. Si te interesa (re)conocer todas tus partes, escuchar qué
              necesitan y darles un lugar.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <div aria-hidden="true" className="w-16 h-px bg-dorado mx-auto mb-8" />
          <h3 className="text-2xl md:text-3xl text-primary mb-4">Lo que puede pasar por el camino</h3>
          <p className="text-body text-lg leading-relaxed">
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

/* 3. De las partes al todo */
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
    <section className="py-16 md:py-24 bg-crema">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="section-title">De las partes al todo</h2>
            <p className="text-body text-lg leading-relaxed">
              Una carta natal contiene muchísima información. Por eso vamos parte por parte: entendemos cada pieza,
              vemos cómo se relacionan entre ellas y, al final, armamos el todo.
            </p>
          </div>
          {/* TODO: carta natal descompuesta en capas (planetas, signos, casas) que se juntan en la rueda completa. Canva o SVG animado. */}
          <HuecoImagen etiqueta="Carta natal en capas" className="aspect-square max-w-md w-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partes.map(({ titulo, texto }) => (
            <div key={titulo} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl text-primary mb-2">{titulo}</h3>
              <p className="text-body lg:text-sm leading-relaxed">{texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 4. Cómo se vive */
export function ComoSeVive() {
  const tarjetas = [
    {
      titulo: "Tu carta desde el primer día",
      texto:
        "Cada concepto lo buscas en tu carta. Te llevas una tabla de palabras clave por signo para empezar a leer sin memorizar.",
    },
    { titulo: "Visualizaciones", texto: "Para que los símbolos no se queden solo en la cabeza." },
    {
      titulo: "Ejercicios de integración",
      texto: "Recomendaciones prácticas para llevar lo que ves en la carta a tu vida.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="relative aspect-[3/2] rounded-lg overflow-hidden order-last lg:order-first">
            <Image
              src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1793218215/kaleidoscope__web_eszgmg.jpg"
              alt="Manos sobre una carta natal impresa, junto a libros de astrología y una vela"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="section-title">Cómo se vive</h2>
            <p className="text-body text-lg leading-relaxed">
              Desde la primera clase lees parte de tu propia carta. Las clases combinan teoría y práctica. Además de ver
              tus tendencias, nos preguntamos desde dónde haces lo que haces y qué necesidad hay detrás, también de lo
              que no haces.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tarjetas.map(({ titulo, texto }) => (
            <div key={titulo} className="bg-white border border-neutral-light rounded-lg p-8 shadow-sm">
              <div className="mb-6">
                <HuecoIcono />
              </div>
              <h3 className="text-xl text-primary mb-2">{titulo}</h3>
              <p className="text-body leading-relaxed">{texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 5. Recorrido */
export function Recorrido() {
  const bloques = [
    {
      titulo: "Orientarte en tu carta",
      texto:
        "Qué estás viendo cuando abres una carta natal. Ubicas tu Sol, tu Luna y tu Ascendente, y empiezas a reconocer cómo se reparten los planetas en hemisferios y cuadrantes.",
    },
    {
      titulo: "Polaridades, elementos y modalidades",
      texto:
        "Fuego, tierra, aire y agua: los cuatro temperamentos. Ves cómo aparecen en tu carta, y conoces las tres maneras de moverse por la vida: arrancar, sostener, adaptar.",
    },
    {
      titulo: "Los doce signos",
      texto:
        "Los recorremos uno a uno, con ejemplos y visualizaciones. Los vas ubicando en tu carta, más allá de tu signo solar.",
    },
    {
      titulo: "Planetas, casas y primeras lecturas",
      texto:
        "Los planetas como personajes de tu carta y las casas como los escenarios de tu vida. Practicamos la combinación básica (planeta, signo y casa) y hacemos una primera lectura guiada de posiciones de tu carta.",
    },
  ]

  return (
    <section id="recorrido" className={`py-16 md:py-24 bg-crema ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        <h2 className="section-title text-center">Recorrido</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 items-start max-w-6xl mx-auto">
          <div className="relative aspect-[3/2] rounded-lg overflow-hidden lg:sticky lg:top-32">
            <Image
              src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1793218217/IMG_9694_web_pcq8zv.jpg"
              alt="Carta natal en una tablilla junto al libro Las doce casas"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <ol className="divide-y divide-dorado/40 border-y border-dorado/40">
            {bloques.map(({ titulo, texto }, i) => (
              <li key={titulo} className="grid grid-cols-[3rem_1fr] md:grid-cols-[5rem_1fr] gap-4 py-8">
                <span aria-hidden="true" className="font-lato text-3xl text-dorado leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl text-primary mb-2">{titulo}</h3>
                  <p className="text-body leading-relaxed">{texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* 6. Fechas y formato */
export function Fechas() {
  const fechas = [
    "Del 16 de enero al 10 de abril de 2027",
    "Sábados de 10:30 a 12:30, hora de Madrid, sin clase el 27 de marzo",
    "En directo por Zoom",
    "Grupo de 10 personas como máximo",
    "Grabaciones disponibles hasta el 10 de julio de 2027",
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title text-center">Fechas y formato</h2>
          <ul className="space-y-4">
            {fechas.map((fecha) => (
              <li key={fecha} className="flex items-start gap-4 text-body text-lg">
                <span aria-hidden="true" className="mt-3.5 h-px w-6 shrink-0 bg-dorado" />
                {fecha}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* 7. Precio: cielo estrellado suave con tarjetas blancas */
export function Precio() {
  const precios = [
    { nombre: "Apoyo", texto: "Si ahora no puedes pagar el precio estándar. Plazas limitadas." },
    { nombre: "Estándar", texto: "El precio del curso." },
    { nombre: "Solidario", texto: "Tu aportación ayuda a cubrir parte de una plaza de apoyo." },
  ]

  return (
    <SeccionCielo id="precio" className={SCROLL_ANCLA}>
      <div className="text-center mb-12">
        <h2 className="section-title text-white">Precio</h2>
        <p className="text-lg text-white max-w-2xl mx-auto">
          Hay tres precios. Elige el que puedas sostener ahora: no te pido justificantes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        {precios.map(({ nombre, texto }) => (
          <div key={nombre} className="bg-white rounded-lg p-8 text-center shadow-md flex flex-col">
            <h3 className="text-2xl text-primary mb-4">{nombre}</h3>
            {/* TODO: cifras después de la cita del PAE (3/11), según el curso lleve IVA o no */}
            <div className="mb-4">
              <Pendiente>Cifra</Pendiente>
            </div>
            <p className="text-body leading-relaxed">{texto}</p>
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
          className="inline-block bg-white text-primary rounded-md font-lora font-semibold transition-all hover:bg-accent hover:text-white text-lg px-8 py-4"
        >
          Preinscríbete
        </a>
      </div>
    </SeccionCielo>
  )
}

/* 8. Clase abierta: bloque grande y centrado */
export function ClaseAbierta() {
  return (
    <section id="clase-abierta" className={`py-16 md:py-24 bg-crema ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto bg-white border-2 border-dorado/40 rounded-lg p-10 md:p-16 shadow-md text-center flex flex-col items-center">
          <h2 className="section-title mb-3">¿Quieres probar antes?</h2>
          <p className="font-lato text-2xl text-primary/90 mb-6 max-w-xl">
            Clase abierta y gratuita de una hora, el sábado 12 de diciembre.
          </p>
          <div aria-hidden="true" className="w-16 h-px bg-dorado mb-6" />
          {/* TODO: hora de la clase abierta */}
          {/* TODO: qué se hace en la clase abierta, en una frase */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Pendiente>Hora</Pendiente>
            <Pendiente>Qué se hace en la clase, en una frase</Pendiente>
          </div>
          <ClaseAbiertaBoton />
        </div>
      </div>
    </section>
  )
}

/* 9. Quién soy */
export function QuienSoy() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div className="relative h-[400px] md:h-[480px] rounded-lg overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1793218211/IMG_9543_web_fvtgd4.jpg"
              alt="Sylvia Llorente"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[center_65%]"
            />
          </div>
          <div>
            <h2 className="section-title">Quién soy</h2>
            <p className="text-body leading-relaxed mb-6">
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
    <section className="py-16 md:py-24 bg-crema">
      <div className="container-custom">
        <h2 className="section-title text-center">Lo que dicen de mi trabajo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonios.map(({ texto, origen }) => (
            <figure key={texto} className="bg-white rounded-lg p-8 shadow-sm flex flex-col">
              <span aria-hidden="true" className="font-lato text-5xl text-dorado leading-none mb-2">
                “
              </span>
              <blockquote className="text-body leading-relaxed flex-1">{texto}</blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">{origen}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 11. Preguntas frecuentes */
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
      respuesta: "Sí, es online. El horario es el de Madrid: comprueba a qué hora es en tu zona.",
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
    <section id="preguntas" className={`py-16 md:py-24 ${SCROLL_ANCLA}`}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">Preguntas frecuentes</h2>
          <div className="divide-y divide-dorado/40 border-y border-dorado/40">
            {preguntas.map(({ pregunta, respuesta }) => (
              <details key={pregunta} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-lato text-xl font-semibold text-primary [&::-webkit-details-marker]:hidden">
                  {pregunta}
                  <span
                    aria-hidden="true"
                    className="text-2xl leading-none text-dorado transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-5 text-body leading-relaxed">{respuesta}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* 12. Formulario de preinscripción: cielo estrellado suave con tarjeta blanca */
export function Preinscripcion() {
  return (
    <SeccionCielo id="preinscripcion" className={SCROLL_ANCLA}>
      <div className="max-w-2xl mx-auto">
        <h2 className="section-title text-white text-center">Preinscríbete</h2>
        <div className="bg-white rounded-lg p-6 md:p-10 shadow-md">
          <PreinscripcionForm />
          <p className="mt-6 text-center lg:text-sm text-muted-foreground">
            La preinscripción no te compromete a nada.
          </p>
        </div>
      </div>
    </SeccionCielo>
  )
}
