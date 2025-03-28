'use client'

import Link from "next/link"
import ServiceCard from "@/components/service-card"
import { useState, useEffect } from "react";
import { getServices } from '@/lib/services';
import { Service } from '@/data/services';  // Importa la interfaz Service



export default function ServicesPage() {

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



  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">

        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-lato font-bold text-primary mb-6">Servicios</h1>
          <p className="text-xl text-secondary">
            Descubre cómo la astrología psicológica puede ayudarte a comprender mejor tu camino y potencial.
          </p>
        </div>

        {loading ? (
  <p className="text-center">Cargando servicios...</p>
) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.slug} className="flex flex-col h-full">
              <ServiceCard
                title={service.title}
                description={service.description}
                image={service.image}
                slug={service.slug}
              />
              <div className="mt-4 text-center">
                <p className="text-lg font-lato font-semibold text-primary">{service.price}</p>
              </div>
            </div>
          ))}
        </div>)}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-lato font-semibold text-primary mb-6">¿No encuentras lo que buscas?</h2>
          <p className="text-neutral-dark mb-8 max-w-2xl mx-auto">
            Si necesitas un servicio personalizado o tienes alguna consulta específica, no dudes en contactarme. Podemos
            diseñar una sesión adaptada a tus necesidades.
          </p>
          <Link href="/contacto" className="btn-primary">
            Contáctame
          </Link>
        </div>
        
      </div>
    </section>
  )
}

