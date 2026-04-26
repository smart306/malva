import Brands from "@/components/brands/brands";
import ButtonCategoryMain from "@/components/main/buttonscat";
import Header from "@/components/main/hero";
import NewProduct from "@/components/main/newest";
import PopularProduct from "@/components/main/popularp";
import Subscribe from "@/components/main/subscribe";
import { connectDB } from "@/lib/mongoose";
import ProductModel from "@/lib/models/products";
export default async function Home() {
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
    <div>
      <Header />
      <Brands />
      <div>
        <ButtonCategoryMain />
        <NewProduct data={products} />
        <PopularProduct data={products} />
        <Subscribe />
      </div>
      <Brands />
    </div>
  );
}
