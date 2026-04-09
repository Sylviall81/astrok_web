import ContactForm from "@/components/contact-form"
import ContactItem from  "@/components/contact-item"
import { Mail, Clock, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-8 text-center">Contacto</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-body mb-6">
                ¿Tienes alguna pregunta o quieres agendar una sesión? Escríbeme y te responderé lo antes posible.
              </p>
              <p className="text-body mb-6">
                También puedes contactarme directamente a través de WhatsApp o redes sociales.
              </p>

              <div className="card-soft p-6 rounded-lg mb-8">
                <h3 className="text-xl font-lato font-semibold text-primary mb-3">
                  Información de contacto
                </h3>

          <div className="space-y-3">

            <ContactItem
              href="mailto: kaleidoscopebcn@gmail.com"
              icon={<Mail className="w-5 h-5" />}
              className="text-body hover:text-primary"
            >
              kaleidoscopebcn@gmail.com
            </ContactItem>

            <ContactItem
              href="https://wa.me/34628840747"
              icon={<Phone className="w-5 h-5" />}
              className="text-body hover:text-primary"
              external
            >
              WhatsApp: +34 628 840 747
            </ContactItem>

            {/* Esto NO es link → no usar ContactItem */}
            <div className="flex items-center gap-2 text-body">
              <Clock className="w-5 h-5" />
              Horario: Lunes a Viernes, 10:00 - 18:00
            </div>

    </div>
  </div>

              <div className="card-soft p-6 rounded-lg">
                <h3 className="text-xl font-lato font-semibold text-primary mb-3">Preguntas frecuentes</h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-lato font-semibold text-primary mb-1">¿Cómo se realizan las sesiones?</h4>
                    <p className="text-sm text-body">
                      Las sesiones se realizan por videollamada (Zoom) o presencialmente en Barcelona, según tu
                      preferencia y ubicación.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-lato font-semibold text-primary mb-1">
                      ¿Necesito conocer mi hora exacta de nacimiento?
                    </h4>
                    <p className="text-sm text-body">
                      Sí, para la carta natal y otros análisis astrológicos precisos es necesario conocer la fecha, hora
                      y lugar exactos de nacimiento.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-lato font-semibold text-primary mb-1">
                      ¿Cuánto tiempo debo esperar para recibir respuesta?
                    </h4>
                    <p className="text-sm text-body">
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

