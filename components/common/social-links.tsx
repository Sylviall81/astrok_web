import { SiInstagram, SiFacebook, SiYoutube } from "react-icons/si"

type SocialLinksProps = {
  className?: string
  iconClassName?: string
}

export default function SocialLinks({
  className = "",
  iconClassName = "",
}: SocialLinksProps) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <a
        href="https://www.instagram.com/astrokaleido/    "
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiInstagram className={`w-5 h-5 hover:text-primary transition-colors ${iconClassName}`} />
      </a>

      <a
        href="https://www.facebook.com/Kaleidoscopebcn/#"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiFacebook className={`w-5 h-5 hover:text-primary transition-colors ${iconClassName}`} />
      </a>

      <a
        href="https://www.youtube.com/@kaleidoscopeastrologiapsic6012   "
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiYoutube className={`w-5 h-5 hover:text-primary transition-colors ${iconClassName}`} />
      </a>
    </div>
  )
}