import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { dailyLimits } from "@/lib/schema"
import { eq, and } from "drizzle-orm"

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dateString = today.toISOString().split('T')[0]

    const [dailyLimit] = await db
      .select()
      .from(dailyLimits)
      .where(
        and(
          eq(dailyLimits.userId, session.user.id),
          eq(dailyLimits.date, dateString)
        )
      )
      .limit(1)

    const attemptsUsed = dailyLimit?.attempts || 0
    const attemptsRemaining = Math.max(0, 3 - attemptsUsed)

    return NextResponse.json({
      attemptsUsed,
      attemptsRemaining,
      canAttempt: attemptsRemaining > 0,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
