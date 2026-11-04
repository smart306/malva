import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import User from "@/lib/models/user"
import Profile from "@/components/auth"
import { Button } from "@/components/ui/button"
import Background from "@/components/background"
import ProductModel from "@/lib/models/products"

export default async function ProfilePage() {
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
    <div className="w-full h-full relative">
      <div className="absolute hidden lg:block w-full h-full -z-10">
        <Background />
      </div>
      <div className=" my-container relative flex flex-col bg-primary border-x-5 md:flex-row gap-x-4 h-screen">
        <div className="w-full h-full flex flex-col justify-between pb-4">
          <Profile user={user} products={products}/>
          <form
            action={async () => {
              "use server";

              await signOut({
                redirectTo: "/login",
              });
            }}
          >
            <Button
              type="submit"
              variant="secondary"
              className="rounded-full text-xl px-4 py-1"
            >
              Вийти
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}