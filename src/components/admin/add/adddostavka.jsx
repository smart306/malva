"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialFormState = {
  name: "",
  time: "",
  price: "",
};

export default function DostavkaForm() {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState(initialFormState);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (!formData.name.trim() || !formData.time.trim()) {
      setStatus("Заповніть");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      time: formData.time.trim(), 
      price: Number(formData.price), 
    };

    try {
      const response = await fetch("/api/dostavka", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(
          data.message || data.error || "Не вдалося створити",
        );
      }

      setStatus("успішно створено!");
      setFormData(initialFormState);
    } catch (error) {
      setStatus(error.message || "Сталася помилка");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-border bg-black/30 p-5"
    >
      <h2 className="text-xl font-bold">Додати доставку</h2>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Назва</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="НОва пошкта..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Час</Label>
          <Input
            id="time"
            value={formData.time}
            onChange={(e) => updateField("time", e.target.value)}
            placeholder="00:00 або 24 години"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Ціна</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => updateField("price", e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="py-2 px-4 rounded-full text-xl items-center text-center"
      >
        Створити
      </Button>

      {status && <p className="text-sm text-secondary">{status}</p>}
    </form>
  );
}