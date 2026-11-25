import type { Metadata } from "next"
import {
  NavegacionCurso,
  Cabecera,
  FichaRapida,
  ParaQuien,
  PartesAlTodo,
  ComoSeVive,
  Recorrido,
  Fechas,
  Precio,
  ClaseAbierta,
  QuienSoy,
  Testimonios,
  PreguntasFrecuentes,
  Preinscripcion,
} from "./secciones"

// Landing del curso. Indexable, en sitemap.ts y enlazada desde el menú y el pie de página.
// Comprobado el 25/11/2026 que no queda ningún [PENDIENTE] en la página.
export const metadata: Metadata = {
  title: "Curso de iniciación a la carta natal online | Astrokaleido",
  description:
    "Curso online en directo de iniciación a la carta natal: 12 sábados desde el 16 de enero de 2027, sin conocimientos previos y practicando con tu propia carta.",
  openGraph: {
    title: "Curso de iniciación a la carta natal online | Astrokaleido",
    description:
      "Curso online en directo de iniciación a la carta natal: 12 sábados desde el 16 de enero de 2027, sin conocimientos previos y practicando con tu propia carta.",
    url: "/curso-carta-natal",
    type: "website",
    locale: "es_ES",
    // La imagen general de la web (app/opengraph-image.png); al definir openGraph aquí hay que indicarla otra vez
    images: [{ url: "/opengraph-image.png", width: 751, height: 505 }],
  },
  alternates: {
    canonical: "/curso-carta-natal",
  },
}

export default function CursoCartaNatalPage() {
  return (
    <>
      <NavegacionCurso />
      <Cabecera />
      <FichaRapida />
      <ParaQuien />
      <PartesAlTodo />
      <ComoSeVive />
      <Recorrido />
      <Fechas />
      <Precio />
      <ClaseAbierta />
      <QuienSoy />
      <Testimonios />
      <PreguntasFrecuentes />
      <Preinscripcion />
    </>
  )
}
