"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function EditProfileForm({ user }) {
  const router = useRouter()

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(user.image || "")
  const [imageUrl, setImageUrl] = useState(user.image || "")

  async function handleImageChange(event) {
    const file = event.target.files?.[0]

    if (!file) return

    setError("")

    const localPreview = URL.createObjectURL(file)
    setImagePreview(localPreview)

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload-image/avatar", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message || "Не вдалося завантажити фото")
      return
    }

    setImageUrl(data.url)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setError("")
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    const name = formData.get("name")

    const res = await fetch("/api/auth/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image: imageUrl,
      }),
    })

    const data = await res.json()

    setIsLoading(false)

    if (!res.ok) {
      setError(data.message || "Не вдалося оновити профіль")
      return
    }

    router.refresh()
    router.push("/profile")
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Редагування профілю</CardTitle>
        <CardDescription>
          Онови імʼя та фото профілю
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {imagePreview && (
            <div className="flex justify-center">
              <Image
                src={imagePreview}
                alt="Avatar"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover"
                unoptimized={imagePreview.startsWith("blob:")}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Імʼя</Label>
            <Input
              id="name"
              name="name"
              defaultValue={user.name || ""}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Фото</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Збереження..." : "Зберегти"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}