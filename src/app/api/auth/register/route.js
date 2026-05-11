import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/mongoose"
import User from "@/lib/models/user"

export async function POST(req) {
  try {
    await connectDB()

    const body = await req.json()

    const name = body.name?.trim()
    const email = body.email?.toLowerCase()?.trim()
    const password = body.password

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Заповни всі поля" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Пароль має бути мінімум 8 символів" },
        { status: 400 }
      )
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { message: "Користувач з таким email вже існує" },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await User.create({
      name,
      email,
      passwordHash,
      provider: "credentials",
      image: null,
      role: "user",
    })

    return NextResponse.json(
      { message: "Акаунт створено" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Помилка сервера" },
      { status: 500 }
    )
  }
}