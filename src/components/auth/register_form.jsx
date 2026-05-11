"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"

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
import { Separator } from "@/components/ui/separator"

export default function RegisterForm() {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleRegister(event) {
    event.preventDefault()

    setError("")
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setIsLoading(false)
      setError(data.message || "Помилка реєстрації")
      return
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/profile",
    })

    setIsLoading(false)

    if (result?.error) {
      setError("Акаунт створено, але не вдалося увійти")
      return
    }

    window.location.href = result?.url || "/profile"
  }

  async function handleGoogleLogin() {
    await signIn("google", {
      callbackUrl: "/profile",
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Реєстрація</CardTitle>
        <CardDescription>
          Створи акаунт через email або Google
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Імʼя</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Макс"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Мінімум 8 символів"
              minLength={8}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Створення..." : "Створити акаунт"}
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">
            або
          </span>
          <Separator className="flex-1" />
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          Продовжити з Google
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Вже маєш акаунт?{" "}
          <Link href="/login" className="font-medium text-primary">
            Увійти
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}