import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { attempts, dailyLimits } from "@/lib/schema"
import { sql } from "drizzle-orm"
import { z } from "zod"

const MAX_DAILY_ATTEMPTS = 3

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

    const attempt = await db.transaction(async (tx) => {
      const limitRows = await tx
        .insert(dailyLimits)
        .values({
          userId: session.user.id,
          date: dateString,
          attempts: 1,
        })
        .onConflictDoUpdate({
          target: [dailyLimits.userId, dailyLimits.date],
          set: {
            attempts: sql`${dailyLimits.attempts} + 1`,
          },
          where: sql`${dailyLimits.attempts} < ${MAX_DAILY_ATTEMPTS}`,
        })
        .returning({ attempts: dailyLimits.attempts })

      if (limitRows.length === 0) {
        return null
      }

      const [createdAttempt] = await tx
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

      return createdAttempt
    })

    if (!attempt) {
      return NextResponse.json(
        { error: `Daily attempt limit reached (${MAX_DAILY_ATTEMPTS}/${MAX_DAILY_ATTEMPTS})` },
        { status: 429 }
      )
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
