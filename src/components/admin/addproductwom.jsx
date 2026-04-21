"use client";

import { Button } from "../ui/button";

export default function AddProductWomanButton() {
  async function addProduct() {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Beauty of Joseon, Dynasty Cream 50мл",
        description: "Крем для обличчя",
        ratingFull: 4,
        ratingHalf: 1,
        price: 120,
        brand: "Beauty of Joseon",
        maincategory: "Жіноча доглядова косметика",
        subcategory1: "Обличчя",
        subcategory2: "Крем",
        images: ["/1823.jpg", "/1823.jpg", "/1823.jpg", "/1823.jpg"],
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

  return <Button onClick={addProduct}>Додати товар wom</Button>;
}

