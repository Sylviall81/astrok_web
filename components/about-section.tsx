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
            
            <h3 className="section-subtitle"> Soy Sylvia y te doy la bienvenida a mi web,</h3>
            
            <p className="text-neutral-dark mb-6">
            Mi trabajo como astróloga es traducir el lenguaje simbólico de las estrellas para acompañarte en la comprensión de tu propia historia. 
            No entrego respuestas cerradas, ni certezas absolutas, sino herramientas para que explores tu camino con mayor claridad.   
            </p>
            <p className="text-neutral-dark mb-6">
            Desde una mirada informada en astrología y psicología, te impulso a conectar con tu fuerza y resiliencia, sin discursos condescendientes ni fórmulas prefabricadas. Cada carta natal es única, como cada proceso personal.
            </p>
            <p className="text-neutral-dark mb-8">
            Durante más de 7 años de experiencia, he orientado a cientos de personas en su camino de autodescubrimiento, facilitando la comprensión de sus patrones, desafíos y dones únicos reflejados en su mapa natal.
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

