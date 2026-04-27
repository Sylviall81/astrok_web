import { NextResponse } from "next/server"
import { getProducts } from "@/lib/woocommerce"

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json(products, {
      headers: { "Cache-Control": "s-maxage=120, stale-while-revalidate=300" },
    })
  } catch (error: any) {
    console.error("Error fetching products:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}