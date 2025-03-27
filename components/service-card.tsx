import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  image: string
  slug: string
}

export default function ServiceCard({ title, description, image, slug }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px]">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-lato font-semibold text-primary mb-3">{title}</h3>
        <p className="text-neutral-dark mb-4 line-clamp-3">{description}</p>
        <Link
          href={`/servicios/${slug}`}
          className="text-primary font-lato font-semibold hover:text-accent transition-colors"
        >
          Saber más →
        </Link>
        <Button onClick={() => onAddToCart(product)} className="w-full bg-primary hover:bg-primary/90">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Añadir al carrito
                </Button>


      </div>
    </div>
  )
}

