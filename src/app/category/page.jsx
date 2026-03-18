import Category from "@/components/category";
import { connectDB } from "@/lib/mongoose";

export default async function CategoryPage() {
  await connectDB()
  
  const productRaw = await Product.find({}).lean();

  const product = productRaw.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));

    return(
        <div className="mt-18">
            <Category data={product}/>
        </div>
    )
}