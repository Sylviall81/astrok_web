import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import TestimonialsSection from "@/components/testimonials-section"
import BlogSection from "@/components/blog-section"
import ContactForm from "@/components/contact-form"
import NewsletterSection from "@/components/newsletter-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <BlogSection />

      {/* Sección de contacto */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title">Contacto</h2>
              <p className="text-neutral-dark mb-6">
                ¿Tienes alguna pregunta o quieres agendar una sesión? Escríbeme y te responderé lo antes posible.
              </p>
              <p className="text-neutral-dark mb-6">
                También puedes contactarme directamente a través de WhatsApp o redes sociales.
              </p>
              <div className="bg-neutral-light p-6 rounded-lg">
                <h3 className="text-xl font-lato font-semibold text-primary mb-3">Información de contacto</h3>
                <p className="text-neutral-dark mb-2">Email: info@kaleidoscope.com</p>
                <p className="text-neutral-dark">WhatsApp: +34 123 456 789</p>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  )
}

