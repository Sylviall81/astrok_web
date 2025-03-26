import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1742252908/IMG_9530_inqgle.jpg" alt="Foto de perfil" fill className="object-cover" />

          </div>

          <div>
            <h2 className="section-title">Sobre Mí</h2>
            <h2 className="section-subtitle"> Soy Sylvia, bienvenid@ a mi web</h2>
            <p className="text-neutral-dark mb-6">
              Utilizo la Astrología Psicológica como principal herramienta para el autoconocimiento, la aceptación y desarrollo de 
              una personalidad mas integrada y plena.
              
              En mis sesiones, la Carta Natal es la guía hacia el re-encuentro con emociones y necesidades silenciadas, personajes internos 
              largamente ignorados y, al mismo tiempo, una ventana hacia el descubrimiento de nuevos talentos y capacidades creativas. 
              
              Con más de 7 años de experiencia traduciendo el lenguaje de las estrellas, 
              he acompañado a mas de XX personas a transitar momentos de cambio e incertidumbre, guiandolos a re-conectar con su fortaleza interna,
              su confianza y sabiduría interior.
              
              
            </p>
            <p className="text-neutral-dark mb-8">
              Con más de 7 años de experiencia, he guiado a cientos de personas en su viaje de autodescubrimiento,
              ayudándoles a comprender sus patrones, desafíos y dones únicos reflejados en su carta natal.
            </p>
            <Link href="/sobre-mi" className="btn-secondary">
              Conoce más sobre mi enfoque
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

