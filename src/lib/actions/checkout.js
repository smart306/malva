"use server";
import { z } from "zod";
import { connectDB } from "../mongoose";
import ProductModel from "../models/products";
import { auth } from "@/auth";
import User from "@/lib/models/user";
import { getCart } from "../cart/cart";
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Вкажіть ПІБ"),
  phone: z
    .string()
    .min(8, "Вкажіть телефон")
    .regex(/^\+?[0-9\s\-()]+$/, "Некоректний телефон"),
  address: z.string().min(2, "Вкажіть адресу"),
});

export async function submitCheckout(payload) {
  const cart = getCart();
  const session = await auth();
  const userId = session?.user?.id || null;
  await connectDB();
  const user = await User.findById(session.user.id).select("points").lean();
  try {
    const formData = checkoutSchema.parse({
      fullName: payload.fullName,
      phone: payload.phone,
      address: payload.address,
      cart,
    });

    const items = payload.cartItems;
    const totalPrice = payload.total;
    const selectedDostavka = payload.selectedDostavka;
    let earnedPoints = payload.earnedPoints || 0;
    const appliedPoint = Number(payload.appliedPoints) || 0;
    const deliveryName = selectedDostavka.name;
    let finalPointsBalance = 0;
    const currentPoints = Number(user.points);
    const afterDeduction = currentPoints - appliedPoint; 
    finalPointsBalance = afterDeduction + earnedPoints;

    if (!items.length) {
      return { ok: false, error: "Пустий кошик" };
    }

    const itemsText = items
      .map((item, index) => {
        const name = item.title;
        const quantity = item.quantity;
        const price = item.price;
        if (item.maincategory === "decor") {
          const color = item.color.color; 
          return `${index + 1}. ${name} | ${color} | ${quantity} шт | ${price} грн`;
        } else {
          return `${index + 1}. ${name} | ${quantity} шт | ${price} грн`;
        }
        
        
      })
      .join("\n");

    const text = `
Нове замовлення

ПІБ: ${formData.fullName}
Телефон: ${formData.phone}
Адреса: ${formData.address}

Товари:
${itemsText}
 
Доставка: ${deliveryName}, 
Бали: ${appliedPoint}, 
Загальна сума: ${totalPrice} грн
    `.trim();

    const responseTelegram = await fetch(
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

    if (!responseTelegram.ok) {
      return { ok: false, error: await responseTelegram.text() };
    }

    for (let item of items) {
      if (item.maincategory === "decor") {
        const colorId = item.color._id;
        await ProductModel.updateOne(
          {
            _id: item._id,
            "colors._id": colorId,
          },
          {
            $inc: {
              quantity: -item.quantity,
              "colors.$.quantity": -item.quantity,
            },
          },
        );
      } else {
        await ProductModel.updateOne(
          { _id: item._id },
          { $inc: { quantity: -item.quantity } },
        );
      }
    }
    const orderBody = {
      products: items.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        color: item.color?.color || "",
      })),
      totalPrice,
      date: new Date(),
      user: userId,
      name: formData.fullName,
      phone: formData.phone,
      address: formData.address,
      dostavka: deliveryName,
      pointsRecieved: earnedPoints,
      pointsApplied: Number(appliedPoint),
    };
    const baseUrl = "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderBody),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(
        data.message || data.error || "Не вдалося створити замовлення",
      );
    }
    const createdOrderId = data.order._id;
    if (userId && user && createdOrderId) {
      await User.findByIdAndUpdate(userId, {
        $push: { pastorders: createdOrderId },
        $set: { points: finalPointsBalance },
      });
    }
    return { ok: true, orderId: createdOrderId };
  } catch (error) {
    return {
      ok: false,
      error: error?.message || "Unknown error",
    };
  }
}