import Cart from "@/components/cart";
import ProductModel from "@/lib/models/products";
import { connectDB } from "@/lib/mongoose";

export default async function CartPage() {
  await connectDB();

  const productsRaw = await ProductModel.find({})
    .sort({ createdAt: -1 })
    .lean();

  const products = productsRaw.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));

  return (
    <div>
      <Cart data={products} />
    </div>
  );
}
