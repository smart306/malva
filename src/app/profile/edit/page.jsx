import { auth } from "@/auth"
import EditProfileForm from "@/components/auth/edit_profile_form"
import User from "@/lib/models/user"
import { connectDB } from "@/lib/mongoose"
import { redirect } from "next/navigation"



export default async function EditProfilePage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  await connectDB()

  const user = await User.findById(session.user.id).lean()

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <EditProfileForm
        user={{
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || "",
        }}
      />
    </main>
  )
}