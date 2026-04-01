"use client";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import CardProduct from "../category/cardpro";

export default function PopularProduct({data}) {
    return (
      <div className="py-10 overflow-x-hidden">
        <div className="my-container">
          <h1 className="h1 text-white text-center p-4">
            Найпопулярніші товари
          </h1>
          <Carousel
            dir="rtl"
            opts={{
              direction: "rtl",
              align: "start",
            }}
            className="w-full h-full"
          >
            <CarouselContent>
              {data.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
                >
                   <CardProduct item={item}/>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    );
  }