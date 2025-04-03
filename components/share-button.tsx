"use client"

import { Facebook, Twitter, Linkedin, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNotification } from "@/context/notification-context"

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const { showNotification } = useNotification()

  const shareLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`,
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-4 w-4" />,
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ]

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      showNotification("success", "Enlace copiado", "El enlace ha sido copiado al portapapeles")
    } catch (error) {
      showNotification("error", "Error", "No se pudo copiar el enlace")
    }
  }

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  return (
    <div className="flex items-center space-x-2">
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="outline"
          size="icon"
          onClick={() => handleShare(link.shareUrl)}
          title={`Compartir en ${link.name}`}
        >
          {link.icon}
          <span className="sr-only">Compartir en {link.name}</span>
        </Button>
      ))}
      <Button variant="outline" size="icon" onClick={handleCopyLink} title="Copiar enlace">
        <Link className="h-4 w-4" />
        <span className="sr-only">Copiar enlace</span>
      </Button>
    </div>
  )
}

