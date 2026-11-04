import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import ProductModel from "@/lib/models/products";
import { auth } from "@/auth";

export async function GET() {
  try {
    await connectDB();

    const products = await ProductModel.find({}).lean();

    return NextResponse.json({
      success: true,
      products,
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
    if (body.images && Array.isArray(body.images)) {
      body.images = body.images.map((img) => 
        typeof img === "string" ? { image: img } : img
      );
    }
    
    const product = await ProductModel.create(body);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
