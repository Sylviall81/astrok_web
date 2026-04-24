import Link from "next/link"
import Image from "next/image"
import { Phone, Mail } from "lucide-react"
import ContactItem from "@/components/common/contact-item"
import SocialLinks from "@/components/common/social-links"
//import { useTheme } from "next-themes"

export function Footer() {
   //const { theme, setTheme } = useTheme()

   return (
    <footer className="section-alt py-12">
      <div className="containermax-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 md:gap-12">
          <div className="col-span-1 md:col-span-1">
            <Image
                        src=  'https://res.cloudinary.com/dgtuiirc7/image/upload/v1742251136/logonegro_snez0h.png'
                        alt="Logotipo Kaleidoscope"
                        width={400}
                        height={200}
                        className="h-10 w-auto"
                      />
            <p className="text-body mb-4 max-w-md">
              Astrología psicológica como guía para el autodescubrimiento, la claridad y el propósito.
            </p>
            <div className="flex space-x-4">
              <SocialLinks className="mt-4" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-lato font-semibold text-primary mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-body hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-body hover:text-primary transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/sobre-mi" className="text-body hover:text-primary transition-colors">
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-body hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-body hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-lato font-semibold text-primary mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/politica-privacidad" className="text-body hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/politica-cookies" className="text-body hover:text-primary transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/aviso-legal" className="text-body hover:text-primary transition-colors">
                  Aviso Legal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-lato font-semibold text-primary mb-4">Contacto</h4>
            
            <ul className="space-y-2">
              <li>
                <ContactItem
                  href="mailto:hola@astrokaleido.com"
                  icon={<Mail className="w-4 h-4" />}
                  className="text-body hover:text-primary"
                >
                  hola@astrokaleido.com 
                </ContactItem>
              </li>

              <li>
                <ContactItem
                  href="https://wa.me/34628840747"
                  icon={<Phone className="w-4 h-4" />}
                  className="text-body hover:text-primary"
                  external
                >
                  WhatsApp: +34 628 840 747
                </ContactItem>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-sm text-body">
            &copy; {new Date().getFullYear()} Kaleidoastro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
