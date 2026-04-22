import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1742252908/IMG_9530_inqgle.jpg" alt="Foto de perfil" fill className="object-cover" />

          </div>

          <div>
            <h2 className="section-title">Sobre Mí</h2>
            
            <h3 className="section-subtitle"> Soy Sylvia Ll., astróloga psicológica.</h3>
            
            <p className="text-body mb-6">
            Traduzco el lenguaje de las estrellas para que leas tu mapa interior con claridad.
            </p>
            <p className="text-body mb-6">
               No doy respuestas cerradas. Te entrego herramientas para navegar tus tránsitos, patrones y dones con confianza.
            </p>
            <p className="text-body mb-8">
            Durante más de 10 años de experiencia, he orientado a cientos de personas en su camino de autodescubrimiento.
            </p>
            <p className="text-body mb-8">
              Quieres saber más?
            </p>
            <Link href="/sobre-mi" className="btn-secondary">
              Conoceme mejor
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

