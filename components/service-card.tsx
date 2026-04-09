import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export default function ServiceCard({ title, description, image, slug }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
       <Link 
          href={`/servicios/${slug}`}
          className="relative block h-48 bg-muted"
      >
      <div className="relative h-48 w-full">
  
        <Image 
          src={image || "/placeholder.svg"} 
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      </Link>
      <div className="p-6">
         <Link 
          href={`/servicios/${slug}`}
          //className="inline-flex items-center text-sm font-medium text-primary hover:text-accent"
      >
        <h3 className="text-xl font-lato font-semibold text-primary mb-2">{title}</h3>
        </Link>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <Link 
          href={`/servicios/${slug}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-accent"
        >
          Ver más detalles
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}