"use server";

import { connectDB } from "@/lib/mongoose";
import User from "@/lib/models/user";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import ProductModel from "../models/products";

export async function addReviewToggle(productId, reviewText, rating) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, message: "Необхідно авторизуватися" };
    }
    await connectDB();
    const user = await User.findById(session.user.id).select("pastreviews");
    const product = await ProductModel.findById(productId);
    const validRating = Number(rating) && Number(rating) > 0 ? Number(rating) : 0;
    const existingReviewIndex = user.pastreviews?.findIndex((r) => r.product.toString() === productId.toString(),);
    const hasProductReview = product.reviews?.some(
      (r) =>
        r.userId?.toString() === session.user.id ||
        r.user?.toString() === session.user.id,
    );
    if (existingReviewIndex !== -1 || hasProductReview) {
      return {
        success: false,
        message: "Ви вже залишили відгук про цей товар",
      };
    } else {
      const newProductReview = {
        date: Date.now(),
        name: session.user.name,
        userId: session.user.id,
        review: reviewText,
        star: validRating,
      };

      user.pastreviews.push({
        date: Date.now(),
        product: productId,
        review: reviewText,
        star: validRating,
      });
      product.reviews.push(newProductReview);
    }
    user.pastreviews.forEach((rev) => {
      if (rev.star === undefined || rev.star === null) {
        rev.star = 0;
      }
    });
    const totalStars = product.reviews.reduce((sum, item) => sum + (item.star), 0);
    product.rating =
      product.reviews.length > 0 ? totalStars / product.reviews.length : 0;
    await Promise.all([user.save({ validateModifiedOnly: true }), product.save()]);
    revalidatePath(`/catalog/product/${productId}`);
    revalidatePath("/"); 
    return { success: true };
  } catch (error) {
    console.error("ADD_REVIEW_TOGGLE_ERROR", error);
    return { success: false, message: "Помилка сервера" };
  }
}