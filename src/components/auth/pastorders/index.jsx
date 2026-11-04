"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { addToCart } from "@/lib/cart/cart";
import { colorNames } from "@/lib/colornames";
import Image from "next/image";
import Link from "next/link";

export default function PastOrders({ data }) {
   

const handleReorder = (orderProducts) => {
  orderProducts.forEach((item) => {
    if (!item.product) return;

    for (let i = 0; i < item.quantity; i++) {
      addToCart(item.product, item.color);
    }
  });
};

  return (
    <div className="w-full py-4">
      <div className="my-container">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="grid sm:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 w-full">
            {data.map((order) => {
              const formattedDate = order.date
                ? new Date(order.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "";
    return (
      <Card key={order._id} className="w-full">
        <CardHeader className="w-full">
          <div>
            <p>{formattedDate}</p>
            <p>{order.totalPrice} ₴</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col w-full">
          {order.products.map((item) => {
            if (!item.product) {
              return (
                <div key={item._id || index} className="w-full py-2">
                  <p className="text-sm text-muted-foreground">
                    Продукт був видалений з магазину
                  </p>
                  <span className="text-xs">{item.quantity} шт.</span>
                  <div className="border-b border-secondary w-full my-2" />
                </div>
              );
            }
            const matchedColor = colorNames.find(
              (col) => col.index === item.color,
            );
            const colorDisplayName = matchedColor ? matchedColor.name : "";
            return (
              <div key={item.product._id} className="w-full">
                <Link
                  href={`/catalog/product/${item.product._id}`}
                  className="w-full flex"
                >
                  <Card className="w-full h-full flex flex-row justify-between hover:scale-110 my-transition">
                    <CardContent>
                      <div className="relative aspect-square w-24 sm:w-12 h-auto bg-white rounded-lg">
                        <Image
                          src={item.product.images[0].image || "/images1.svg"}
                          alt="p"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </CardContent>
                    <CardHeader className="flex! flex-col sm:flex-row items-center px-0 justify-between w-full">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <h2 className="text-secondary font-secondary">
                          {item.product.title}
                        </h2>
                      </div>
                      <div className="flex flex-col text-center">
                        <div
                          className="w-5 h-5 rounded-full border shadow-sm inline-block"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <p className="text-[12px]">{colorDisplayName}</p>
                      </div>
                    </CardHeader>

                    <CardFooter className="flex px-2 justify-between items-center">
                      <p className="font-secondary text-base">
                        {item.product.price}
                      </p>
                    </CardFooter>
                  </Card>
                </Link>
                <span>{item.quantity} шт.</span>
                <div className="border border-secondary w-full my-2" />
              </div>
            );
          })}
        </CardContent>
        <CardFooter className="w-full">
          <Button
            onClick={() => handleReorder(order.products)}
            className="w-full p-2 text-xl rounded-full"
          >
            Замовити ще раз
          </Button>
        </CardFooter>
      </Card>
    );})}
          </div>
        </div>
      </div>
    </div>
  );
}