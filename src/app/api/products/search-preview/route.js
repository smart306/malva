import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Models from "@/lib/models/products";
const { ProductDecor, ProductWom, ProductMan, ProductTools } = Models;
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

    const [decor, wom, man, tools] = await Promise.all([
      ProductDecor.find(query).select(projection).limit(6).lean(),
      ProductWom.find(query).select(projection).limit(6).lean(),
      ProductMan.find(query).select(projection).limit(6).lean(),
      ProductTools.find(query).select(projection).limit(6).lean(),
    ]);

    const allResults = [...decor, ...wom, ...man, ...tools].slice(0, 6);

    const products = allResults.map((p) => ({
      _id: String(p._id),
      id: p.id,
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