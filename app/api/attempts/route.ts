import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { attempts, dailyLimits } from "@/lib/schema"
import { eq, and } from "drizzle-orm"
import { z } from "zod"

const attemptSchema = z.object({
  problemId: z.string(),
  wpm: z.number().min(0),
  accuracy: z.number().min(0).max(100),
  timeSpent: z.number().min(0),
  isCompleted: z.boolean(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized - Please login to save attempts" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = attemptSchema.parse(body)

    // Check daily limit
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

    if (dailyLimit && dailyLimit.attempts >= 3) {
      return NextResponse.json(
        { error: "Daily attempt limit reached (3/3)" },
        { status: 429 }
      )
    }

    // Create attempt
    const [attempt] = await db
      .insert(attempts)
      .values({
        userId: session.user.id,
        problemId: validatedData.problemId,
        wpm: validatedData.wpm,
        accuracy: validatedData.accuracy,
        timeSpent: validatedData.timeSpent,
        isCompleted: validatedData.isCompleted,
      })
      .returning()

    // Update or create daily limit
    if (dailyLimit) {
      await db
        .update(dailyLimits)
        .set({ attempts: dailyLimit.attempts + 1 })
        .where(eq(dailyLimits.id, dailyLimit.id))
    } else {
      await db
        .insert(dailyLimits)
        .values({
          userId: session.user.id,
          date: dateString,
          attempts: 1,
        })
    }

    return NextResponse.json(attempt, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
