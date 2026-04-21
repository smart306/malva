"use client";

import { Button } from "../ui/button";

export default function AddProductManButton() {
  async function addProduct() {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Biotherm Homme Force Supreme Face Reshaper Cream",
        description: "Крем",
        ratingFull: 4,
        ratingHalf: 1,
        price: 120,
        brand: "Biotherm",
        maincategory: "Чоловіча доглядова косметика",
        subcategory1: "Обличчя",
        subcategory2: "Крем",
        images: [
          "/Знімок екрана 2026-04-20 203908.png",
          "/Знімок екрана 2026-04-20 203908.png",
          "/Знімок екрана 2026-04-20 203908.png",
          "/Знімок екрана 2026-04-20 203908.png",
        ],
        info: [
          {
            id: 1,
            acoritem: "Опис",
            content: "Крем",
          },
          {
            id: 2,
            acoritem: "Склад",
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

  return <Button onClick={addProduct}>Додати товар man</Button>;
}

