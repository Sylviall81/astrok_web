import { NextResponse } from "next/server"
import { getProductVariations } from "@/lib/woocommerce"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const variations = await getProductVariations(Number(id))
    return NextResponse.json(variations)
  } catch (error: any) {
    console.error("Error fetching variations:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}