import Background from "@/components/background";
import ProductP from "@/components/product";
import Product from "@/lib/models/products";
import { connectDB } from "@/lib/mongoose";

export default async function ProductPage({ params }) {
  await connectDB();

  const resolvedParams = await params;
  const { id } = resolvedParams;

  const product = await Product.findById(id).lean();

  if (!product) {
    return <div>Товар не знайдено</div>;
  }
  const safeProduct = {
    ...product,
    _id: product._id.toString(),
  };

  const productsRaw = await Product.find({}).lean();
  
    const products = productsRaw.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toISOString(),
      updatedAt: p.updatedAt?.toISOString(),
    }));
  
  return (
    <div>
      <Background />
      <ProductP data={safeProduct} productssim={products}/>
    </div>
  );
}