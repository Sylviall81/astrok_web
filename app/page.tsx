export const dynamic = 'force-dynamic'

import type { Metadata } from "next"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import TestimonialsSection from "@/components/testimonials-section"
import BlogSection from "@/components/blog-section"
import NewsletterSection from "@/components/newsletter-section"
import ContactSection from "@/components/contact-section"
import FeaturedProductsSection from "@/components/featuredproducts-section"

// Sin esto, Google marca como "duplicada, sin canónica indicada" cualquier
// variante de la home con query string (ej. /?wc-ajax=%%endpoint%%, un
// residuo de WooCommerce de antes de que el sitio fuera headless, o
// /?utm_source=...). metadataBase ya está declarado en app/layout.tsx.
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      <FeaturedProductsSection />
      <BlogSection />
      <ContactSection />
      <NewsletterSection />
    </>
  )
}

