import Cart from "@/components/cart";
import { connectDB } from "@/lib/mongoose";
import Dostavka from "@/lib/models/dostavka";
import { auth } from "@/auth";

export default async function CartPage() {
  const session = await auth()
  let dostavkasOptions = [];

  await connectDB(); 
  try {
    const dostavkas = await Dostavka.find({}).lean();
    dostavkasOptions = JSON.parse(JSON.stringify(dostavkas));
  } catch (error) {
    console.error("Помилка завантаження варіантів доставки:", error);
  }

  return (
    <div>
      <Cart session={session} dostavkasOptions={dostavkasOptions} />
    </div>
  );
}
