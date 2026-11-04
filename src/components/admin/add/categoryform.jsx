"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

export default function CategoryForm() {
  const [formData, setFormData] = useState({
    maincategory: "",
    subcategories: [],
    slug: "",
    image: "",
  });
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [status, setStatus] = useState("");

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleUploadImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus("");

    try {
      setIsUploadingImage(true);

      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body,
      });

      const data = await response.json();
      if (!response.ok || !data.success || !data.url) {
        throw new Error(data.message || "Не вдалося завантажити зображення");
      }

      updateField("image", data.url);
      setStatus("Зображення завантажено");
    } catch (error) {
      setStatus(error.message || "Помилка завантаження зображення");
    } finally {
      setIsUploadingImage(false);
    }
  }

  function removeUploadedImage() {
    updateField("image", "");
  }

  const handleAddSubcategory = () => {
    const trimmed = subCategoryInput.trim();

    if (trimmed && !formData.subcategories.includes(trimmed)) {
      updateField("subcategories", [...formData.subcategories, trimmed]);
      setSubCategoryInput("");
    }
  };
  
 const handleRemoveSubcategory = (categoryToRemove) => {
    updateField(
      "subcategories",
      formData.subcategories.filter((cat) => cat !== categoryToRemove)
    );
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (!formData.maincategory.trim()) {
      setStatus("Вкажіть назву категорії");
      return;
    }

    try {
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
      setFormData({
        maincategory: "",
        subcategories: [],
        slug: "",
        image: "",
      });
    } catch (error) {
      setStatus(error.message || "Сталася помилка");
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
          value={formData.maincategory}
          onChange={(event) => updateField("maincategory", event.target.value)}
          placeholder="Декоративна косметика..."
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="subcategory-input">Підкатегорії</Label>

        <div className="flex gap-2">
          <Input
            id="subcategory-input"
            value={subCategoryInput}
            onChange={(e) => setSubCategoryInput(e.target.value)}
            placeholder="Губи..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSubcategory();
              }
            }}
          />
          <Button
            type="button"
            onClick={handleAddSubcategory}
            variant="secondary"
          >
            <Plus className="h-4 w-4 mr-1" />
            Додати
          </Button>
        </div>
        {formData.subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {formData.subcategories.map((subCategory) => (
              <span
              key={subCategory}
              className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-primary">
                {subCategory}
                <Button
                  type="button"
                  onClick={() => handleRemoveSubcategory(subCategory)}
                  className="text-muted-foreground hover:text-foreground transition-colors ml-1 rounded-full outline-none"
                >
                  <X className="h-3 w-3" />
                </Button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="regulation-slug">Посилання</Label>
        <Input
          id="regulation-slug"
          value={formData.slug}
          onChange={(event) => updateField("slug", event.target.value)}
          placeholder="decor..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-images-upload">
          Завантажити зображення у Blob
        </Label>
        <Input
          id="product-images-upload"
          type="file"
          accept="image/*"
          onChange={handleUploadImage}
          disabled={isUploadingImage}
        />
        {isUploadingImage ? (
          <p className="text-sm text-secondary">Завантаження зображення...</p>
        ) : null}

        {formData.image ? (
          <div className="flex items-center gap-2 pt-2">
            <Image
              src={formData.image}
              alt="Uploaded Preview"
              width={64}
              height={64}
              style={{ height: "auto" }}
              className="object-cover rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={removeUploadedImage}
            >
              Видалити
            </Button>
          </div>
        ) : null}
      </div>

      <Button
        type="submit"
        className="py-2 px-4 rounded-full text-xl items-center text-center"
      >
        Створити категорію
      </Button>

      {status ? <p className="text-sm text-secondary">{status}</p> : null}
    </form>
  );
}