import ProductsTable from "@/components/admin/table/productstable";
import ProductModel from "@/lib/models/products";
import { connectDB } from "@/lib/mongoose";

export default async function ProductsTablePage() {
  await connectDB();
  const [productsRaw] = await Promise.all([
    ProductModel.find({}).sort({ createdAt: -1 }).lean(),
  ]);
  const products = productsRaw.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));

  return (
    <div className="lg:mt-35">
      <ProductsTable data={products} />
    </div>
  );
}
