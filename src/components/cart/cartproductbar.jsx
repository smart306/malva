import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { changeCartQuantity, removeCart } from "@/lib/cart/cart";
import { Button } from "../ui/button";
import { Heart, Trash } from "lucide-react";
import Link from "next/link";
import { toggleWishlist } from "@/lib/actions/wishlist";
import { toast } from "sonner";

export default function CartProductBar({ data }) {
  
  const handleQuantityChange = (productId, delta) => {
    changeCartQuantity(productId, delta);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemove = (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    removeCart(productId);
    window.dispatchEvent(new Event("cartUpdated"));
  };
  
    const handleWishlistToggle = async (productId, e) => {
      e.preventDefault();
      try {
        const res = await toggleWishlist(productId);
        if (res.success) {
          toast(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Щось пішло не так");
      }
    };
  return (
      <div>
        {data.map((item) => {
          const itemTotal = item.price * item.quantity;
          return (
            <Card
              key={item._id}
              className="lg:h-24 flex flex-col sm:flex-row sm:h-20 items-center bg-secondary rounded-xl my-2"
            >
              <Link
                className="w-full flex"
                href={`/catalog/product/${item._id}`}
              >
                <CardContent>
                  <div className="relative aspect-square w-24 sm:w-12 h-auto bg-white rounded-lg">
                    {item.image !== "" ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-2 text-center text-xs font-primary text-primary">
                        Фото
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardHeader className="!flex flex-col sm:flex-row justify-between text-center items-center w-full">
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <h2 className="text-primary font-secondary text-xl lg:text-2xl">
                      {item.title}
                    </h2>
                  </div>

                  <div className="text-right font-secondary">
                    <p className="text-primary text-2xl">
                      {itemTotal.toFixed(2)}$
                    </p>
                  </div>
                  {item.color !== null && (
                    <div className="flex gap-4 lg:gap-2 justify-center">
                      <div
                        className="rounded-full aspect-square w-5 h-5 border border-gray-300"
                        style={{ backgroundColor: item.color.color }}
                      ></div>
                    </div>
                  )}
                </CardHeader>
              </Link>
              <CardFooter className="flex w-full lg:w-fit justify-end">
                <div className="bg-primary rounded-xl flex flex-row justify-end w-full lg:w-48 h-12 p-2 gap-8">
                  {item.stock > item.quantity ? (
                    <div className="hidden lg:flex">
                      <Button
                        onClick={(e) => handleQuantityChange(item._id, 1, e)}
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
                        onClick={(e) => handleQuantityChange(item._id, -1, e)}
                        className="text-4xl p-2 bg-secondary text-primary"
                      >
                        -
                      </Button>
                    </div>
                  ) : (
                    <div className="hidden lg:flex">
                      <Button
                        disabled
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
                        onClick={(e) => handleQuantityChange(item._id, -1, e)}
                        className="text-4xl p-2 bg-secondary text-primary"
                      >
                        -
                      </Button>
                    </div>
                  )}

                  <div className="w-full flex flex-row justify-center items-center gap-2">
                    <Button
                      variant="ghost"
                      onClick={(e) => handleWishlistToggle(item._id, e)}
                    >
                      <Heart className="text-primary-foreground" />
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={(e) => handleRemove(item._id, e)}
                    >
                      <Trash className="text-primary-foreground" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
  );
}