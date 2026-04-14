"use server";
import { z } from "zod";
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Вкажіть ПІБ"),
  phone: z
    .string()
    .min(8, "Вкажіть телефон")
    .regex(/^\+?[0-9\s\-()]+$/, "Некоректний телефон"),
});

export async function submitCheckout(payload) {
  try {
    const formData = checkoutSchema.parse({
      fullName: payload.fullName,
      phone: payload.phone,
    });

    const items = payload.cartItems || [];
    const totalPrice = payload.total || 0;

    if (!items.length) {
      return { ok: false, error: "Cart is empty" };
    }

    const itemsText = items
      .map((item, index) => {
        const name = item.title || "Без назви";
        const quantity = item.quantity || item.qty || 1;
        const price = item.price || 0;

        return `${index + 1}. ${name} | ${quantity} шт | ${price} грн`;
      })
      .join("\n");

    const text = `
Нове замовлення

ПІБ: ${formData.fullName}
Телефон: ${formData.phone}

Товари:
${itemsText}

Загальна сума: ${totalPrice} грн
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
        }),
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return { ok: false, error: await response.text() };
    }
    
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error?.message || "Unknown error",
    };
  }
}