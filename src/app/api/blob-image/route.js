import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { success: false, message: "Не передано url" },
        { status: 400 },
      );
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Не знайдено BLOB_READ_WRITE_TOKEN",
        },
        { status: 500 },
      );
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: "Не вдалося прочитати файл з Blob" },
        { status: response.status },
      );
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const cacheControl = response.headers.get("cache-control") || "public, max-age=31536000, immutable";

    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Помилка проксі для Blob",
      },
      { status: 500 },
    );
  }
}
