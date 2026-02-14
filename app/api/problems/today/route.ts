import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { problems } from "@/lib/schema"
import { eq, desc } from "drizzle-orm"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    const query = db
      .select()
      .from(problems)
      .orderBy(desc(problems.createdAt))
      .limit(1)

    const result = category
      ? await query.where(eq(problems.category, category as any))
      : await query

    if (result.length === 0) {
      return NextResponse.json(
        { error: "No problems available" },
        { status: 404 }
      )
    }

    return NextResponse.json(result[0])
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
