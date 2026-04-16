import { load } from "cheerio"

export function generateTOC(html: string) {
  const $ = load(html)
  const headings: { id: string; text: string; level: number }[] = []

  $("h2, h3").each((_, el) => {
    const text = $(el).text()

    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")

    $(el).attr("id", id)

    headings.push({
      id,
      text,
      level: el.tagName === "h2" ? 2 : 3,
    })
  })

  return {
    headings,
    html: $.html(),
  }
}