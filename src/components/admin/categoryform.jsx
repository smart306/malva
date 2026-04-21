"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAIN_CATEGORIES = [
  "Декоративна косметика",
  "Жіноча доглядова косметика",
  "Чоловіча доглядова косметика",
  "Інструменти для догляду",
];

export default function CategoryForm() {
  const [formData, setFormData] = useState({
    name: "",
    maincategory: MAIN_CATEGORIES[0],
    subcategory: "",
    subcategory1: "",
    subcategory2: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const singleSubcategory = useMemo(() => {
    return (
      formData.maincategory === "Декоративна косметика" ||
      formData.maincategory === "Інструменти для догляду"
    );
  }, [formData.maincategory]);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (!formData.name.trim()) {
      setStatus("Вкажіть назву категорії");
      return;
    }

    if (singleSubcategory && !formData.subcategory.trim()) {
      setStatus("Вкажіть підкатегорію (subcategory)");
      return;
    }

    if (!singleSubcategory) {
      if (!formData.subcategory1.trim() || !formData.subcategory2.trim()) {
        setStatus("Вкажіть subcategory1 та subcategory2");
        return;
      }
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Не вдалося створити категорію");
      }

      setStatus("Категорію успішно створено");
      setFormData((prev) => ({
        ...prev,
        name: "",
        subcategory: "",
        subcategory1: "",
        subcategory2: "",
      }));
    } catch (error) {
      setStatus(error.message || "Сталася помилка");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-border bg-black/30 p-5"
    >
      <h2 className="h3">Додати категорію</h2>

      <div className="space-y-2">
        <Label htmlFor="category-name">Назва категорії</Label>
        <Input
          id="category-name"
          value={formData.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Наприклад: Губи"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="maincategory">Головна категорія</Label>
        <select
          id="maincategory"
          value={formData.maincategory}
          onChange={(event) => updateField("maincategory", event.target.value)}
          className="w-full rounded-full border-2 border-secondary bg-input px-3 py-2 text-black"
        >
          {MAIN_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {singleSubcategory ? (
        <div className="space-y-2">
          <Label htmlFor="subcategory">subcategory</Label>
          <Input
            id="subcategory"
            value={formData.subcategory}
            onChange={(event) => updateField("subcategory", event.target.value)}
            placeholder="Наприклад: Обличчя"
          />
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="subcategory1">subcategory1</Label>
            <Input
              id="subcategory1"
              value={formData.subcategory1}
              onChange={(event) => updateField("subcategory1", event.target.value)}
              placeholder="Наприклад: Обличчя"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subcategory2">subcategory2</Label>
            <Input
              id="subcategory2"
              value={formData.subcategory2}
              onChange={(event) => updateField("subcategory2", event.target.value)}
              placeholder="Наприклад: Крем"
            />
          </div>
        </>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Збереження..." : "Створити категорію"}
      </Button>

      {status ? <p className="text-sm text-secondary">{status}</p> : null}
    </form>
  );
}
