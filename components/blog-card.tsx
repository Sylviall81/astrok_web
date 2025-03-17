import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import ShareButtons from "./share-buttons"

interface BlogCardProps {
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  slug: string
  showShareButtons?: boolean
}

export default function BlogCard({
  title,
  excerpt,
  image,
  date,
  readTime,
  slug,
  showShareButtons = false,
}: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-lato font-semibold text-primary mb-3">{title}</h3>
        <p className="text-neutral-dark mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center justify-between">
          <Link
            href={`/blog/${slug}`}
            className="text-primary font-lato font-semibold hover:text-accent transition-colors"
          >
            Leer más →
          </Link>

          {showShareButtons && <ShareButtons url={`https://kaleidoscope.com/blog/${slug}`} title={title} />}
        </div>
      </div>
    </div>
  )
}

