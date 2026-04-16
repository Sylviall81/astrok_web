import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: "url('https://res.cloudinary.com/dgtuiirc7/image/upload/v1742986392/stars-472968_1280_cphcfr.jpg')" }}>

      <div className="absolute inset-0 bg-sri-yantra-pattern opacity-5 z-0"></div>
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-lato font-bold text-stone-200 mb-6 leading-tight">
              Explora tu universo interior gracias a la Astrología Psicológica.
              </h1>
              <p className="text-xl md:text-2xl text-secondary mb-10 font-lora">
                Te acompaño a (re)conocerte, ganar claridad y vivir con propósito.
              </p>
              <Link href="/servicios" className="btn-primary text-lg px-8 py-4">
                Encuentra tu sesión ideal
          </Link>
        </div>
      </div>
    </section>
  )
}

