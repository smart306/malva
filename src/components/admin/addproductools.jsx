"use client";

import { Button } from "../ui/button";

export default function AddProductToolsButton() {
  async function addProduct() {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Medicube AGE-R Booster Pro EX",
        description: "Medicube",
        ratingFull: 4,
        ratingHalf: 1,
        price: 120,
        brand: "Medicube",
        maincategory: "Інструменти для догляду",
        subcategory: "Обличчя",
        images: [
          "/Знімок екрана 2026-04-20 204316.png",
          "/Знімок екрана 2026-04-20 204316.png",
          "/Знімок екрана 2026-04-20 204316.png",
          "/Знімок екрана 2026-04-20 204316.png",
        ],
        info: [
          {
            id: 1,
            acoritem: "Опис",
            content: "Medicube",
          },
          {
            id: 2,
            acoritem: "Характеристики",
            content: "bla bla",
          },
          {
            id: 3,
            acoritem: "Про бренд",
            content: "бла бла",
          },
          {
            id: 4,
            acoritem: "Інша інформація",
            content: "otherinfo",
          },
        ],
        reviews: [
          {
            id: 1,
            name: "Ім’я користувача",
            review: "Відгук. Великий текст",
          },
          {
            id: 2,
            name: "Ім’я користувача",
            review: "Відгук. Великий текст",
          },
          {
            id: 3,
            name: "Ім’я користувача",
            review: "Відгук. Великий текст",
          },
          {
            id: 4,
            name: "Ім’я користувача",
            review: "Відгук. Великий текст",
          },
          {
            id: 5,
            name: "Ім’я користувача",
            review: "Відгук. Великий текст",
          },
          {
            id: 6,
            name: "Ім’я користувача",
            review: "Відгук. Великий текст",
          },
        ],
      }),
    });

    const data = await res.json();
    console.log(data);
  }

  return <Button onClick={addProduct}>Додати товар tools</Button>;
}

