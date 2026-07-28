import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import ProductModel from "@/lib/models/products";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim();

    if (q.length < 2) {
      return NextResponse.json([]);
    }

    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const query = { title: { $regex: escaped, $options: "i" } };
    const projection = "_id id title price images";

   const allResults = await ProductModel.find(query)
    .select(projection)
    .limit(6)
    .lean();

    const products = allResults.map((p) => ({
      _id: String(p._id),
      title: p.title || "",
      price: p.price || 0,
      image: Array.isArray(p.images) ? p.images[0] : null,
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("search-preview route error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error",
      },
      { status: 500 }
    );
  }
}