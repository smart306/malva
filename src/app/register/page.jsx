import { auth } from "@/auth"
import RegisterForm from "@/components/auth/register_form"
import { redirect } from "next/navigation"



export default async function RegisterPage() {
  const session = await auth()

  if (session?.user) {
    redirect("/profile")
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <RegisterForm/>
    </main>
  )
}