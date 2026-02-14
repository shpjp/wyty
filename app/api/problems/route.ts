import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { problems } from "@/lib/schema"
import { eq, asc } from "drizzle-orm"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let query = db.select().from(problems)

    if (category && (category === "DYNAMIC_PROGRAMMING" || category === "GRAPH")) {
      query = query.where(eq(problems.category, category)) as any
    }

    const allProblems = await query.orderBy(asc(problems.createdAt))

    return NextResponse.json(allProblems)
  } catch (error) {
    console.error("Failed to fetch problems:", error)
    return NextResponse.json(
      { error: "Failed to fetch problems" },
      { status: 500 }
    )
  }
}
