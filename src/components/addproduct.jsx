"use client";

import { Button } from "./ui/button";

export default function AddProductButton() {
  async function addProduct() {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          id: 12,
          title: "Yves Saint Laurent Pur Couture Lipstick",
          description:
            "Помада для вечірнього макіяжу. Скрасить будь-який образ",
          ratingFull: 4,
          ratingHalf: 1,
          price: 120,
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
              content:
                "Помада для вечірнього макіяжу. Скрасить будь-який образ",
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
                "Бренд Yves Saint Laurent – ​​це символ унікальності, креативності та розкоші. Він відомий не лише у сфері моди, а й у світі косметики та парфумерії. Відкрийте для себе ексклюзивний світ, за яким стоїть один із найвпливовіших модельєрів. Дозвольте собі зачаруватися фірмовим стилем, який створює суть YSL – коли краса стає жестом Ів Сен-Лоран був однією з найшанованіших постатей моди 20-го століття. Протягом своєї більш ніж 40-річної кар'єри він формував і змінював модні тенденції. Він вважав, що краса є абсолютним вираженням характеру. У віці 25 років він очолив модний будинок Dior, ставши наймолодшим художнім керівником у світі високої моди. Він представив світові власний бренд у 1961 році. Косметика, декоративна косметика та оригінальні жіночі та чоловічі парфуми від Yves Saint Laurent несуть у собі послання та ім'я їхнього засновника. Чи будете ви вражені унікальною композицією жіночого аромату Yves Saint Laurent Black Opium, чи радше зачаровані ароматом свободи Yves Saint Laurent Libre? І що краще досконалішатиме вашу шкіру, ніж лінія макіяжу YSL Touche Éclat? Панове, відчуйте її також, чоловіча парфумова вода Yves Saint Laurent La Nuit de L'Homme втілює мужність та силу. Так само, як YSL уособлює розкішну роботу в кожному продукті.",
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
              color: "bg-color-3",
            },
            {
              id: 3,
              color: "bg-color-4",
            },
            {
              id: 4,
              color: "bg-color-9",
            },
            {
              id: 5,
              color: "bg-color-5",
            },
            {
              id: 6,
              color: "bg-color-12",
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
        }
      ),
    });

    const data = await res.json();
    console.log(data);
  }

  return <Button onClick={addProduct}>Додати товар</Button>;
}