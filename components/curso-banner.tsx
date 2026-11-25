import Link from "next/link"
import { EDICION } from "@/app/curso-carta-natal/edicion"

// Aviso del curso en la portada, entre "Sobre mí" y "Servicios destacados". Es la cabecera de la landing
// (app/curso-carta-natal) en versión corta. TEMPORAL: mientras la inscripción sea solo una lista de interesados.
// Para quitarlo, borrar <CursoBanner /> de app/page.tsx. Año, plazas y fecha salen de edicion.ts.
export default function CursoBanner() {
  return (
    <section className="relative overflow-hidden bg-primary py-8 md:py-8" aria-labelledby="curso-banner-titulo">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/curso/sriyantra-dorado.svg')] bg-[length:150%] bg-center bg-no-repeat opacity-[0.16] md:bg-[length:800px]"
      />
      <div className="container-custom relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/90 backdrop-blur-sm md:text-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dorado" />
            Edición {EDICION.anio} · Plazas limitadas
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-dorado" />
          </p>
          <p className="mb-1 font-lato text-2xl font-bold italic leading-tight text-white md:text-3xl">Curso vivencial</p>
          <h2
            id="curso-banner-titulo"
            className="mb-1 font-lato text-4xl font-semibold leading-[1.05] text-white md:text-5xl md:whitespace-nowrap"
          >
            Tu carta natal:
            <span className="block font-semibold text-dorado md:ml-3 md:inline">de las partes al todo</span>
          </h2>
          <p className="mb-3 font-lato text-[1.375rem] italic leading-tight text-white/90 md:text-[1.625rem]">
            Iniciación a la astrología psicológica
          </p>
          <p className="mb-2 text-base text-white/85 md:text-lg">
            Online y en directo · {EDICION.semanas} sábados desde el {EDICION.inicio} · Sin conocimientos previos
          </p>
          <p className="mb-3 font-lato text-xl font-semibold leading-tight text-white md:text-2xl">
            Apertura de inscripciones en diciembre
          </p>
          <div className="flex flex-col items-center justify-center gap-2.5">
            <Link
              href="/curso-carta-natal#preinscripcion"
              className="inline-block rounded-lg bg-white px-10 py-3 font-lora text-lg font-semibold text-primary shadow-md transition-all hover:bg-accent hover:text-white"
            >
              Apúntame a la lista
            </Link>
            <Link
              href="/curso-carta-natal"
              className="text-base text-white/85 underline decoration-white/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white md:text-lg"
            >
              Quiero saber más →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
