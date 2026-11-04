"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Heart, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { addToCart } from "@/lib/cart/cart";
import { ToolTipButtons } from "../toolt/tooltip";
import { toast } from "sonner";
import { toggleWishlist } from "@/lib/actions/wishlist";
import { useProductRating } from "@/hooks/productrating";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { useState } from "react";
import Link from "next/link";
import { colorNames } from "@/lib/colornames";

export default function CardProduct({ data }) {
  const [chosenColor, setChosenColor] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { renderStars, formattedRating, reviewsCount } =
    useProductRating(data.reviews || []);
  const handleAddToCartClick = (e) => {
    e.preventDefault();
    if (data.maincategory === "decor") {
      setIsDialogOpen(true);
    } else {
      addToCart(data);
      toast("Продукт додано до кошика.");
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };
  const handleAddToCartWithColor = (e) => {
    e.preventDefault();
    if (!chosenColor) {
      toast.error("Будь ласка, виберіть колір продукту.");
      return;
    }
    addToCart(data, chosenColor);
    toast("Продукт додано до кошика.");
    window.dispatchEvent(new Event("cartUpdated"));
    setIsDialogOpen(false);
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
    <Card
      disabled={data.quantity === 0}
      className={`w-full h-full flex flex-col justify-between transition-transform duration-200 ${
        data.quantity === 0
          ? "opacity-50 pointer-events-none"
          : "hover:scale-105"
      }`}
    >
      <Link href={`/catalog/product/${data._id}`}>
        <CardContent>
          <div className="relative rounded-xl py-4 w-full h-auto aspect-square bg-white overflow-hidden">
            {data.images[0] && (
              <Image
                src={data.images[0].image}
                alt={data.title}
                fill
                className="object-contain p-4"
              />
            )}
          </div>
        </CardContent>
        <CardHeader className="flex flex-col justify-center items-center py-4">
          <CardTitle className="text-2xl text-center font-secondary">
            {data.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">{renderStars()}</div>
            <span className="text-sm font-secondary font-bold text-secondary">
              {formattedRating}
            </span>
            <span className="text-xs text-secondary">({reviewsCount})</span>
          </div>
        </CardHeader>
      </Link>
      <CardFooter className="flex justify-between items-center pt-0">
        <p className="font-secondary text-xl">{data.price}$</p>
        <div className="flex gap-2">
          <ToolTipButtons text={"Додати у вподобані"}>
            <Button
              onClick={(e) => handleWishlistToggle(data._id, e)}
              variant="card"
              className="p-2 cursor-pointer"
            >
              <Heart />
            </Button>
          </ToolTipButtons>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <div>
                <ToolTipButtons text={"Додати у кошик"}>
                  <Button
                    variant="card"
                    onClick={(e) => handleAddToCartClick(e)}
                    className="p-2 cursor-pointer"
                  >
                    <ShoppingBasket />
                  </Button>
                </ToolTipButtons>
              </div>
            </DialogTrigger>
            <DialogContent className="bg-primary">
              <DialogHeader>
                <DialogTitle className="font-primary text-2xl text-center">
                  Виберіть колір
                </DialogTitle>
                <DialogDescription />
              </DialogHeader>

              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Обраний колір:</span>
                  {chosenColor._id ? (
                    <span
                      className="w-5 h-5 rounded-full border border-gray-300 shadow-sm inline-block"
                      style={{ backgroundColor: chosenColor.color }}
                      title={chosenColor.color}
                    />
                  ) : (
                    <span className="text-sm text-gray-400">Не вибрано</span>
                  )}
                </div>
              </div>
              <NativeSelect
                value={chosenColor?._id || ""}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const foundColor = data.colors.find(
                    (c) => String(c._id) === selectedId,
                  );
                  if (foundColor) {
                    setChosenColor(foundColor);
                  }
                }}
              >
                <NativeSelectOption value="" disabled>
                  Оберіть відтінок:
                </NativeSelectOption>
                {data.colors?.map((item) => {
                  const stringId = String(item._id);
                    const matchedColor = colorNames.find((col) => col.index === item.color);
                      const colorDisplayName = matchedColor
                        ? matchedColor.name
                        : "";
                  return item.quantity > 0 ? (
                    <NativeSelectOption key={stringId} value={stringId}>
                      {colorDisplayName} — Залишок: {item.quantity} шт.
                    </NativeSelectOption>
                  ) : (
                    <NativeSelectOption
                      key={stringId}
                      disabled
                      value={stringId}
                    >
                      {colorDisplayName} (Немає в наявності)
                    </NativeSelectOption>
                  );
                })}
              </NativeSelect>
              <div className="mt-4 flex justify-end">
                <Button onClick={(e) => handleAddToCartWithColor(e)}>Підтвердити</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}