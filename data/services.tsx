export interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    slug: string;
    price: string;

  }





// Datos de ejemplo para los servicios principales

export const mainServices: Service[] = [
 
    {

        id: "01",
        title: "Carta Natal",
        description: "Un análisis profundo de tu mapa natal que revela tus potenciales, desafíos y propósito de vida.",
        image: "https://res.cloudinary.com/dgtuiirc7/image/upload/v1743008690/2_a4xfny.png",
        slug: "carta-natal",
        price: "140€",
      },
    {
        id: "02",
        title: "Revolución Solar",
      description: "Descubre las energías y oportunidades que te acompañarán durante tu próximo año solar.",
      image: "https://res.cloudinary.com/dgtuiirc7/image/upload/v1743008691/3_xzp1pc.png",
      slug: "revolucion-solar",
      price: "110€",
    },

    {
        id: "03",
        title: "Pack Integral",
        description: "Combinación de carta natal y revolución solar para una visión completa de tu momento actual.",
        image: "https://res.cloudinary.com/dgtuiirc7/image/upload/v1743008687/6_uwymgy.png",
        slug: "pack-integral",
        price: "170€",
      },
    
    {
        id: "04",
        title: "Sinastría",
      description: "Análisis de compatibilidad que explora la dinámica entre dos personas a nivel astrológico.",
      image: "https://res.cloudinary.com/dgtuiirc7/image/upload/v1743008686/5_iupav5.png",
      slug: "sinastria",
      price: "120€",
    },
    
      {
        id: "05",
        title: "Astro-Report",
        description: "Informe astrológico detallado en formato PDF con interpretaciones personalizadas.",
        image: "https://res.cloudinary.com/dgtuiirc7/image/upload/v1743008686/4_msaduw.png",
        slug: "astro-report",
        price: "85€",
      },
    //   {
    //     id: "06",
    //     title: "Tránsitos Anuales",
    //     description: "Análisis de los movimientos planetarios y su influencia en tu vida durante todo el año.",
    //     image: "/placeholder.svg?height=300&width=400",
    //     slug: "transitos-anuales",
    //   },
      {
        id: "08",
        title: "Carta Natal Infantil",
        description: "Sesión enfocada en un área específica: relaciones, carrera, propósito de vida, etc.",
        image: "https://res.cloudinary.com/dgtuiirc7/image/upload/v1743014929/Portadas_web_tq8opq.png",
        slug: "carta-infantil",
        price: "130€",
      },
      {
        id: "08",
        title: "Cursos y clases",
        description: "Sesión enfocada en un área específica: relaciones, carrera, propósito de vida, etc.",
        image: "https://res.cloudinary.com/dgtuiirc7/image/upload/v1743014929/Portadas_web8_ax0oe7.png",
        slug: "cursos",
        price: "120€",
      },
      
  ]