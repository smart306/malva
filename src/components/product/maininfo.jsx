import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Star, StarHalf } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { addToCart } from "@/lib/cart/cart";

export default function MainInfo({ datamain }) {
  const images = Array.isArray(datamain.images)
    ? datamain.images.filter(Boolean)
    : [];
  const primaryImage = images[0] || null;
  const galleryImages = images.length > 1 ? images.slice(1) : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(datamain);

    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  return (
    <section className="bg-primary flex flex-col lg:flex-row w-full h-fit pt-12 lg:pt-28">
      <div className="hidden sm:flex flex-row lg:flex-col w-full space-x-2 lg:space-x-0 lg:w-fit p-4">
        <div className="relative bg-white aspect-square w-full lg:w-lg xl:w-xl rounded-2xl">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={datamain.title}
              fill
              className="object-contain p-4"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center font-primary text-primary">
              Фото відсутнє
            </div>
          )}
        </div>
        <div className="flex flex-col lg:flex-row w-1/3 lg:w-lg xl:w-xl space-y-2 lg:space-x-2 lg:py-2">
          {galleryImages.map((item, i) => (
            <div
              key={`${datamain._id}_${i}`}
              className={cn(
                "relative bg-white aspect-square w-full lg:h-11/12 rounded-2xl",
              )}
            >
              <Image
                src={item}
                alt={datamain.title}
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
            {images.map((item, i) => (
              <CarouselItem
                key={`${datamain._id}_${i}`}
                className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
              >
                <div className="relative aspect-square bg-white rounded-2xl">
                  <Image
                    src={item}
                    fill
                    alt={datamain.title}
                    className="object-contain p-16"
                  />
                </div>
              </CarouselItem>
            ))}
            {images.length === 0 ? (
              <CarouselItem className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full">
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-white p-6 text-center font-primary text-primary">
                  Фото відсутнє
                </div>
              </CarouselItem>
            ) : null}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="w-full py-2 lg:py-4 px-4 flex flex-col justify-between items-center text-center">
        <div className="w-full py-8 flex flex-col items-center space-y-4 xl:space-y-2">
          <h1 className="h1 font-secondary">{datamain.title}</h1>
          <div className="flex">
            <Star className="text-border" />
            <Star className="text-border" />
            <Star className="text-border" />
            <Star className="text-border" />
            <StarHalf className="text-border" />
          </div>
          <p className="h3 font-secondary">{datamain.description}</p>
        </div>
        <div className="w-full space-y-4 flex flex-col justify-end py-8">
          <div className="flex gap-4 lg:gap-2 justify-center">
            {datamain.colors && datamain.colors.length > 0
              ? datamain.colors.map((item) => (
                  <div key={item.color + "_" + datamain._id}>
                    <Button
                      size="full"
                      variant="color"
                      className={cn("rounded-full aspect-square", item.color)}
                    />
                  </div>
                ))
              : null} 
          </div>
          <div className="w-full space-y-4 sm:space-y-2">
            <p className="h2 font-secondary">{datamain.price}$</p>
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row w-full">
              <Button
                className="px-4 py-2 rounded-full text-base lg:text-2xl w-full sm:w-1/2"
                onClick={handleSubmit}
              >
                Додати до кошику
              </Button>
              <Button
                variant="secondary"
                className="sm:hidden text-xl rounded-full px-4 py-2 w-full"
              >
                Купити зараз
              </Button>
              <Button className="px-4 py-2 rounded-full text-base lg:text-2xl w-full sm:w-1/2">
                Спробувати на собі
              </Button>
            </div>
            <Button
              variant="secondary"
              className="hidden sm:block text-2xl rounded-full px-4 py-2 w-full"
            >
              Купити зараз
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
