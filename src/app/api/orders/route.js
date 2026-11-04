import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Order from "@/lib/models/orders";

export async function GET() {
  try {
    await connectDB();

    const order = await Order.find({}).lean();

    return NextResponse.json({
      success: true,
      order,
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

    const order = await Order.create(body);
    return NextResponse.json({ success: true, order }, { status: 201 });
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