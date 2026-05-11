import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

import { auth } from "@/auth"

const MAX_FILE_SIZE = 2 * 1024 * 1024

export async function POST(request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Не знайдено BLOB_READ_WRITE_TOKEN у .env.local",
        },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file")

    const isFileLike =
      !!file &&
      typeof file === "object" &&
      typeof file.name === "string" &&
      typeof file.arrayBuffer === "function"

    if (!isFileLike) {
      return NextResponse.json(
        { success: false, message: "Файл не передано" },
        { status: 400 }
      )
    }

    if (!file.type?.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Можна завантажувати тільки зображення",
        },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Максимальний розмір фото – 2MB",
        },
        { status: 400 }
      )
    }

    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-")

    const blob = await put(
      `avatars/${session.user.id}-${Date.now()}-${safeFileName}`,
      file,
      {
        access: "public",
        addRandomSuffix: true,
        token,
      }
    )

    return NextResponse.json({
      success: true,
      url: blob.url,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Помилка завантаження",
      },
      { status: 500 }
    )
  }
}