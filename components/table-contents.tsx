export default function TableOfContents({ headings }: { headings: Array<{ id: string; level: number; text: string }> }) {
  if (!headings.length) return null

  return (
    <aside className="sticky top-24">
      <p className="font-semibold mb-2">Contenido</p>

      <ul className="space-y-1">
        {headings.map((h: { id: string; level: number; text: string }) => (
          <li
            key={h.id}
            className={h.level === 3 ? "ml-4 text-gray-500" : ""}
          >
            <a href={`#${h.id}`} className="hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}