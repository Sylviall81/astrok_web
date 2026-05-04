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
    Soy Sylvia, astróloga psicológica con más de 10 años acompañando procesos de autoconocimiento. 
    Combino astrología humanista y evolutiva con herramientas de integración cuerpo-emoción-simbolismo 
    para que descubras tu mapa interior y navegues tus tránsitos con claridad y confianza.
  </p>

  <p>
    Pero más que la formación, lo que me define es cómo entiendo este trabajo: no soy quien tiene 
    las respuestas. Soy quien te acompaña a encontrar las tuyas.
  </p>

  <p>
    Lo que traigo a cada sesión es presencia, escucha y una mirada sin juicio. El respeto profundo 
    por cada persona que se abre, que comparte algo íntimo, que confía. La convicción de que nadie 
    sabe más que tú lo que necesitas — yo solo puedo ofrecerte mis propios aprendizajes de camino, 
    con la esperanza de que te ayuden a encontrar tu propio norte.
  </p>

  <p>
    La astrología, para mí, no es sobre predecir ni etiquetar. Utilizo la carta natal como un mapa 
    de tu psique — un espejo que revela tus dones innatos, tus desafíos evolutivos y tu propósito 
    de vida. Un lenguaje simbólico que puede darte claridad, validar lo que ya sentías y darte valor 
    para emprender tus decisiones con más conciencia y autenticidad.
  </p>

  <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">Mi Enfoque</h2>
  <ul>
    <li>Astrología como espejo de tu psique, no predictiva ni determinista</li>
    <li>Integración cuerpo, emoción y simbolismo</li>
    <li>Perspectiva de género y mirada inclusiva</li>
    <li>Atención informada al trauma</li>
    <li>Espacio seguro para tus luces y tus sombras</li>
    <li>Herramientas prácticas para tu día a día</li>
  </ul>

  <p>
    Lo más importante no está en ningún diploma: está en saber que nadie es más que nadie, y que 
    acompañar bien significa hacer red, darse apoyo y mirada — y confiar en que eso puede sanar.
  </p>

  <h2 className="text-2xl font-lato font-semibold text-primary mt-8 mb-4">Formación</h2>
  <ul>
    <li>Astrología Psicológica · Geocosmos Barcelona (Lluís Gisbert)</li>
    <li>Cosmograma · Aleix Mercadé</li>
    <li>Astro-Terapéutica · Pablo Flores Laymuns</li>
    <li>Técnica Gestalt · La Silla Vacía</li>
    <li>Barro y Arte Ritual · Slow Art BCN (Anaïs Pineda Ruegg)</li>
    <li>Somatic Experience · formación introductoria en curso</li>
  </ul>

  <p>
    ¿List@ para explorar tu mapa astrológico?
  </p>
</div>

              <div className="mt-10 text-center">
                <Link href="/servicios" className="btn-primary inline-block">
                  Reserva tu sesión
                </Link>
              </div>
            </div>
          </div>
      </section>
    </>
  )
}

