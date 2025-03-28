'use client'

import { useState, useEffect, useRef } from "react";
import ServiceCard from "./service-card";
import { serverSupabase } from "@/lib/supabase"
import { ProductList } from "@/app/tienda/product-list"
import type { Product } from "@/lib/supabase"
import { ProductCard } from "@/components/ui/product-card"
import { ChevronLeft, ChevronRight } from "lucide-react";// Importa la interfaz Service

import getProducts from "@/lib/products"



export default function ServicesSection() {

 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(products);
 

 
//quizas aqui puedes usar ProductList
const featuredServices = products.slice(0, 3);  // Toma los 3 primeros
const otherServices = products.slice(3); // Toma los restantes

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
  <>

<ProductList products={products} />
    {/* Servicios principales */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {featuredServices.map((product) => (
        <ServiceCard
          key={product.slug}
          title={product.name}
          description={product.description}
          image={product.image_url}
          slug={service.slug}
        />
      ))}
    </div>

    {/* Slider con otros productos */}
    <div className="mb-4">
      <h3 className="text-2xl font-lato font-semibold text-primary mb-6">Otros Productos</h3>
    </div>

    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md text-primary hover:text-accent transition-colors"
        aria-label="Anterior"
        disabled={scrollPosition === 0}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {otherServices.map((product) => (
          <div key={product.slug} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <ServiceCard
              title={product.title}
              description={product.description}
              image={product.image}
              slug={product.slug}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md text-primary hover:text-accent transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  </>
)}  {/* <-- Aquí cerramos correctamente el bloque */}

        
      </div>
    </section>)
  
}
