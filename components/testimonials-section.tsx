"use client"

import { useState, useEffect } from "react"
import TestimonialCard from "./testimonial-card"

const testimonials = [
  {
    name: "Laura Martínez",
    text: "La lectura de mi carta natal fue reveladora. Me ayudó a comprender patrones que he repetido durante años y a encontrar claridad sobre mi propósito.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    text: "La sinastría que hicimos mi pareja y yo nos dio herramientas para mejorar nuestra comunicación y entender nuestras diferencias desde una nueva perspectiva.",
    rating: 5,
  },
  {
    name: "Ana García",
    text: "El análisis de mi revolución solar me preparó para afrontar los retos del año con una nueva actitud. Muy recomendable para momentos de transición.",
    rating: 4,
  },
  {
    name: "Miguel Sánchez",
    text: "Increíble la precisión con la que describió aspectos de mi personalidad que ni yo mismo había reconocido. Una experiencia transformadora.",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-neutral-light">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Lo que dicen mis clientes</h2>
          <p className="section-subtitle mx-auto">
            Experiencias de personas que han encontrado claridad y dirección a través de la astrología psicológica.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard name={testimonial.name} text={testimonial.text} rating={testimonial.rating} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? "bg-primary" : "bg-gray-300"}`}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

