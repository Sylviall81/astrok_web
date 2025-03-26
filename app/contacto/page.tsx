import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-8 text-center">Contacto</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-neutral-dark mb-6">
                ¿Tienes alguna pregunta o quieres agendar una sesión? Escríbeme y te responderé lo antes posible.
              </p>
              <p className="text-neutral-dark mb-6">
                También puedes contactarme directamente a través de WhatsApp o redes sociales.
              </p>

              <div className="bg-neutral-light p-6 rounded-lg mb-8">
                <h3 className="text-xl font-lato font-semibold text-primary mb-3">Información de contacto</h3>
                <p className="text-neutral-dark mb-2">Email: info@kaleidoscope.com</p>
                <a href="https://wa.me/+34628840747"><p className="text-neutral-dark mb-2">WhatsApp: +34 628 840 747</p></a>
                <p className="text-neutral-dark">Horario de atención: Lunes a Viernes, 10:00 - 18:00</p>
              </div>

              <div className="bg-neutral-light p-6 rounded-lg">
                <h3 className="text-xl font-lato font-semibold text-primary mb-3">Preguntas frecuentes</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-lato font-semibold text-primary mb-1">¿Cómo se realizan las sesiones?</h4>
                    <p className="text-sm text-neutral-dark">
                      Las sesiones se realizan por videollamada (Zoom) o presencialmente en Barcelona, según tu
                      preferencia y ubicación.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-lato font-semibold text-primary mb-1">
                      ¿Necesito conocer mi hora exacta de nacimiento?
                    </h4>
                    <p className="text-sm text-neutral-dark">
                      Sí, para la carta natal y otros análisis astrológicos precisos es necesario conocer la fecha, hora
                      y lugar exactos de nacimiento.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-lato font-semibold text-primary mb-1">
                      ¿Cuánto tiempo debo esperar para recibir respuesta?
                    </h4>
                    <p className="text-sm text-neutral-dark">
                      Normalmente respondo en un plazo de 24-48 horas laborables.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

