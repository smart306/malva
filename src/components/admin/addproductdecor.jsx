"use client";

import { Button } from "../ui/button";

export default function AddProductDecorButton() {
  async function addProduct() {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Yves Saint Lorent Pur Couture Lipstick",
        description: "Помада",
        ratingFull: 4,
        ratingHalf: 1,
        price: 120,
        brand: "Saint Lorent",
        maincategory: "Декоративна косметика",
        subcategory: "Губи",
        images: [
          "/yves-saint-loren.png",
          "/yves-saint-loren.png",
          "/yves-saint-loren.png",
          "/yves-saint-loren.png",
        ],
        info: [
          {
            id: 1,
            acoritem: "Опис",
            content: "Помада",
          },
          {
            id: 2,
            acoritem: "Склад",
            content: "bla bla",
          },
          {
            id: 3,
            acoritem: "Про бренд",
            content:
              "Yves Saint Laurent (YSL) Beauty — це французький бренд сегмента люкс, який поєднує високу моду з інноваціями у сфері краси. Заснований легендарним кутюр'є Івом Сен-Лораном у 1961 році, бренд став символом сміливості, індивідуальності та розкоші",
          },
          {
            id: 4,
            acoritem: "Інша інформація",
            content: "otherinfo",
          },
        ],
        colors: [
          {
            id: 1,
            color: "bg-color-1",
          },
          {
            id: 2,
            color: "bg-color-2",
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

  return <Button onClick={addProduct}>Додати товар decor</Button>;
}

