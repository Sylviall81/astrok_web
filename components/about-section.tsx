import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1777997689/nuevaHome_zrevys.png" alt="Foto de perfil" fill className="object-cover" />

          </div>

          <div>
            <h2 className="section-title">Sobre Mí</h2>
            
            <h3 className="section-subtitle"> Soy Sylvia, astróloga, investigadora, migrante y neurodivergente.</h3>

             <p className="text-body mb-8">
            Durante más de 10 años, he acompañado a cientos de personas en su camino de autodescubrimiento.
            </p>
            <p className="text-body mb-6">
              Traduzco el lenguaje de las estrellas para que leas tu mapa interior con claridad — no para predecir tu vida, sino para que la vivas con conciencia, autenticidad y aceptación.
              No tengo las respuestas. Te acompaño a encontrar las tuyas.
            </p>
            
           
            <p className="text-body mb-8">
              ¿Quieres saber más?
            </p>
            <Link href="/sobre-mi" className="btn-secondary">
              Conóceme mejor
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

