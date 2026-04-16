//app/blog/[slug]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock } from "lucide-react"
import ShareButtons from "@/components/share-buttons"
import { getFullPostBySlug, getAllPostSlugs, formatDate, readingTime } from "@/lib/wordpress"
import { generateTOC } from "@/lib/toc"
import TableOfContents from "@/components/table-contents"

export const revalidate = 10

// Genera las rutas estáticas para todos los posts publicados
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Genera los metadatos SEO del post (título y meta description desde Rank Math)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = await getFullPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.rank_math_title || post.title.rendered,
    description: post.rank_math_description || post.excerpt.rendered.replace(/<[^>]+>/g, ""),
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
      images: post.featuredImageUrl ? [{ url: post.featuredImageUrl }] : [],
    },
  }
}



export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = await getFullPostBySlug(slug)

  if (!post) notFound()

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || ""

  const { headings, html } = generateTOC(post.content.rendered)
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">

          {/* Categorías */}
          {post.categoriesData.length > 0 && (
            <div className="flex gap-2 mb-4">
              {post.categoriesData.map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs font-medium uppercase tracking-wide text-secondary border border-secondary/30 rounded-full px-3 py-1"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-lato font-bold text-primary mb-6">
            {post.title.rendered}
          </h1>

          <div className="flex items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{readingTime(post.content.rendered)}</span>
            </div>
          </div>

          {/* Imagen destacada */}
          {post.featuredImageUrl ? (
            <div className="relative h-[700px] rounded-lg overflow-hidden mb-8">
              <Image
                src={post.featuredImageUrl}
                alt={post.title.rendered}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
          ) : (
            <div className="relative h-[700px] rounded-lg overflow-hidden mb-8 bg-gray-100" >
             <Image
                src={post.featuredImageUrl ?? "/placeholder.svg?height=300&width=400"}
                alt={post.title.rendered}
                fill
                className="object-cover"
                priority
              />
              </div>
          )}

          <div className="flex justify-end mb-8">
            <ShareButtons
              url={`${appUrl}/blog/${slug}`} // 👈 importante también aquí
              title={post.title.rendered}
            />
          </div>


          {/* Tabla de contenidos */}
          
         <div  className="sticky prose prose-lg max-w-none">
           <TableOfContents headings={headings} /></div>

          {/* Contenido del post */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: html}}
          />

          {/* Tags */}
          {post.tagsData.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8">
              {post.tagsData.map((tag) => (
                <span
                  key={tag.id}
                  className="text-xs text-secondary bg-gray-100 rounded-full px-3 py-1"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="border-t border-gray-200 mt-12 pt-8">
            <h3 className="text-xl font-lato font-semibold text-primary mb-4">
              ¿Te ha gustado este artículo o te ha resultado útil?
            </h3>
            <p className="mb-6">
              Si quieres profundizar mas sobre este u otros temas decídete a agendar una sesión personalizada donde 
              despejaré todas tus dudas y exploraremos juntas tu carta natal. 
            </p>
            <Link href="/agenda" className="btn-primary">
              Agenda tu sesión
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
