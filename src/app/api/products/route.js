import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Product from "@/lib/models/products";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).lean();

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

    const existingProduct = await Product.findOne({ id: body.id });

    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product with this id already exists",
        },
        { status: 400 },
      );
    }

    const product = await Product.create({
      id: body.id,
      title: body.title,
      description: body.description,
      ratingFull: body.ratingFull || 0,
      ratingHalf: body.ratingHalf || 0,
      price: body.price,
      images: body.images || [],
      info: body.info || [],
      colors: body.colors || [],
      reviews: body.reviews || [],
    });

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 201 },
    );
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