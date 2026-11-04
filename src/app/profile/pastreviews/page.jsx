import { auth } from "@/auth";
import PastReviews from "@/components/auth/pastreview";
import ProductModel from "@/lib/models/products";
import User from "@/lib/models/user";
import { redirect } from "next/navigation";

export default async function PastReviewsPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  const userRaw = await User.findById(session.user.id).lean();

  const productIds = userRaw.pastreviews?.map((item) => item.product);
  const productsRaw = await ProductModel.find({
    _id: { $in: productIds }
  }).lean();

  const user = JSON.parse(JSON.stringify(userRaw));
  const products = JSON.parse(JSON.stringify(productsRaw));

  if (!userRaw) {
    redirect("/login");
  }

  return (
    <main className="lg:mt-35">
      <PastReviews user={user.pastreviews} products={products} />
    </main>
  );
}