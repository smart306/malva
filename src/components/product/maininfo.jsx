import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { addToCart } from "@/lib/cart/cart";
import { toast } from "sonner";
import { useProductRating } from "@/hooks/productrating";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Checkout from "../checkout";
import { useDelivery } from "@/hooks/delivery";
import { useState } from "react";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { colorNames } from "@/lib/colornames";
import { toggleWishlist } from "@/lib/actions/wishlist";

export default function MainInfo({ datamain, dostavkasOptions }) {
  const [chosenColor, setChosenColor] = useState({});
  const images = datamain.images;
  const primaryImage = datamain.images[0];
  const galleryImages = images.slice(1);
  const { renderStars, formattedRating, reviewsCount } = useProductRating(
    datamain?.reviews,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!chosenColor._id) {
      toast.error("Будь ласка, виберіть колір продукту.");
      return;
    }
    addToCart(datamain, chosenColor);
    toast("Продукт додано до кошика.");
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  const handleCheckout = (colorToCheckout) => {
    const colorToAdd = colorToCheckout;
    addToCart(datamain, colorToAdd);
    toast("Продукт додано до кошика.");
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  const { dostavkaList, selectedDostavka, handleDostavkaChange } =
    useDelivery(dostavkasOptions);

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
    <section className="bg-primary flex flex-col lg:flex-row w-full h-fit pt-12 lg:pt-28">
      <div className="hidden sm:flex flex-row lg:flex-col w-full space-x-2 lg:space-x-0 lg:w-fit p-4">
        <div className="relative bg-white aspect-square w-full lg:w-lg xl:w-xl rounded-2xl">
          <Image
            src={primaryImage.image}
            alt="p"
            fill
            className="object-contain p-4"
          />
        </div>
        <div className="flex flex-col lg:flex-row w-1/3 lg:w-lg xl:w-xl space-y-2 lg:space-x-2 lg:py-2">
          {galleryImages
            .filter((item) => item._id !== primaryImage._id)
            .map((item) => (
              <div
                key={item._id}
                className={cn(
                  "relative bg-white aspect-square w-full lg:h-11/12 rounded-2xl",
                )}
              >
                <Image
                  src={item.image}
                  alt="p"
                  fill
                  className="object-contain p-4"
                />
              </div>
            ))}
        </div>
      </div>

      <div className="sm:hidden">
        <Carousel opts={{ align: "start" }} className="w-full h-full p-4">
          <CarouselContent>
            {images
              .filter((item) => item._id !== primaryImage._id)
              .map((item) => (
                <CarouselItem
                  key={item._id}
                  className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
                >
                  <div className="relative aspect-square bg-white rounded-2xl">
                    <Image
                      src={item.image}
                      fill
                      alt="p"
                      className="object-contain p-16"
                    />
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="w-full py-2 lg:py-4 px-4 flex flex-col justify-between items-center text-center">
        <div className="w-full py-8 flex flex-col items-center space-y-4 xl:space-y-2">
          <h1 className="h1 font-secondary">{datamain.title}</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">{renderStars()}</div>
            <span className="text-sm font-secondary text-secondary">
              {formattedRating}
            </span>
            <span className="text-xs text-secondary">({reviewsCount})</span>
          </div>
          <p className="h3 font-secondary">{datamain.description}</p>
        </div>
        <div className="w-full space-y-4 flex flex-col justify-end py-8">
          <div className="flex gap-4 lg:gap-2 justify-center">
            {datamain.colors && datamain.colors.length > 0
              ? datamain.colors.map((item) =>
                  item.quantity > 0 ? (
                    <div key={item._id}>
                      <Button
                        size="full"
                        variant="color"
                        style={{ backgroundColor: item.color }}
                        className={cn(
                          `rounded-full aspect-square`,
                          chosenColor._id === item._id
                            ? "scale-125 border-5"
                            : " ",
                        )}
                        onClick={() => setChosenColor(item)}
                      />
                    </div>
                  ) : (
                    <div key={item._id}>
                      <Button
                        size="full"
                        variant="color"
                        disabled
                        className={cn("rounded-full aspect-square bg-gray-600")}
                      />
                    </div>
                  ),
                )
              : null}
          </div>
          <div className="w-full space-y-4 sm:space-y-2">
            <p className="h2 font-secondary">{datamain.price}$</p>
            <Dialog>
              <div className="w-full flex flex-col space-y-4 sm:space-y-0 xl:flex-row">
                <div className="w-full">
                  <Button
                    className="w-full px-4 py-2 rounded-full text-base lg:text-2xl"
                    onClick={handleSubmit}
                  >
                    Додати до кошику
                  </Button>
                </div>
                <div className="w-full">
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      className="text-xl rounded-full px-4 py-2 w-full"
                    >
                      Купити зараз
                    </Button>
                  </DialogTrigger>
                </div>
                <div>
                  <Button
                    className="text-xl rounded-full px-4 py-2 w-full"
                    onClick={(e) => handleWishlistToggle(datamain._id, e)}
                  >
                    Додати до вподобаного
                  </Button>
                </div>
              </div>
              <DialogContent className="bg-primary">
                <DialogHeader>
                  <DialogTitle className="font-primary text-2xl text-center">
                    Введіть свої дані для підтвердження замовлення
                  </DialogTitle>
                  <DialogDescription />
                </DialogHeader>
                <NativeSelect onChange={(e) => handleDostavkaChange(e)}>
                  <NativeSelectOption>
                    Оберіть спосіб доставки:
                  </NativeSelectOption>
                  {dostavkaList.map((item) => (
                    <NativeSelectOption key={item._id} value={item.name}>
                      {item.name}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                {datamain.maincategory === "decor" &&
                  datamain.colors &&
                  datamain.colors.length > 0 && (
                    <div>
                      <div className="flex flex-col gap-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            Обраний колір:
                          </span>
                          {chosenColor._id ? (
                            <span
                              className="w-5 h-5 rounded-full border border-gray-300 shadow-sm inline-block"
                              style={{ backgroundColor: chosenColor.color }}
                            />
                          ) : (
                            <span className="text-sm text-gray-400">
                              Не вибрано
                            </span>
                          )}
                        </div>
                      </div>
                      <NativeSelect
                        value={chosenColor?._id || ""}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const foundColor = datamain.colors.find(
                            (c) => String(c._id) === selectedId,
                          );
                          if (foundColor) {
                            setChosenColor(foundColor);
                            handleCheckout(foundColor);
                          }
                        }}
                      >
                        <NativeSelectOption value="" disabled>
                          Оберіть відтінок:
                        </NativeSelectOption>
                        {datamain.colors?.map((item) => {
                          const stringId = String(item._id);
                          const matchedColor = colorNames.find(
                            (col) => col.index === item.color,
                          );
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
                    </div>
                  )}
                <Checkout
                  selectedDostavka={selectedDostavka}
                  earnedPoints={datamain.price}
                  usedPoints={0}
                  finalTotal={datamain.price + selectedDostavka.price}
                  total={datamain.price}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
