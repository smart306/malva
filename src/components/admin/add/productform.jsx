"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function parseLines(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseMappedLines(value) {
  return parseLines(value)
    .map((line, index) => {
      const parts = line.split("|").map((item) => item.trim());
      if (parts.length < 2) {
        return null;
      }
      return {
        id: index + 1,
        left: parts[0],
        right: parts.slice(1).join(" | "),
      };
    })
    .filter(Boolean);
}

export default function ProductForm() {
  const [categories, setCategories] = useState([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [status, setStatus] = useState("");
  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    rating: 0,
    brand: "",
    maincategory: "",
    subcategories: [],
    quantity: 0,
    imagesText: "",
    infoText: "",
    colorsText: "",
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        if (!response.ok || !data.success) return;

        const categoryList = Array.isArray(data.categories)
          ? data.categories
          : [];
        setCategories(categoryList);

        if (categoryList.length > 0) {
          const firstCategory = categoryList[0];
          const initialSlug = firstCategory.slug;

          setFormData((prev) => ({ ...prev, maincategory: initialSlug }));
          setAvailableSubcategories(firstCategory.subcategories || []);
        }
      } catch {
        setCategories([]);
      }
    }
    loadCategories();
  }, []);


  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleMainCategoryChange(slug) {
    updateField("maincategory", slug);

    const selectedCat = categories.find(
      (cat) => (cat.slug || cat.maincategory) === slug,
    );

    const subs = selectedCat?.subcategories || [];
    setAvailableSubcategories(subs);

    updateField("subcategories", []);
  }

  function handleSubcategoryToggle(subName) {
    setFormData((prev) => {
      const exists = prev.subcategories.includes(subName);
      const updated = exists
        ? prev.subcategories.filter((item) => item !== subName)
        : [...prev.subcategories, subName];
      return { ...prev, subcategories: updated };
    });
  }

  async function handleUploadImages(event) {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setStatus("");

    try {
      setIsUploadingImages(true);
      const uploadedUrls = [];

      for (const file of files) {
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

        uploadedUrls.push(data.url);
      }

      setUploadedImages((prev) => [...prev, ...uploadedUrls]);
      setStatus(`Завантажено ${uploadedUrls.length} зображень`);
    } catch (error) {
      setStatus(error.message || "Помилка завантаження зображень");
    } finally {
      setIsUploadingImages(false);
      event.target.value = "";
    }
  }

  function removeUploadedImage(url) {
    setUploadedImages((prev) => prev.filter((item) => item !== url));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.brand.trim()
    ) {
      setStatus("Заповніть title, description, brand");
      return;
    }

    if (!formData.price || Number.isNaN(Number(formData.price))) {
      setStatus("Ціна має бути числом");
      return;
    }

    const manualImages = parseLines(formData.imagesText);
    const images = [...uploadedImages, ...manualImages];
    if (images.length === 0) {
      setStatus("Додайте хоча б одне зображення через upload або URL");
      return;
    }

    const info = parseMappedLines(formData.infoText).map((item) => ({
      id: item.id,
      acoritem: item.left,
      content: item.right,
    }));

    const colors = parseMappedLines(formData.colorsText).map((item) => ({
      id: item.id,
      color: item.left,
      quantity: Number(item.right),
    }));

    let calculatedQuantity = 0;

    for (const item of colors) {
      calculatedQuantity += Number(item.quantity);
    }

    const finalQuantity =
      colors.length > 0 ? calculatedQuantity : Number(formData.quantity) || 0;

    const payload = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      brand: formData.brand,
      maincategory: formData.maincategory,
      rating: formData.rating,
      quantity: finalQuantity,
      subcategories: formData.subcategories,
      colors,
      images,
      info,
    };

    if (
      formData.maincategory === "decor") {
      payload.colors = colors;
    }

    try {
      const response = await fetch("/api/products", {
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

      setStatus("Продукт успішно створено");
      setFormData((prev) => ({
        ...prev,
        title: "",
        description: "",
        price: "",
        brand: "",
        rating: 0,
        quantity: "",
        subcategories: [],
        imagesText: "",
        infoText: "",
        colorsText: "",
      }));
      setUploadedImages([]);
    } catch (error) {
      setStatus(error.message || "Сталася помилка");
    } 
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-border bg-black/30 p-5 font-primary"
    >
      <h2 className="h3">Додати продукт</h2>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="product-title">Назва</Label>
          <Input
            id="product-title"
            value={formData.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="Назва..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-brand">Бренд</Label>
          <Input
            id="product-brand"
            value={formData.brand}
            onChange={(event) => updateField("brand", event.target.value)}
            placeholder="NYX..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-description">Опис</Label>
        <textarea
          id="product-description"
          value={formData.description}
          onChange={(event) => updateField("description", event.target.value)}
          className="min-h-20 w-full rounded-3xl border-2 border-secondary bg-input px-3 py-2 text-primary"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="product-price">Ціна</Label>
          <Input
            id="product-price"
            type="number"
            min="0"
            value={formData.price}
            onChange={(event) => updateField("price", event.target.value)}
            placeholder="100..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-maincategory">Головна категорія</Label>
        <select
          id="product-maincategory"
          value={formData.maincategory}
          onChange={(event) => handleMainCategoryChange(event.target.value)}
          className="w-full rounded-full border-2 border-secondary bg-input px-3 py-2 text-primary"
        >
          {categories.length === 0 ? (
            <option value="">Немає доступних категорій</option>
          ) : (
            categories.map((cat) => {
              const value = cat.slug;
              return (
                <option key={cat._id || value} value={value}>
                  {cat.maincategory}
                </option>
              );
            })
          )}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Підкатегорії</Label>
        {availableSubcategories.length === 0 ? (
          <p className="text-sm text-secondary">
            Для цієї категорії ще немає підкатегорій
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 pt-1">
            {availableSubcategories.map((sub) => {
              const isSelected = formData.subcategories.includes(sub);
              return (
                <button
                  type="button"
                  key={sub}
                  onClick={() => handleSubcategoryToggle(sub)}
                  className={`rounded-full px-3 py-1 text-sm transition-colors ${
                    isSelected
                      ? "bg-primary text-secondary"
                      : "bg-white/10 text-primary hover:bg-white/20"
                  }`}
                >
                  {isSelected ? `✓ ${sub}` : sub}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {formData.maincategory !== "decor" ? (
        <div className="space-y-2">
          <Label htmlFor="product-quantity">Кількість (загальна)</Label>
          <Input
            id="product-quantity"
            type="number"
            min="0"
            value={formData.quantity}
            onChange={(e) => updateField("quantity", e.target.value)}
            placeholder="10..."
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="product-colors">
            Кольори та кількість (формат: Колір | Індекс | Кількість)
          </Label>
          <textarea
            id="product-colors"
            value={formData.colorsText}
            onChange={(e) => updateField("colorsText", e.target.value)}
            placeholder="bg-color-1 | 5&#10;bg-color-2 | 10"
            className="placeholder-primary min-h-24 w-full rounded-3xl border-2 border-secondary bg-input px-3 py-2 text-primary"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="product-images-upload">
          Завантажити зображення у Blob
        </Label>
        <Input
          id="product-images-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleUploadImages}
          disabled={isUploadingImages}
        />
        {isUploadingImages ? (
          <p className="text-sm text-secondary">Завантаження зображень...</p>
        ) : null}

        {uploadedImages.length > 0 ? (
          <div className="space-y-2 rounded-2xl border border-border p-3">
            <p className="text-sm">Завантажені зображення:</p>
            <div className="space-y-2">
              {uploadedImages.map((url) => (
                <div
                  key={url}
                  className="flex items-center justify-between gap-3"
                >
                  <p className="truncate text-xs">{url}</p>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => removeUploadedImage(url)}
                  >
                    Видалити
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-info">
          Інформація (формат рядка: Назва|Текст)
        </Label>
        <textarea
          id="product-info"
          value={formData.infoText}
          onChange={(event) => updateField("infoText", event.target.value)}
          placeholder="Опис|Короткий опис&#10;Склад|Склад продукту"
          className="placeholder-primary min-h-24 w-full rounded-3xl border-2 border-secondary bg-input px-3 py-2 text-primary"
        />
      </div>
      <Button
        type="submit"
        className="py-2 px-4 rounded-full text-xl items-center text-center"
      >
        Створити продукт
      </Button>

      {status ? <p className="text-sm text-secondary">{status}</p> : null}
    </form>
  );
}