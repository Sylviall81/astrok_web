"use client"

import { useState, useEffect, useRef } from "react";
import ServiceCard from "./service-card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getServices } from '@/lib/services';
import { Service } from '@/data/services';  // Importa la interfaz Service

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]); //  Especificamos el tipo correctamente
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const data = await getServices();
      setServices(data); // Ahora TypeScript sabe que es un array de Service
      setLoading(false);
    }
    fetchServices();
  }, []);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth } = sliderRef.current;
      const scrollAmount = clientWidth * 0.8;
      const maxScroll = scrollWidth - clientWidth;

      const newPosition =
        direction === "right"
          ? Math.min(scrollPosition + scrollAmount, maxScroll)
          : Math.max(scrollPosition - scrollAmount, 0);

      sliderRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setScrollPosition(newPosition);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Servicios Destacados</h2>
          <p className="section-subtitle mx-auto">
            Descubre cómo la astrología psicológica puede ayudarte a comprender mejor tu camino y potencial.
          </p>
        </div>

        {loading ? (
          <p className="text-center">Cargando servicios...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                title={service.title}
                description={service.description}
                image={service.image}
                slug={service.slug}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
