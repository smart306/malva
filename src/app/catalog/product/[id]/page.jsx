import Background from "@/components/background";
import ProductP from "@/components/product";
import Models from "@/lib/models/products"; 
const { ProductDecor, ProductWom, ProductMan, ProductTools } = Models; 
import { connectDB } from "@/lib/mongoose";

export default async function ProductPage({ params }) {
  await connectDB();

  const resolvedParams = await params;
  const { id } = resolvedParams;

  const product =
    (await ProductDecor.findById(id).lean()) ||
    (await ProductWom.findById(id).lean()) ||
    (await ProductMan.findById(id).lean()) ||
    (await ProductTools.findById(id).lean());

  if (!product) {
    return <div>Товар не знайдено</div>;
  }
  const safeProduct = {
    ...product,
    _id: product._id.toString(),
  };

 const [decor, wom, man, tools] = await Promise.all([
    ProductDecor.find({}).lean(),
    ProductWom.find({}).lean(),
    ProductMan.find({}).lean(),
    ProductTools.find({}).lean(),
  ]);

  const allProductsRaw = [...decor, ...wom, ...man, ...tools];
  
    const products = allProductsRaw.map((p) => ({
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