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
    // Imagen propia de la landing (1200 × 630): la que sale al compartir el enlace por WhatsApp, redes, etc.
    images: [
      {
        url: "/curso/og-curso.png",
        width: 1200,
        height: 630,
        alt: "Curso vivencial: Tu carta natal, de las partes al todo. Iniciación a la astrología psicológica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Curso de iniciación a la carta natal online | Astrokaleido",
    description:
      "Curso online en directo de iniciación a la carta natal: 12 sábados desde el 16 de enero de 2027, sin conocimientos previos y practicando con tu propia carta.",
    images: ["/curso/og-curso.png"],
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
