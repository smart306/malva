import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Category from "@/lib/models/categories";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const maincategory = searchParams.get("maincategory");

    const query = {};
    if (maincategory) {
      query.maincategory = maincategory;
    }

    const categories = await Category.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await connectDB(); 
    const session = await auth();
   
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "401 Unauthorized: Необхідно авторизуватися" },
        { status: 401 }
      );
    }
    const isAdmin =
      session.user.role === "admin" || session.user.role === "admin-main";

   if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "403 Forbidden: Доступ заборонено" },
        { status: 403 }
      );
    }
    const body = await request.json();

    const category = await Category.create(body);

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}