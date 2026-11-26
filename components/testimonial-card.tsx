interface TestimonialCardProps {
  name: string
  text: React.ReactNode
  servicio?: string
}

export default function TestimonialCard({ name, text, servicio }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {/* Círculo lila con la inicial y aro dorado, igual que en la landing del curso */}
        <span
          aria-hidden="true"
          className="mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/25 font-lato text-xl font-semibold text-primary ring-1 ring-dorado/70"
        >
          {name.charAt(0)}
        </span>
        <div>
          <h4 className="font-lato text-lg font-bold text-primary">{name}</h4>
          {servicio && <p className="text-sm text-muted-foreground">{servicio}</p>}
        </div>
      </div>
      <p className="text-body line-clamp-4">{text}</p>
    </div>
  )
}
