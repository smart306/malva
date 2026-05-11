import Link from "next/link"
import Image from "next/image"
import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Профіль</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="Avatar"
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover"
            />
          )}

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Імʼя</p>
            <p className="font-medium">{session.user.name}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{session.user.email}</p>
          </div>

          <Button asChild variant="outline" className="w-full">
            <Link href="/profile/edit">
              Редагувати профіль
            </Link>
          </Button>

          <form
            action={async () => {
              "use server"

              await signOut({
                redirectTo: "/login",
              })
            }}
          >
            <Button type="submit" variant="destructive" className="w-full">
              Вийти
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}