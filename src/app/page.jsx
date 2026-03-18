import AddProductButton from "@/components/addproduct";
import Brands from "@/components/brands/brands";
import ButtonCategoryMain from "@/components/main/buttonscat";
import Header from "@/components/main/hero";
import NewProduct from "@/components/main/newest";
import PopularProduct from "@/components/main/popularp";
import Subscribe from "@/components/main/subscribe";
import Product from "@/lib/models/products";
import { connectDB } from "@/lib/mongoose";

export default async function Home() {
  await connectDB()
  
  const productRaw = await Product.find({}).lean();

  const product = productRaw.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));

  return (
    <div>
      <Header />
      <Brands />
      <AddProductButton/>
      <div>
        <ButtonCategoryMain/>
        <NewProduct data={product}/>
        <PopularProduct data={product}/>
        <Subscribe/>
      </div>
      <Brands />
    </div>
  );
}
