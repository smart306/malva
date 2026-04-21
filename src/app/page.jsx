import Brands from "@/components/brands/brands";
import ButtonCategoryMain from "@/components/main/buttonscat";
import Header from "@/components/main/hero";
import NewProduct from "@/components/main/newest";
import PopularProduct from "@/components/main/popularp";
import Subscribe from "@/components/main/subscribe";
import { connectDB } from "@/lib/mongoose";
import Models from "@/lib/models/products"; 
const { ProductDecor, ProductWom, ProductMan, ProductTools } = Models; 
export default async function Home() {
  await connectDB()
  
  const [decor, wom, man, tools] = await Promise.all([
    ProductDecor.find({}).lean(),
    ProductWom.find({}).lean(),
    ProductMan.find({}).lean(),
    ProductTools.find({}).lean(),
  ]);

  const allProductsRaw = [...decor, ...wom, ...man, ...tools];

  const product = allProductsRaw.map((p) => ({
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
        <ButtonCategoryMain/>
        <NewProduct data={product}/>
        <PopularProduct data={product}/>
        <Subscribe/>
      </div>
      <Brands />
    </div>
  );
}
