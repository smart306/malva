import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
    return (
        <div className="my-container pt-24 pb-12">
            <div className="space-y-4 rounded-3xl border border-border bg-black/30 p-6 text-center">
                <h1 className="h2">Адмін-панель</h1>
                <p className="p">Виберіть, що саме хочете додати.</p>

                <div className="grid gap-3 md:grid-cols-2">
                    <Button asChild>
                        <Link href="/admin/category">Додати категорію</Link>
                    </Button>

                    <Button asChild>
                        <Link href="/admin/product">Додати продукт</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}