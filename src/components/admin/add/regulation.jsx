"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import MDEditor from "@uiw/react-md-editor";
import { Label } from "../../ui/label";

export default function RegulationForm() {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    markdownContent: "",
    slug: "",
  });

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (
      !formData.name.trim() ||
      !formData.date ||
      !formData.markdownContent.trim() ||
      !formData.slug.trim()
    ) {
      setStatus("Заповніть");
      return;
    }

    const payload = {
      name: formData.name,
      date: new Date(formData.date),
      markdownContent: formData.markdownContent,
      slug: formData.slug,
    };

    try {
      const response = await fetch("/api/regulation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(
          data.message || data.error || "Не вдалося створити продукт",
        );
      }

      setStatus("успішно створено");
      setFormData((prev) => ({
        ...prev,
        name: "",
        date: "",
        markdownContent: "",
        slug: "",
      }));
    } catch (error) {
      setStatus(error.message || "Сталася помилка");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-border bg-black/30 p-5"
    >
      <h2 className="h3">Додати регуляцію</h2>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="regulation-name">Заголовок</Label>
          <Input
            id="regulation-name"
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Про нас..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="regulation-date">Дата</Label>
          <Input
            id="regulation-date"
            type="date"
            value={formData.date}
            onChange={(event) => updateField("date", event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="regulation-slug">Посилання</Label>
          <Input
            id="regulation-slug"
            value={formData.slug}
            onChange={(event) => updateField("slug", event.target.value)}
            placeholder="about-us..."
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="regulation-markdownContent">Текст регуляції</Label>
        <MDEditor
          id="regulation-markdownContent"
          value={formData.markdownContent}
          onChange={(val) => updateField("markdownContent", val)}
          className="min-h-20 w-full rounded-3xl border-2 border-secondary bg-white px-3 py-2 text-primary"
          preview="edit"
        />
      </div>
      <Button
        type="submit"
        className="py-2 px-4 rounded-full text-xl items-center text-center"
      >
        Створити регуляцію
      </Button>
      {status && <p className="text-sm text-secondary">{status}</p>}
    </form>
  );
}
