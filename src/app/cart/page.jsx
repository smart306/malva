import Cart from "@/components/cart";
import { getCart } from "@/lib/cart/cart";
import Models from "@/lib/models/products"; 
const { ProductDecor, ProductWom, ProductMan, ProductTools } = Models; 
import { connectDB } from "@/lib/mongoose";

export default async function CartPage(){
    await connectDB()
      
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
  
  
    return(
        <div>
            <Cart data={products}/>
        </div>
    )
}