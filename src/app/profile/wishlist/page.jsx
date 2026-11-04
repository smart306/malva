import { auth } from "@/auth";
import Wishlist from "@/components/auth/wishlist";
import User from "@/lib/models/user";
import { connectDB } from "@/lib/mongoose";
import { redirect } from "next/navigation";

export default async function WishlistPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();

  const user = await User.findById(session.user.id).populate("wishlist").lean();

  if (!user) {
    redirect("/login");
  }

  const wishlistItems = JSON.parse(JSON.stringify(user.wishlist || []));

  return (
    <main className="lg:mt-35">
      <Wishlist wishlist={wishlistItems} />
    </main>
  );
}