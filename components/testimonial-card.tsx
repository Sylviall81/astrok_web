import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  text: string
  image?: string
  rating: number
}

export default function TestimonialCard({ name, text, image, rating }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image src={image || "https://res.cloudinary.com/dgtuiirc7/image/upload/v1743017765/profile_bcarey.webp"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-lato font-semibold text-primary">{name}</h4>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
            ))}
          </div>
        </div>
      </div>
      <p className="text-neutral-dark">{text}</p>
    </div>
  )
}

