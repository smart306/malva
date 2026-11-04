"use client"
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { clearCart, getCart } from "@/lib/cart/cart";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { submitCheckout } from "@/lib/actions/checkout";
import { DialogClose } from "../ui/dialog";
export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Вкажіть ПІБ"),
  phone: z
    .string()
    .min(8, "Вкажіть телефон")
    .transform((val) => val.replace(/[^0-9+\s\-()]/g, ""))
    .refine((val) => /^\+?[0-9\s\-()]+$/.test(val), {
      message: "Некоректний телефон (дозволені лише цифри та знаки +, -, ())",
    }),
  address: z.string().min(2, "Вкажіть адресу"),
});

export default function Checkout({
  selectedDostavka,
  earnedPoints,
  usedPoints,
  finalTotal,
  total,
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
    },
  });
  const deliveryPrice = Number(selectedDostavka?.price);

  const onSubmit = (values) => {
    const currentCartItems = getCart();
    if (currentCartItems.length === 0) {
      return;
    }
    const data = {
      ...values,
      cartItems: currentCartItems,
      total,
      finalTotal,
      selectedDostavka,
      earnedPoints,
      appliedPoints: usedPoints,
    };

    startTransition(async () => {
      const result = await submitCheckout(data)
      if (!result?.ok) {
        console.error(result?.error || "Submit failed");
        return;
      }
      clearCart();
      window.dispatchEvent(new Event("cartUpdated"));
      form.reset();
      router.push("/cart");
    });
  };

  return (
    <div>
      <div className="my-container">
        <div className="flex flex-col font-primary justify-center max-w-md mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-primary text-xl">ПІБ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Іваненко Іван Іванович"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-primary text-xl">
                      Телефон
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+380..."
                        disabled={isPending}
                        {...field}
                        onChange={(e) => {
                          const cleanedValue = e.target.value.replace(
                            /[^0-9+\s\-()]/g,
                            "",
                          );
                          field.onChange(cleanedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-primary text-xl">
                      Адреса
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Львів вул Зелена 50"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-2 space-y-1">
                <div className="flex justify-between text-secondary text-xl">
                  <span>Товари:</span>
                  <span>{total.toFixed(2)} грн</span>
                </div>
                <div className="flex justify-between text-secondary text-xl">
                  <span>Доставка:</span>
                  <span>{deliveryPrice.toFixed(2)} грн</span>
                </div>
                {usedPoints > 0 && (
                  <div className="flex justify-between text-secondary text-xl">
                    <span>Списано балів:</span>
                    <span>-{usedPoints.toFixed(2)} грн</span>
                  </div>
                )}
                <div className="pt-2 border-t border-border flex justify-between items-center h3">
                  <span>Всього до сплати:</span>
                  <span>{finalTotal.toFixed(2)} грн</span>
                </div>
              </div>
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-1 rounded-xl"
                >
                  {isPending ? "Відправка..." : "Оформити"}
                </Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}