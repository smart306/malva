import Brands from "@/components/brands/brands";
import ButtonCategoryMain from "@/components/main/buttonscat";
import Header from "@/components/main/hero";
import NewProduct from "@/components/main/newest";
import PopularProduct from "@/components/main/popularp";
import { connectDB } from "@/lib/mongoose";
import ProductModel from "@/lib/models/products";
import Categories from "@/lib/models/categories";
export default async function Home() {
  await connectDB();

  const [categoriesRaw] = await Promise.all([Categories.find({}).sort({ createdAt: -1 }).lean()]);
  const [productsRaw] = await Promise.all([
    ProductModel.find({}).sort({ createdAt: -1 }).lean(),
  ]);
  const [popularRaw] = await Promise.all([
    ProductModel.find({}).sort({rating: -1}).lean(), 
  ]);
  const categories = JSON.parse(JSON.stringify(categoriesRaw));
  const products = JSON.parse(JSON.stringify(productsRaw));
  const popular = JSON.parse(JSON.stringify(popularRaw));


  return (
    <div>
      <Header />
      <Brands />
      <div>
        <ButtonCategoryMain data={categories}/>
        <NewProduct data={products} />
        <PopularProduct data={popular} />
      </div>
      <Brands />
    </div>
  );
}
