import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/schema"
import { eq, or } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { z } from "zod"

const signupSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
  gender: z.enum(["MALE", "FEMALE"]),
  college: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = signupSchema.parse(body)

    // Check if user exists
    const existingUser = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, validatedData.email),
          eq(users.username, validatedData.username)
        )
      )
      .limit(1)

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Create user
    const [user] = await db
      .insert(users)
      .values({
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        gender: validatedData.gender,
        college: validatedData.college,
      })
      .returning({
        id: users.id,
        username: users.username,
        email: users.email,
        gender: users.gender,
      })

    return NextResponse.json(user, { status: 201 })
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
