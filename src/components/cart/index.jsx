"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Car } from "lucide-react";
import Background from "../background";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Separator } from "../ui/separator";
import CardProduct from "../category/cardpro";
import Checkout from "../checkout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  getCart,
  getCartTotal,
} from "@/lib/cart/cart";
import { useRecentlyViewed } from "@/hooks/recentlyViewed";
import { useDelivery } from "@/hooks/delivery";
import CartProductBar from "./cartproductbar";
import { getUserPoints } from "@/hooks/usePoints";

export default function Cart({ session, dostavkasOptions }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { products } = useRecentlyViewed();
  const [usedPoints, setUsedPoints] = useState(0);

  const refreshCart = useCallback(() => {
    const items = getCart();
    setCartItems(items);
    setTotal(getCartTotal());
  }, []);

  const { dostavkaList, selectedDostavka, deliveryPrice, handleDostavkaChange } =
    useDelivery(dostavkasOptions);

  useEffect(() => {
    refreshCart();
    window.addEventListener("cartUpdated", refreshCart);
    return () => window.removeEventListener("cartUpdated", refreshCart);
  }, [refreshCart]);

  const finalTotal = deliveryPrice + total - usedPoints;

  const handleUsePoints = async () => {
    if (!session?.user?.id) return;

    const userPoints = await getUserPoints(session.user.id);
    const numericUserPoints = Number(userPoints);

    if (numericUserPoints < finalTotal) {
      setUsedPoints(numericUserPoints);
    } else {
      setUsedPoints(finalTotal);
    }
  };
  return (
    <div className="relative overflow-hidden">
      <div className="absolute hidden lg:block w-full h-full -z-10">
        <Background />
      </div>
      <div className="my-container">
        <Dialog>
          <div className="bg-primary pt-16 lg:pt-28 w-full h-full px-4 pb-12">
            <div className="p-2">
              <h1 className="h1 text-white text-center">Замовлення</h1>
            </div>
            {cartItems.length === 0 ? (
              <div className="w-full text-center py-12">
                <p className="font-primary text-white h3">
                  Немає продуктів у кошику
                </p>
              </div>
            ) : (
              <div className="flex flex-col-reverse lg:flex-col">
                <div className="w-full">
                  <div className="space-y-4">
                    <CartProductBar data={cartItems} />
                  </div>

                  <div className="mt-4 p-4 bg-secondary rounded-xl text-primary">
                    <label htmlFor="dostavka-select" className="block mb-2">
                      Оберіть спосіб доставки:
                    </label>
                    <select
                      id="dostavka-select"
                      className="w-full p-2 rounded-lg bg-primary text-secondary"
                      value={selectedDostavka.name}
                      onChange={handleDostavkaChange}
                    >
                      {dostavkaList.map((item) => (
                        <option key={item._id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col-reverse lg:flex-row space-x-4">
                  <div className="w-full py-4 space-y-4">
                    <div className="bg-secondary text-primary font-primary rounded-xl px-4 py-2">
                      <h2>
                        Ваше замовлення буде готове до відправлення за:{" "}
                        {selectedDostavka.time}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 font-primary lg:grid-rows-3 gap-4">
                      <div className="bg-secondary rounded-xl text-primary p-4">
                        <p className="font-bold">
                          Використайте накопичені бали!
                        </p>
                        {session?.user && (
                          <Button onClick={handleUsePoints}>Використати</Button>
                        )}
                        {!session?.user && (
                          <p>
                            Просто
                            <Link href="/login" className="font-bold">
                              увійдіть
                            </Link>
                            !
                          </p>
                        )}
                      </div>

                      <div className="bg-secondary rounded-xl text-primary col-start-1 p-4">
                        <p>
                          Після оплати цього замовлення ви отримаєте {total}
                          балів у програмі лояльності.
                        </p>
                      </div>

                      <div className="bg-secondary rounded-xl text-primary sm:row-start-1 lg:col-start-2 p-4 flex flex-row justify-between">
                        <div className="flex flex-col justify-between">
                          <p className="font-bold">Безкоштовна доставка!</p>
                          <Separator className="bg-primary" />
                          <p className="text-[12px]">
                            *Обмеження залежать від обраного способу доставки.
                          </p>
                        </div>
                        <div className="p-2">
                          <div className="bg-primary rounded-full aspect-square text-secondary p-4">
                            <Car className="w-12 h-12" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full py-4">
                    <div className="bg-secondary rounded-xl p-4">
                      <div className="font-primary border-b border-primary">
                        <h1 className="text-primary text-4xl font-bold">
                          До оплати: {finalTotal.toFixed(2)}$
                        </h1>
                      </div>
                      <div className="text-primary font-primary border-b border-primary py-2">
                        <div className="flex flex-row justify-between">
                          <h2>Вартість замовлення:</h2>
                          <h2>{total.toFixed(2)}$</h2>
                        </div>
                        <div className="flex flex-row justify-between">
                          <h2>Доставка:</h2>
                          <h2>{deliveryPrice.toFixed(2)}$</h2>
                        </div>
                        <div className="flex flex-row justify-between">
                          <h2>Використані бали:</h2>
                          <h2>{usedPoints}$</h2>
                        </div>
                      </div>
                      <div className="text-center py-2 space-y-2">
                        {!session?.user && (
                          <>
                            <Link href="/login">
                              <Button className="font-primary w-full p-1 rounded-xl">
                                Увійти
                              </Button>
                            </Link>
                            <p className="font-primary text-primary">або</p>
                          </>
                        )}
                        <DialogTrigger asChild>
                          <Button className="font-primary w-full p-1 rounded-xl">
                            Продовжити
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="p-4">
              <h1 className="h1 text-white text-center p-4">Ви переглядали</h1>
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                  {products.map((item) => (
                    <CarouselItem
                      key={item._id}
                      className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
                    >
                      <CardProduct data={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          <DialogContent className="bg-primary">
            <DialogHeader>
              <DialogTitle className="font-primary text-2xl text-center">
                Введіть свої дані для підтвердження замовлення
              </DialogTitle>
              <DialogDescription/>
            </DialogHeader>
            <Checkout
              selectedDostavka={selectedDostavka}
              earnedPoints={total}
              usedPoints={usedPoints}
              finalTotal={finalTotal}
              total={total}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
