import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import ProductModel from "@/lib/models/products";

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
    const body = await request.json();

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
