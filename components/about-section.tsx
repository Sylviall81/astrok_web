import Image from "next/image"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=500&width=500" alt="Foto de perfil" fill className="object-cover" />
          </div>

          <div>
            <h2 className="section-title">Sobre Mí</h2>
            <p className="text-neutral-dark mb-6">
              Soy una astróloga psicológica apasionada por ayudar a las personas a descubrir su potencial interior a
              través de la sabiduría de los astros. Mi enfoque combina la astrología tradicional con la psicología
              junguiana para ofrecer una perspectiva profunda y transformadora.
            </p>
            <p className="text-neutral-dark mb-8">
              Con más de 5 años de experiencia, he guiado a cientos de personas en su viaje de autodescubrimiento,
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

