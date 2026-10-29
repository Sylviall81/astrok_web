// Opciones del formulario de preinscripción. Las usan el formulario (lo que ve la persona) y
// /api/preinscripcion (lo que se guarda en Brevo, con el mismo texto que se ve).

export type Opcion = { valor: string; texto: string }

export const MOTIVOS: Opcion[] = [
  { valor: "curso", texto: "Quiero hacer el curso" },
  { valor: "pensando", texto: "Me lo estoy pensando" },
  { valor: "clase-abierta", texto: "De momento, solo la clase abierta" },
]

export const PRECIOS: Opcion[] = [
  { valor: "apoyo", texto: "Apoyo" },
  { valor: "estandar", texto: "Estándar" },
  { valor: "solidario", texto: "Solidario" },
  { valor: "no-lo-se", texto: "Aún no lo sé" },
]

export const EXPERIENCIA: Opcion[] = [
  { valor: "nada", texto: "Nada" },
  { valor: "algo", texto: "Algo" },
  { valor: "bastante", texto: "Bastante" },
]

export const HORARIOS: Opcion[] = [
  { valor: "entre-semana-tarde", texto: "Entre semana por la tarde" },
  { valor: "entre-semana-noche", texto: "Entre semana por la noche" },
  { valor: "otro", texto: "Otro" },
]

// Texto de una opción a partir de su valor (undefined si el valor no es válido)
export const textoDe = (opciones: Opcion[], valor: unknown) => opciones.find((o) => o.valor === valor)?.texto
