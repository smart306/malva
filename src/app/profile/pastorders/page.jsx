import { auth } from "@/auth";
import PastOrders from "@/components/auth/pastorders";
import Order from "@/lib/models/orders";
import ProductModel from "@/lib/models/products";
import User from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { redirect } from "next/navigation";

export default async function PastordersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();

  const user = await User.findById(session.user.id)
    .populate({ path: "pastorders", model: Order , populate: {path: "products.product", model: ProductModel}})
    .lean();

  if (!user) {
    redirect("/login");
  }

  const pastOrders = JSON.parse(JSON.stringify(user.pastorders));

  return (
    <main className="lg:mt-35">
      <PastOrders data={pastOrders} />
    </main>
  );
}