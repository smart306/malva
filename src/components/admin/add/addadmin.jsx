"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function AddAdminModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role: "admin" }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || "Помилка реєстрації");
        return;
      }

      setOpen(false); 
    } catch (error) {
      console.error("Помилка при створенні адміна:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-2 px-4 rounded-full text-xl items-center text-center">
          Додати адміна
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-primary font-primary">
        <DialogHeader>
          <DialogTitle className="font-primary text-2xl text-center">
            Введіть дані адміна
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2 text-left">
            <Label className="text-xl" htmlFor="name">
              Імʼя
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Макс"
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <Label className="text-xl" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-2 text-left">
            <Label className="text-xl" htmlFor="password">
              Пароль
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Мінімум 8 символів"
              minLength={8}
              required
            />
          </div>

          <Button type="submit" className="w-full rounded-full text-xl py-1" disabled={loading}>
            {loading ? "Створення..." : "Створити адміна"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}