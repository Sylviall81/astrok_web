import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: "url('https://res.cloudinary.com/dgtuiirc7/image/upload/f_auto,q_auto,w_2000/v1792510634/copy_of_stocksnap-stars-2616537_wftmfa.jpg')" }}>

      <div className="absolute inset-0 bg-sri-yantra-pattern bg-no-repeat bg-center bg-contain z-0"></div>
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-lato font-bold text-white mb-6 leading-tight">
              Explora tu universo interior gracias a la Astrología Psicológica.
              </h1>
              <p className="text-xl md:text-2xl text-white/85 mb-10 font-lato not-italic">
                Te acompaño a (re)conocerte, ganar claridad y vivir con propósito.
              </p>
              <Link href="/servicios" className="inline-block bg-white text-primary rounded-md font-lora font-semibold transition-all hover:bg-accent hover:text-white text-lg px-8 py-4">
                Encuentra tu sesión ideal
          </Link>
        </div>
      </div>
    </section>
  )
}

