import { auth } from "@/auth";
import ProductP from "@/components/product";
import Dostavka from "@/lib/models/dostavka";
import ProductModel from "@/lib/models/products";
import User from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import mongoose from "mongoose";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const session = await auth();
  await connectDB();

  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }
  let userReviewsArray = [];
  if (session?.user?.id) {
    const user = await User.findById(session.user.id)
      .select("pastreviews")
      .lean();
    userReviewsArray = JSON.parse(JSON.stringify(user.pastreviews));
  }

  const product = await ProductModel.findById(id).lean();

  if (!product) {
    notFound();
  }

  const safeProduct = JSON.parse(JSON.stringify(product));

  const similarProductsRaw = await ProductModel.find({
    _id: { $ne: product._id },
    maincategory: product.maincategory,
  })
    .sort({ createdAt: -1 })
    .limit(12)
    .lean();

  const products = JSON.parse(JSON.stringify(similarProductsRaw));

  let dostavkasOptions = [];
  try {
    const dostavkas = await Dostavka.find({}).lean();
    dostavkasOptions = JSON.parse(JSON.stringify(dostavkas));
  } catch (error) {
    console.error("Помилка завантаження варіантів доставки:", error);
  }

  return (
    <div>
      <ProductP
        session={session}
        data={safeProduct}
        productssim={products}
        dostavkasOptions={dostavkasOptions}
        userreviews={userReviewsArray}
      />
    </div>
  );
}
