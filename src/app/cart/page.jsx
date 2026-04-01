import Cart from "@/components/cart";
import { getCart } from "@/lib/cart/cart";
import Product from "@/lib/models/products";
import { connectDB } from "@/lib/mongoose";

export default async function CartPage(){
    await connectDB()
      
      const productRaw = await Product.find({}).lean();
    
      const product = productRaw.map((p) => ({
        ...p,
        _id: p._id.toString(),
        createdAt: p.createdAt?.toISOString(),
        updatedAt: p.updatedAt?.toISOString(),
      }));
    return(
        <div>
            <Cart data={product}/>
        </div>
    )
}