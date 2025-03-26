import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-8">Sobre Mí</h1>

            <div className="relative h-[400px] rounded-lg overflow-hidden mb-10">
              <Image src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1742253022/IMG_9559_vsqupe.jpg" alt="Foto de perfil" fill className="object-cover" />
            </div>

            <div className="prose prose-lg max-w-none">
              <p>
                Soy una astróloga psicológica apasionada por ayudar a las personas a descubrir su potencial interior a
                través de la sabiduría de los astros. Mi enfoque combina la astrología tradicional con la psicología
                junguiana para ofrecer una perspectiva profunda y transformadora.
              </p>

              <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">Mi Trayectoria</h2>
              <p>
                Mi camino en la astrología comenzó hace más de 10 años, cuando descubrí cómo esta antigua disciplina
                podía ofrecer una comprensión profunda de la psique humana. Desde entonces, he dedicado mi vida a
                estudiar y practicar la astrología psicológica, formándome con reconocidos astrólogos internacionales.
              </p>
              <p>
                Soy licenciada en Psicología por la Universidad de Barcelona y tengo un máster en Psicología Analítica
                Junguiana. He complementado mi formación con estudios especializados en astrología psicológica,
                astrología evolutiva y técnicas de coaching transformacional.
              </p>

              <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">Mi Enfoque</h2>
              <p>
                Mi aproximación a la astrología es integradora y orientada al crecimiento personal. No creo en la
                astrología determinista que te dice "lo que va a pasar", sino en aquella que te ayuda a comprender tus
                patrones, desafíos y potenciales para que puedas tomar decisiones conscientes.
              </p>
              <p>
                En mis sesiones, utilizo la carta natal como un mapa de tu psique, revelando tus dones innatos, desafíos
                evolutivos y propósito de vida. Mi objetivo es empoderarte con autoconocimiento y herramientas prácticas
                para navegar tu camino con mayor conciencia y autenticidad.
              </p>

              <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">Filosofía</h2>
              <p>
                Creo firmemente que cada persona tiene un propósito único y dones especiales para compartir con el
                mundo. La astrología psicológica es una poderosa herramienta para descubrir y alinear tu vida con ese
                propósito, permitiéndote vivir con mayor autenticidad y plenitud.
              </p>
              <p>
                Mi compromiso es crear un espacio seguro y de confianza donde puedas explorar tu universo interior,
                hacer las paces con tu sombra y abrazar todo tu potencial.
              </p>

              <div className="mt-10 text-center">
                <Link href="/contacto" className="btn-primary inline-block">
                  Contáctame
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

