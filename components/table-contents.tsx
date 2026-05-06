export default function TableOfContents({ headings }: { headings: Array<{ id: string; level: number; text: string }> }) {
  if (!headings.length) return null

  return (
    <aside className="mb-8 rounded-lg border p-4 bg-muted/50 font-lato">
      <p className="font-semibold mb-2 text-foreground">Contenido</p>

      <ul className="space-y-1">
        {headings.map((h: { id: string; level: number; text: string }) => (
          <li
            key={h.id}
            className={h.level === 3 ? "ml-4" : ""}
          >
            <a
              href={`#${h.id}`}
              className={`hover:underline hover:text-primary dark:hover:text-accent transition-colors ${
                h.level === 3 ? "text-sm text-muted-foreground" : "text-foreground"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}