import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-sri-yantra-pattern opacity-5 z-0"></div>
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-lato font-bold text-primary mb-6 leading-tight">
            Explora tu universo interior a través de la astrología psicológica
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-10 font-lora">
            Autodescubrimiento, integración y claridad a través de la astrología junguiana.
          </p>
          <Link href="/agenda" className="btn-primary text-lg px-8 py-4">
            Agenda tu sesión
          </Link>
        </div>
      </div>
    </section>
  )
}

