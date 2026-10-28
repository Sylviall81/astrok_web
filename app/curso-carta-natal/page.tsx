import type { Metadata } from "next"
import {
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

// Landing del curso. No se enlaza desde ninguna parte de la web ni está en sitemap.ts.
// TODO: antes de quitar el noindex, comprobar que no queda ningún [PENDIENTE] en la página.
export const metadata: Metadata = {
  title: "Tu carta natal: de las partes al todo | Kaleidoscope Astrología",
  description: "Curso vivencial de iniciación a la astrología psicológica",
  alternates: {
    canonical: "/curso-carta-natal",
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function CursoCartaNatalPage() {
  return (
    <>
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
