import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Star, StarHalf } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function MainInfo({data}){
    return (
      <section className="bg-primary flex flex-col lg:flex-row w-full h-fit pt-12 lg:pt-28">
        <div className="hidden sm:flex flex-row lg:flex-col w-full space-x-2 lg:space-x-0 lg:w-fit p-4">
          <div className="relative bg-white aspect-square w-full lg:w-lg xl:w-xl rounded-2xl">
            <Image
              src={data.image1}
              alt="p"
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="flex flex-col lg:flex-row w-1/3 lg:w-lg xl:w-xl space-y-2 lg:space-x-2 lg:py-2">
            <div className="relative bg-white aspect-square w-full lg:h-11/12 rounded-2xl">
              <Image
                src={data.image1}
                alt="p"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="relative bg-white aspect-square w-full lg:h-11/12 rounded-2xl">
              <Image
                src={data.image1}
                alt="p"
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="relative bg-white aspect-square w-full lg:h-11/12 rounded-2xl">
              <Image
                src={data.image1}
                alt="p"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>
        <div className="sm:hidden">
          <Carousel opts={{ align: "start" }} className="w-full h-full p-4">
            <CarouselContent>
              <CarouselItem className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full">
                <div className="relative aspect-square bg-white rounded-2xl">
                  <Image
                    src={data.image1}
                    fill
                    alt="p"
                    className="object-contain p-16"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full">
                <div className="relative aspect-square bg-white rounded-2xl">
                  <Image
                    src={data.image1}
                    fill
                    alt="p"
                    className="object-contain p-16"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full">
                <div className="relative aspect-square bg-white rounded-2xl">
                  <Image
                    src={data.image1}
                    fill
                    alt="p"
                    className="object-contain p-16"
                  />
                </div>
              </CarouselItem>
              <CarouselItem className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full">
                <div className="relative aspect-square bg-white rounded-2xl">
                  <Image
                    src={data.image1}
                    fill
                    alt="p"
                    className="object-contain p-16"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
        <div className="w-full py-2 lg:py-4 px-4 flex flex-col justify-between items-center text-center">
          <div className="w-full py-8 flex flex-col items-center space-y-4 xl:space-y-2">
            <h1 className="h1 font-secondary">{data.title}</h1>
            <div className="flex">
              <Star className="text-border" />
              <Star className="text-border" />
              <Star className="text-border" />
              <Star className="text-border" />
              <StarHalf className="text-border" />
            </div>
            <p className="h3 font-secondary">{data.description}</p>
          </div>
          <div className="w-full space-y-4 flex flex-col justify-end py-8">
            <div className="flex gap-4 lg:gap-2 justify-center">
              {data.colors.map((item) => (
                <div key={item.id}>
                  <Button
                    size="full"
                    variant="color"
                    className={cn("rounded-full aspect-square", item.color)}
                  />
                </div>
              ))}
            </div>
            <div className="w-full space-y-4 sm:space-y-2">
              <p className="h2 font-secondary">{data.price}</p>
              <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row w-full">
                <Button className="px-4 py-2 rounded-full text-base lg:text-2xl w-full sm:w-1/2">
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