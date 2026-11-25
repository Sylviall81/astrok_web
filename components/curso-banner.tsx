import Link from "next/link"
import { EDICION } from "@/app/curso-carta-natal/edicion"

// Aviso del curso en la portada, entre "Sobre mí" y "Servicios destacados". Es la cabecera de la landing
// (app/curso-carta-natal) en versión corta. TEMPORAL: mientras la inscripción sea solo una lista de interesados.
// Para quitarlo, borrar <CursoBanner /> de app/page.tsx. Año, plazas y fecha salen de edicion.ts.
export default function CursoBanner() {
  return (
    <section className="relative overflow-hidden bg-primary py-12 md:py-16" aria-labelledby="curso-banner-titulo">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/curso/sriyantra-dorado.svg')] bg-[length:150%] bg-center bg-no-repeat opacity-[0.16] md:bg-[length:800px]"
      />
      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/90 backdrop-blur-sm md:text-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dorado" />
            Edición {EDICION.anio} · Plazas reducidas
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dorado" />
          </p>
          <p className="mb-2 font-lato text-2xl font-bold italic text-white md:text-3xl">Curso vivencial</p>
          <h2
            id="curso-banner-titulo"
            className="mb-2 font-lato text-4xl font-semibold leading-[1.1] text-white md:text-5xl"
          >
            Tu carta natal:
            <span className="block font-semibold text-dorado">de las partes al todo</span>
          </h2>
          <p className="mb-5 font-lato text-[1.375rem] italic text-white/90 md:text-[1.625rem]">
            Iniciación a la astrología psicológica
          </p>
          <p className="mb-6 text-base text-white/85 md:text-lg">
            Online y en directo · {EDICION.semanas} sábados desde el {EDICION.inicio} · Sin conocimientos previos
          </p>
          <p className="mb-6 font-lato text-xl font-semibold text-white md:text-2xl">
            Apertura de inscripciones en diciembre
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <Link
              href="/curso-carta-natal#preinscripcion"
              className="inline-block rounded-lg bg-white px-10 py-3.5 font-lora text-lg font-semibold text-primary shadow-md transition-all hover:bg-accent hover:text-white"
            >
              Apúntame a la lista
            </Link>
            <Link
              href="/curso-carta-natal"
              className="text-base text-white/85 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white md:text-lg"
            >
              Ver el programa →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
