export const dynamic = 'force-dynamic'

import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import TestimonialsSection from "@/components/testimonials-section"
import BlogSection from "@/components/blog-section"
//import ContactForm from "@/components/contact-form"
import NewsletterSection from "@/components/newsletter-section"
import ContactSection from "@/components/contact-section"
import FeaturedProductsSection from "@/components/featuredproducts-section"


export default function Home() {
  return (
    <>


  
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
      
      <BlogSection />
      <FeaturedProductsSection />
      <ContactSection />
      <NewsletterSection />
    </>
  )
}

