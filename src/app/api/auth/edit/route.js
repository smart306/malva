import { NextResponse } from "next/server"

import { auth } from "@/auth"

import User from "@/lib/models/user"
import { connectDB } from "@/lib/mongoose"

export async function PATCH(req) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    await connectDB()

    const body = await req.json()

    const name =
      typeof body.name === "string" ? body.name.trim() : ""

    const image =
      typeof body.image === "string" ? body.image.trim() : ""

    if (!name) {
      return NextResponse.json(
        { message: "Імʼя обовʼязкове" },
        { status: 400 }
      )
    }

    if (name.length > 50) {
      return NextResponse.json(
        { message: "Імʼя занадто довге" },
        { status: 400 }
      )
    }

    const updateData = {
      name,
    }

    if (image) {
      updateData.image = image
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).select("-passwordHash")

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Користувача не знайдено" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: "Профіль оновлено",
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
        role: updatedUser.role,
      },
    })
  } catch (error) {
    console.error("PROFILE_UPDATE_ERROR", error)

    return NextResponse.json(
      { message: "Помилка сервера" },
      { status: 500 }
    )
  }
}