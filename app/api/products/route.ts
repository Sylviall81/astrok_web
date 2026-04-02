// app/api/products/route.ts
import { NextResponse } from "next/server"
import { getProducts } from "@/lib/woocomerce"

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json(products)
  } catch (error: any) {
    console.error("Error fetching products:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}