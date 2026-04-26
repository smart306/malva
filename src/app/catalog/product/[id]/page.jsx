import ProductP from "@/components/product";
import ProductModel from "@/lib/models/products";
import { connectDB } from "@/lib/mongoose";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  await connectDB();

  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  const product = await ProductModel.findById(id).lean();

  if (!product) {
    notFound();
  }

  const safeProduct = {
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
  };

  const similarProductsRaw = await ProductModel.find({
    _id: { $ne: product._id },
    productType: product.productType,
  })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  const products = similarProductsRaw.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));

  return (
    <div>
      <ProductP data={safeProduct} productssim={products} />
    </div>
  );
}
