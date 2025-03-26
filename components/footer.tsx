import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-neutral-light py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            
            <Image src="https://res.cloudinary.com/dgtuiirc7/image/upload/v1742251136/logonegro_snez0h.png" alt= "website black and white logo" width={400} height={25}/>
            <p className="text-neutral-dark mb-4 max-w-md">
            Astrología psicológica como guía para el autodescubrimiento, la claridad y el propósito.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/kaleidoscopebcn/#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/Kaleidoscopebcn/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              {/*<a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>*/}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-lato font-semibold text-primary mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-dark hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-neutral-dark hover:text-primary transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/sobre-mi" className="text-neutral-dark hover:text-primary transition-colors">
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-dark hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-neutral-dark hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-lato font-semibold text-primary mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-neutral-dark">Email: kaleidoscopebcn@gmail.com</li>
              <li className="text-neutral-dark">WhatsApp: +34 628 840 747</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-neutral-dark">
            &copy; {new Date().getFullYear()} Kaleidoscope. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

