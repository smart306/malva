import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import ProductModel from "@/lib/models/products";

export async function POST(req) {
  try {
    await connectDB();

    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json([]);
    }

    const fetchedProducts = await ProductModel.find({
      _id: { $in: ids },
    });

    const sortedProducts = ids
      .map((id) =>
        fetchedProducts.find((p) => p._id.toString() === id.toString()),
      )
      .filter(Boolean);

    return NextResponse.json(sortedProducts);
  } catch (error) {
    console.error("Batch fetch error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}