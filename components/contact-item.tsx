import { ReactNode } from "react"

type ContactItemProps = {
  href: string
  icon: ReactNode
  children: ReactNode
  className?: string
  external?: boolean
}

export default function ContactItem({
  href,
  icon,
  children,
  className = "",
  external = false,
}: ContactItemProps) {
  return (
    <a
      href={href}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className={`flex items-center gap-2 transition-colors ${className}`}
    >
      {icon}
      {children}
    </a>
  )
}