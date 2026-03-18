"use client";
import dataFile from "../../app/data/data.json";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ShoppingBasket, Star, StarHalf } from "lucide-react";
import Link from "next/link";

export default function NewProduct({data}) {
  

  return (
    <div className="py-10 overflow-x-hidden">
      <div className="my-container">
        <h1 className="h1 text-white text-center p-4">Найновіші товари</h1>
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem
                key={item.id}
                className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
              >
                <Link href={`/product/${item._id}`} key={item.id}>
                  <Card className="w-full h-full hover:scale-110 my-transition">
                    <CardContent className="">
                      <div className="relative rounded-xl py-4 w-full h-64 bg-white">
                        <Image
                          src={item?.images[0]}
                          alt={item.title}
                          fill
                          className="object-contain p-4"
                        />
                      </div>
                    </CardContent>
                    <CardHeader className="flex flex-col justify-center items-center">
                      <CardTitle className="text-2xl text-center font-secondary">
                        {item.title}
                      </CardTitle>
                      <div className="flex">
                        <Star className="text-border" />
                        <Star className="text-border" />
                        <Star className="text-border" />
                        <Star className="text-border" />
                        <StarHalf className="text-border" />
                      </div>
                    </CardHeader>

                    <CardFooter className="flex justify-between items-center">
                      <p className="font-secondary text-xl">{item.price}$</p>
                      <Button variant="card" className="p-2">
                        <ShoppingBasket className="" />
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}