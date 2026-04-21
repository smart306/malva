import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Category, { MAIN_CATEGORIES } from "@/lib/models/categories";

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
    const body = await request.json();

    if (!MAIN_CATEGORIES.includes(body.maincategory)) {
      return NextResponse.json(
        {
          success: false,
          message: "Невідома головна категорія",
        },
        { status: 400 },
      );
    }

    const category = await Category.create({
      name: body.name,
      maincategory: body.maincategory,
      subcategory: body.subcategory,
      subcategory1: body.subcategory1,
      subcategory2: body.subcategory2,
    });

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
