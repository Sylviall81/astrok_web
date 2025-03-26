"use client"

import { useState, useEffect } from "react"
import TestimonialCard from "./testimonial-card"
import {testimonials} from "@/data/testimonials"



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

