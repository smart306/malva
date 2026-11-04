import Link from "next/link";
import { Button } from "../ui/button";
import { signOut } from "@/auth";
import AddAdminModal from "./add/addadmin";

export default function Admin() {

  return (
    <div className="min-h-screen rounded-3xl border border-x-border bg-black/30 p-6 text-center pt-24">
      <div className="space-y-4 text-center">
        <div className="w-full flex justify-end">
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
        <h1 className="h2">Адмін-панель</h1>
        <div className="flex w-full flex-col px-12 gap-4">
          <div className="flex w-full">
            <div className="w-full flex flex-col gap-3 justify-between">
              <Button
                asChild
                className="py-2 px-4 rounded-full text-xl items-center text-center"
              >
                <Link href="/admin/category/add">Додати категорію</Link>
              </Button>
              <Button
                asChild
                className="py-2 px-4 rounded-full text-xl items-center text-center"
              >
                <Link href="/admin/products/add">Додати продукт</Link>
              </Button>
              <Button
                asChild
                className="py-2 px-4 rounded-full text-xl items-center text-center"
              >
                <Link href="/admin/dostavka/add">Додати доставку</Link>
              </Button>
              <Button
                asChild
                className="py-2 px-4 rounded-full text-xl items-center text-center"
              >
                <Link href="/admin/regulation/add">Додати регуляцію</Link>
              </Button>
              <AddAdminModal />
              <Button
                asChild
                variant="secondary"
                className="py-2 px-4 rounded-full text-xl items-center text-center"
              >
                <Link href="/admin/orders">Таблиця замовлень</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="py-2 px-4 rounded-full text-xl items-center text-center"
              >
                <Link href="/admin/products">Таблиця продуктів</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


