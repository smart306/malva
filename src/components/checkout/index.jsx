"use client"
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";
import { clearCart, getCart, getCartTotal } from "@/lib/cart/cart";
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
export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Вкажіть ПІБ"),
  phone: z
    .string()
    .min(8, "Вкажіть телефон")
    .transform((val) => val.replace(/[^0-9+\s\-()]/g, ""))
    .refine((val) => /^\+?[0-9\s\-()]+$/.test(val), {
      message: "Некоректний телефон (дозволені лише цифри та знаки +, -, ())",
    }),
});

export default function Checkout(){
    const [isPending, startTransition] = useTransition(); 
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
        const items = getCart();
        setCartItems(items);
        setTotal(getCartTotal());
    }, []);
    
    const form = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: "", 
            phone: ""
        }
    })
    const onSubmit = (values) => {
        const data = {
            ...values, 
            cartItems, 
            total
        }
        startTransition(async () => {
            const result = await submitCheckout(data)
            if (!result?.ok) {
              console.error(result?.error || "Submit failed");
              return;
            }
            clearCart(); 
            form.reset();
        } ) 
    }
    return (
      <div>
        <div className="my-container">
          <div className="flex flex-col justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-primary">ПІБ</FormLabel>
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
                      <FormLabel className="font-primary">Телефон</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+380..."
                          disabled={isPending}
                          {...field}
                          onChange={(e) => {
                            const cleanedValue = e.target.value.replace(/[^0-9+\s\-()]/g, "");
                            field.onChange(cleanedValue);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-1 rounded-xl"
                >
                  {isPending ? "Відправка..." : "Оформити"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
}