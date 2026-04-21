import Category from "@/components/category";
import Models from "@/lib/models/products"; 
const { ProductDecor, ProductWom, ProductMan, ProductTools } = Models; 
import { connectDB } from "@/lib/mongoose";
export default async function CategoryPage({params}) {
  const { slug } = await params;
  await connectDB()
  const categoryMap = {
    "decorative": { 
      model: ProductDecor, 
      dbName: "Декоративна косметика" 
    },
    "men": { 
      model: ProductMan, 
      dbName: "Чоловіча доглядова косметика" 
    },
    "women": { 
      model: ProductWom, 
      dbName: "Жіноча доглядова косметика" 
    },
    "tools": { 
      model: ProductTools, 
      dbName: "Інструменти для догляду" 
    },
  };
  const currentCategory = categoryMap[slug];

  const productRaw = await currentCategory.model.find({ 
    maincategory: currentCategory.dbName 
  }).lean();

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