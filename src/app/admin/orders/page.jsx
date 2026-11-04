import OrdersTable from "@/components/admin/table/orderstable";
import Order from "@/lib/models/orders";
import ProductModel from "@/lib/models/products";
import User from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";

  export default async function OrdersPage(){
    await connectDB(); 
    const [ordersRaw] = await Promise.all([
      Order.find({}).sort({ createdAt: -1 }).lean(),
    ]);
    const [productsRaw] = await Promise.all([
      ProductModel.find({}).sort({ createdAt: -1 }).lean(),
    ]);
    const [usersRaw] = await Promise.all([User.find({}).lean()]);
    const order = ordersRaw.map((o) => ({
      ...o,
      _id: o._id.toString(),
      createdAt: o.createdAt?.toISOString(),
      updatedAt: o.updatedAt?.toISOString(),
    }));

    const products = productsRaw.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toISOString(),
      updatedAt: p.updatedAt?.toISOString(),
    }));

    const users = usersRaw.map((u) => ({
      ...u,
      _id: u._id.toString(),
      createdAt: u.createdAt?.toISOString(),
      updatedAt: u.updatedAt?.toISOString(),
    }));
    return (
      <div className="lg:mt-35">
        <OrdersTable data={order} users={users} products={products}/>
      </div>
    );
  }
  