"use client"; 
import Image from "next/image";
import Background from "../background";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Car, Heart, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { changeCartQuantity, getCart, getCartTotal, removeCart } from "@/lib/cart/cart";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import CardProduct from "../category/cardpro";

export default function Cart({data}){
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(() => {
      const items = getCart();
      setCartItems(items);
      setTotal(getCartTotal());
    
    }, []);

    const handleQuantityChange = (productId, delta) => {
      const updated = changeCartQuantity(productId, delta);
      setCartItems(updated);
      setTotal(getCartTotal()); 
    };

    const handleRemove = (productId) => {
        const updatedCart = removeCart(productId); 
        setCartItems(updatedCart); 
        setTotal(getCartTotal()); 
    };

    if (cartItems.length === 0) return (
      <div className="relative overflow-hidden">
        <div className="absolute hidden lg:block w-full h-full -z-10">
          <Background />
        </div>
        <div className="my-container">
          <div className="bg-primary pt-16 lg:pt-28 w-full h-full px-4 pb-12">
            <div className="p-2">
              <h1 className="h1 text-white text-center">Замовлення</h1>
            </div>
            <div className="flex flex-col-reverse lg:flex-col">
              <div className="w-full">
                <div className="space-y-4">
                  <p className="font-primary text-white h3 text-center">Немає продуктів у кошику</p>
                </div>
              </div>
              <div className="flex flex-col-reverse lg:flex-row space-x-4">
                <div className="w-full py-4 space-y-4">
                  <div className="bg-secondary text-primary font-primary rounded-xl px-4 py-2">
                    <h2>
                      Ваше замовлення буде готове до відправлення: сьогодні
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 font-primary lg:grid-rows-3 gap-4">
                    <div className="bg-secondary rounded-xl text-primary p-4">
                      <p className="font-bold">Використайте накопичені бали!</p>
                      <p>
                        Просто <span className="font-bold">увійдіть</span>!
                      </p>
                    </div>
                    <div className="bg-secondary rounded-xl text-primary col-start-1 p-4">
                      <p>
                        Після оплати цього замовлення ви
                        отримаєте 1249,00  балів у програмі лояльності.
                      </p>
                    </div>
                    <div className="bg-secondary rounded-xl text-primary text-center col-start-1 py-4 p-2 space-y-2">
                      <p>Введіть код знижки</p>
                      <Input />
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
                        До оплати: 0$
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="h1 text-white text-center p-4">Замовити знову</h1>
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                  {data.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
                    >
                      <CardProduct item={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    ); 
    return (
      <div className="relative overflow-hidden">
        <div className="absolute hidden lg:block w-full h-full -z-10">
          <Background />
        </div>
        <div className="my-container">
          <div className="bg-primary pt-16 lg:pt-28 w-full h-full px-4 pb-12">
            <div className="p-2">
              <h1 className="h1 text-white text-center">Замовлення</h1>
            </div>
            <div className="flex flex-col-reverse lg:flex-col">
              <div className="w-full">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card
                      key={item.id}
                      className="lg:h-24 flex flex-col sm:flex-row sm:h-20 items-center bg-secondary rounded-xl"
                    >
                      <CardContent>
                        <div className="relative aspect-square w-24 sm:w-12 h-auto bg-white rounded-lg">
                          <Image
                            src={item.image}
                            alt="p"
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      </CardContent>
                      <CardHeader className="flex! flex-col sm:flex-row justify-between text-center items-center w-full">
                        <h2 className="text-primary font-secondary text-xl lg:text-2xl">
                          {item.title}
                        </h2>
                        <p className="text-primary font-secondary text-2xl">
                          {item.price}$
                        </p>
                      </CardHeader>
                      <CardFooter className="flex w-full lg:w-fit justify-end">
                        <div className="bg-primary rounded-xl flex flex-row justify-end w-full lg:w-48 h-12 p-2 gap-8">
                          <div className="hidden lg:flex">
                            <Button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="text-4xl p-2 bg-secondary text-primary"
                            >
                              +
                            </Button>
                            <div className="p-2 flex text-center items-center">
                              <h1 className="text-3xl font-secondary">
                                {item.quantity}
                              </h1>
                            </div>
                            <Button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="text-4xl p-2 bg-secondary text-primary"
                            >
                              -
                            </Button>
                          </div>
                          <div className="w-full flex flex-row justify-center items-center gap-2">
                            <Heart className="text-primary-foreground" />
                            <div className="lg:hidden flex flex-row items-center p-4">
                              <Button
                                onClick={() => handleQuantityChange(item.id, 1)}
                                variant="ghost"
                                className="text-2xl p-2 font-primary"
                              >
                                +
                              </Button>
                              <div className="h-full flex flex-row bg-secondary text-primary px-4 rounded-xl text-center">
                                <h1 className="text-3xl font-secondary text-center">
                                  {item.quantity}
                                </h1>
                              </div>
                              <Button
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                                 variant="ghost"
                                className="text-2xl p-2 font-primary"
                              >
                                -
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              onClick={() => handleRemove(item.id)}
                            >
                              <Trash className="text-primary-foreground" />
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex flex-col-reverse lg:flex-row space-x-4">
                <div className="w-full py-4 space-y-4">
                  <div className="bg-secondary text-primary font-primary rounded-xl px-4 py-2">
                    <h2>
                      Ваше замовлення буде готове до відправлення: сьогодні
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 font-primary lg:grid-rows-3 gap-4">
                    <div className="bg-secondary rounded-xl text-primary p-4">
                      <p className="font-bold">Використайте накопичені бали!</p>
                      <p>
                        Просто <span className="font-bold">увійдіть</span>!
                      </p>
                    </div>
                    <div className="bg-secondary rounded-xl text-primary col-start-1 p-4">
                      <p>
                        Після оплати цього замовлення ви
                        отримаєте 1249,00  балів у програмі лояльності.
                      </p>
                    </div>
                    <div className="bg-secondary rounded-xl text-primary text-center col-start-1 py-4 p-2 space-y-2">
                      <p>Введіть код знижки</p>
                      <Input />
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
                        До оплати: {total}$
                      </h1>
                    </div>
                    <div className="text-primary font-primary border-b border-primary py-2">
                      <div className="flex flex-row justify-between">
                        <h2>Вартість замовлення:</h2>
                        <h2>{total}$</h2>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h2>Доставка:</h2>
                        <h2>0$</h2>
                      </div>
                      <div className="flex flex-row justify-between">
                        <h2>Знижка:</h2>
                        <h2>-0$</h2>
                      </div>
                    </div>
                    <div className="text-center py-2">
                      <Button className="font-primary w-full p-1 rounded-xl">
                        Увійти
                      </Button>
                      <p className="font-primary text-primary">або</p>
                      <Button className="font-primary w-full p-1 rounded-xl">
                        Продовжити
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h1 className="h1 text-white text-center p-4">Замовити знову</h1>
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                  {data.map((item) => (
                    <CarouselItem
                      key={item.id}
                      className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
                    >
                      <CardProduct item={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
}