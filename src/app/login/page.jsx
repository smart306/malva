import { auth } from "@/auth"
import LoginForm from "@/components/auth/login_form"
import { redirect } from "next/navigation"



export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    redirect("/profile")
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <LoginForm/>
    </main>
  )
}