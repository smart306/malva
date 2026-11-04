"use server";

import { connectDB } from "@/lib/mongoose";
import User from "@/lib/models/user";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function toggleWishlist(productId) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        success: false,
        message: "Будь ласка, увійдіть у систему",
      };
    }
    await connectDB();
    const user = await User.findById(session.user.id).select("wishlist");
    const exists = user.wishlist.some((_id) => _id.toString() === productId.toString(),);
    const message =  exists ? "Видалено з обраного" : "Додано до обраного"; 
  
    const updateOperation = exists
      ? { $pull: { wishlist: productId } }
      : { $addToSet: { wishlist: productId } };
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      updateOperation,
      { new: true },
    ).lean(); 
    const wishlist = updatedUser.wishlist.map((id) => id.toString());
    revalidatePath("/wishlist");
    return {
      success: true,
      message,
      wishlist,
    };
  } catch (error) {
    console.error("TOGGLE_WISHLIST_ERROR", error);
    return { success: false, message: "Помилка сервера" };
  }
}