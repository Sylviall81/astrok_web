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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full">
      <Link href={`/servicios/${slug}`} className="relative block h-48 bg-muted flex-shrink-0">
        <div className="relative h-48 w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/servicios/${slug}`}>
          <h3 className="text-base font-lato font-semibold text-primary mb-2">{title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{description}</p>
        <Link
          href={`/servicios/${slug}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-accent mt-auto"
        >
          Ver más detalles
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}