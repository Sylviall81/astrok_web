import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre mí | Kaleidoscope Astrología",
  description:
    "Sylvia Llorente, astróloga psicológica con +10 años en acompañamiento evolutivo. Conoce mi enfoque y formación.",
}

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
                Soy Sylvia, astróloga psicológica con +10 años acompañando procesos de autoconocimiento.
                Combino astrología humanista evolutiva y herramientas corporales para que descubras tu mapa interior y navegues tus tránsitos con claridad y confianza.
              </p>

              <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">Mi Trayectoria</h2>
              <p>
                Mi camino en la astrología comenzó hace más de 10 años, cuando descubrí cómo esta antigua disciplina
                podía ofrecer una comprensión profunda de la psique humana. Desde entonces, he dedicado mi vida a
                estudiar y practicar la astrología psicológica, formándome con reconocidos profesionales de esta disciplina.
              </p>

              <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">Mi Enfoque</h2>
              <ul>
                <li>Astrología como espejo de tu psique (no predictiva ni determinista)</li>
                <li>Integración cuerpo-emoción-simbolismo</li>
                <li>Perspectiva de género y cuidado informado del trauma </li>
                <li>Espacio seguro para tus luces y sombras</li>
                <li>Herramientas prácticas para tu día a día</li>
                
              </ul>
              <p>
                En mis sesiones, utilizo la carta natal como un mapa de tu psique, revelando tus dones innatos, desafíos
                evolutivos y propósito de vida. Mi objetivo es empoderarte con autoconocimiento y herramientas prácticas
                para navegar tu camino con mayor conciencia y autenticidad.
              </p>

              <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">Formación</h2>
           
              <ul>
                <li>Introductorio somatic experience (Bcna)</li> 
                <li>Astro-Terapéutica (Pablo Flores Laymuns)</li>
                <li>Geocosmos Barcelona (Lluís Gisbert) </li>
                <li>Cosmograma (Aleix Mercadé)</li>
                <li>Barro y Arte Ritual (Anais Pineda Ruegg - Slow Art Bcn)</li>
                <li>Curso de Técnica Gestalt (La silla vacía)</li>
                <li>PhD Ciencias Políticas (USC Santiago)</li>
              </ul>
              <p>
                ¿List@ para explorar tu mapa astrológico? 
              </p>

              <div className="mt-10 text-center">
                <Link href="/servicios" className="btn-primary inline-block">
                  Reserva tu sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

