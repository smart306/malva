import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Не знайдено BLOB_READ_WRITE_TOKEN у .env.local",
        },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const isFileLike =
      !!file &&
      typeof file === "object" &&
      typeof file.name === "string" &&
      typeof file.arrayBuffer === "function";

    if (!isFileLike) {
      return NextResponse.json(
        {
          success: false,
          message: "Файл не передано",
        },
        { status: 400 },
      );
    }

    const isImage = file.type?.startsWith("image/");
    if (!isImage) {
      return NextResponse.json(
        {
          success: false,
          message: "Можна завантажувати тільки зображення",
        },
        { status: 400 },
      );
    }

    const isPrivate = process.env.BLOB_ACCESS === "private";
    const blob = await put(`products/${Date.now()}-${file.name}`, file, {
      access: isPrivate ? "private" : "public",
      addRandomSuffix: true,
      token,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
    const proxiedUrl = `/api/blob-image?url=${encodeURIComponent(blob.url)}`;

    return NextResponse.json({
      success: true,
      url: isPrivate ? `${appUrl}${proxiedUrl}` : blob.url,
      access: isPrivate ? "private" : "public",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Помилка завантаження",
      },
      { status: 500 },
    );
  }
}
