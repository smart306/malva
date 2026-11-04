"use server";
import User from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";

export async function getUserPoints(userId) {
  try {
    if (!userId) return 0;
    await connectDB();
    const user = await User.findById(userId).select("points").lean();
    return user?.points;
  } catch (error) {
    console.error("Помилка отримання балів:", error);
    return 0;
  }
}