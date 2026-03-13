import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { ShoppingBasket, Star, StarHalf } from "lucide-react";
import { Button } from "../ui/button";

export default function SimilarProducts({data}){
    return (
      <section className="bg-primary">
        <div className="w-full text-center p-4">
          <h1 className="font-primary h1 text-white">Схожі товари</h1>
        </div>
        <Carousel opts={{ align: "start" }} className="w-full h-full p-4">
          <CarouselContent>
            {data.map((item) => (
              <CarouselItem
                key={item.id}
                className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
              >
                <Link href="/product">
                  <Card className="w-full h-full hover:scale-110 my-transition">
                    <CardContent className="">
                      <div className="relative rounded-xl py-4 w-full h-64 bg-white">
                        <Image
                          src={item.image1}
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
                      <p className="font-secondary text-xl">{item.price}</p>
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
      </section>
    );
}