import ContactForm from "./contact-form"
import { Phone, Mail } from "lucide-react"
import ContactItem from "./common/contact-item"
import SocialLinks from "./common/social-links"




export default function ContactSection() {
  return (

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title">Contacto</h2>
              <p className="text-body mb-6">
                ¿Tienes alguna pregunta o quieres agendar una sesión? Escríbeme y te responderé lo antes posible.
              </p>
              <p className="text-body mb-6">
                También puedes contactarme directamente a través de WhatsApp o redes sociales.
              </p>
              <h3 className="text-xl font-lato font-semibold text-primary mb-3">
                    Información de contacto
              </h3>

              <div className="space-y-3">
                      <ContactItem
                        href="mailto:kaleidoscopebcn@gmail.com"
                        icon={<Mail className="w-5 h-5" />}
                        className="text-body hover:text-primary"
                      >
                        kaleidoscopebcn@gmail.com
                      </ContactItem>

                      <ContactItem
                        href="https://wa.me/34628840747"
                        icon={<Phone className="w-5 h-5" />}
                        className="text-primary font-semibold hover:text-accent"
                        external
                      >
                        WhatsApp: +34 628 840 747
                      </ContactItem>
              </div>
           
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-primary mb-2">
                  Sígueme
                </h4>
                <SocialLinks />


  
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

  )
}