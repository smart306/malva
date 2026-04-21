"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAIN_CATEGORIES = [
  "Декоративна косметика",
  "Жіноча доглядова косметика",
  "Чоловіча доглядова косметика",
  "Інструменти для догляду",
];

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
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ratingFull: 5,
    ratingHalf: 0,
    price: "",
    brand: "",
    maincategory: MAIN_CATEGORIES[0],
    subcategory: "",
    subcategory1: "",
    subcategory2: "",
    imagesText: "",
    infoText: "",
    colorsText: "",
    reviewsText: "",
  });

  const singleSubcategory = useMemo(() => {
    return (
      formData.maincategory === "Декоративна косметика" ||
      formData.maincategory === "Інструменти для догляду"
    );
  }, [formData.maincategory]);

  const categoriesForCurrentMain = useMemo(() => {
    return categories.filter((item) => item.maincategory === formData.maincategory);
  }, [categories, formData.maincategory]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        if (!response.ok || !data.success) {
          return;
        }
        setCategories(Array.isArray(data.categories) ? data.categories : []);
      } catch {
        setCategories([]);
      }
    }

    loadCategories();
  }, []);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleUploadImages(event) {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
      return;
    }

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

  function applyCategory(categoryId) {
    setSelectedCategoryId(categoryId);
    if (!categoryId) {
      return;
    }

    const selected = categories.find((item) => item._id === categoryId);
    if (!selected) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      maincategory: selected.maincategory,
      subcategory: selected.subcategory || "",
      subcategory1: selected.subcategory1 || "",
      subcategory2: selected.subcategory2 || "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");

    if (!formData.title.trim() || !formData.description.trim() || !formData.brand.trim()) {
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

    if (singleSubcategory && !formData.subcategory.trim()) {
      setStatus("Для цієї категорії потрібне поле subcategory");
      return;
    }

    if (!singleSubcategory && (!formData.subcategory1.trim() || !formData.subcategory2.trim())) {
      setStatus("Для цієї категорії потрібні поля subcategory1 та subcategory2");
      return;
    }

    const info = parseMappedLines(formData.infoText).map((item) => ({
      id: item.id,
      acoritem: item.left,
      content: item.right,
    }));

    const reviews = parseMappedLines(formData.reviewsText).map((item) => ({
      id: item.id,
      name: item.left,
      review: item.right,
    }));

    const colors = parseLines(formData.colorsText).map((color, index) => ({
      id: index + 1,
      color,
    }));

    const payload = {
      title: formData.title,
      description: formData.description,
      ratingFull: Number(formData.ratingFull),
      ratingHalf: Number(formData.ratingHalf),
      price: Number(formData.price),
      brand: formData.brand,
      maincategory: formData.maincategory,
      images,
      info,
      reviews,
    };

    if (singleSubcategory) {
      payload.subcategory = formData.subcategory;
      if (formData.maincategory === "Декоративна косметика") {
        payload.colors = colors;
      }
    } else {
      payload.subcategory1 = formData.subcategory1;
      payload.subcategory2 = formData.subcategory2;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || "Не вдалося створити продукт");
      }

      setStatus("Продукт успішно створено");
      setFormData((prev) => ({
        ...prev,
        title: "",
        description: "",
        price: "",
        brand: "",
        imagesText: "",
        infoText: "",
        colorsText: "",
        reviewsText: "",
      }));
      setUploadedImages([]);
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
      <h2 className="h3">Додати продукт</h2>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="product-title">Title</Label>
          <Input
            id="product-title"
            value={formData.title}
            onChange={(event) => updateField("title", event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-brand">Brand</Label>
          <Input
            id="product-brand"
            value={formData.brand}
            onChange={(event) => updateField("brand", event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-description">Description</Label>
        <textarea
          id="product-description"
          value={formData.description}
          onChange={(event) => updateField("description", event.target.value)}
          className="min-h-20 w-full rounded-3xl border-2 border-secondary bg-input px-3 py-2 text-black"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="product-price">Price</Label>
          <Input
            id="product-price"
            type="number"
            min="0"
            value={formData.price}
            onChange={(event) => updateField("price", event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-rating-full">Rating Full (0-5)</Label>
          <Input
            id="product-rating-full"
            type="number"
            min="0"
            max="5"
            value={formData.ratingFull}
            onChange={(event) => updateField("ratingFull", event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-rating-half">Rating Half (0 або 1)</Label>
          <Input
            id="product-rating-half"
            type="number"
            min="0"
            max="1"
            value={formData.ratingHalf}
            onChange={(event) => updateField("ratingHalf", event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-maincategory">Головна категорія</Label>
        <select
          id="product-maincategory"
          value={formData.maincategory}
          onChange={(event) => {
            updateField("maincategory", event.target.value);
            setSelectedCategoryId("");
          }}
          className="w-full rounded-full border-2 border-secondary bg-input px-3 py-2 text-black"
        >
          {MAIN_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="saved-category">Вибрати зі збережених категорій (необов'язково)</Label>
        <select
          id="saved-category"
          value={selectedCategoryId}
          onChange={(event) => applyCategory(event.target.value)}
          className="w-full rounded-full border-2 border-secondary bg-input px-3 py-2 text-black"
        >
          <option value="">Не вибрано</option>
          {categoriesForCurrentMain.map((item) => {
            const subtitle = item.subcategory
              ? item.subcategory
              : `${item.subcategory1 || ""} / ${item.subcategory2 || ""}`;

            return (
              <option key={item._id} value={item._id}>
                {`${item.name} (${subtitle})`}
              </option>
            );
          })}
        </select>
      </div>

      {singleSubcategory ? (
        <div className="space-y-2">
          <Label htmlFor="product-subcategory">subcategory</Label>
          <Input
            id="product-subcategory"
            value={formData.subcategory}
            onChange={(event) => updateField("subcategory", event.target.value)}
          />
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="product-subcategory1">subcategory1</Label>
            <Input
              id="product-subcategory1"
              value={formData.subcategory1}
              onChange={(event) => updateField("subcategory1", event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-subcategory2">subcategory2</Label>
            <Input
              id="product-subcategory2"
              value={formData.subcategory2}
              onChange={(event) => updateField("subcategory2", event.target.value)}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="product-images-upload">Завантажити зображення у Blob</Label>
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
                <div key={url} className="flex items-center justify-between gap-3">
                  <p className="truncate text-xs">{url}</p>
                  <Button type="button" variant="secondary" onClick={() => removeUploadedImage(url)}>
                    Видалити
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-images">Або вставте URL зображень (кожен з нового рядка)</Label>
        <textarea
          id="product-images"
          value={formData.imagesText}
          onChange={(event) => updateField("imagesText", event.target.value)}
          placeholder="/img1.jpg&#10;/img2.jpg"
          className="min-h-24 w-full rounded-3xl border-2 border-secondary bg-input px-3 py-2 text-black"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-info">Info (формат рядка: Назва|Текст)</Label>
        <textarea
          id="product-info"
          value={formData.infoText}
          onChange={(event) => updateField("infoText", event.target.value)}
          placeholder="Опис|Короткий опис&#10;Склад|Склад продукту"
          className="min-h-24 w-full rounded-3xl border-2 border-secondary bg-input px-3 py-2 text-black"
        />
      </div>

      {formData.maincategory === "Декоративна косметика" ? (
        <div className="space-y-2">
          <Label htmlFor="product-colors">Colors (кожен клас кольору з нового рядка)</Label>
          <textarea
            id="product-colors"
            value={formData.colorsText}
            onChange={(event) => updateField("colorsText", event.target.value)}
            placeholder="bg-color-1&#10;bg-color-2"
            className="min-h-24 w-full rounded-3xl border-2 border-secondary bg-input px-3 py-2 text-black"
          />
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="product-reviews">Reviews (формат рядка: Ім'я|Відгук)</Label>
        <textarea
          id="product-reviews"
          value={formData.reviewsText}
          onChange={(event) => updateField("reviewsText", event.target.value)}
          placeholder="Олена|Дуже сподобалось"
          className="min-h-24 w-full rounded-3xl border-2 border-secondary bg-input px-3 py-2 text-black"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Збереження..." : "Створити продукт"}
      </Button>

      {status ? <p className="text-sm text-secondary">{status}</p> : null}
    </form>
  );
}
