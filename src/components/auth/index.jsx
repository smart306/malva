"use client"; 
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Star } from "lucide-react";
import { useState } from "react";

export default function Profile({user, products}){
    const [visibleCount] = useState(6);
    const visibleReviews = user.pastreviews.slice(0, visibleCount);
    const hasMore = visibleCount < user.pastreviews.length;
    return (
      <div className="overflow-hidden">
        <div className="w-full lg:mt-35">
          <div className="flex gap-16">
            {user.image && (
              <div className="relative w-1/3 h-fit aspect-square">
                <Image
                  src={user.image}
                  alt="Avatar"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            )}
            <div className="space-y-1 w-1/2 pt-12">
              <div className="flex justify-between">
                <p className="h3 text-secondary">Імʼя</p>
                <p className="font-secondary h3">{user.name}</p>
              </div>
              <div className="flex justify-between">
                <p className="h3 text-secondary">Email</p>
                <p className="font-secondary h3">{user.email}</p>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <p className="h2 text-secondary text-center">Ваші відгуки</p>
                  {hasMore && (
                    <div className="w-full flex flex-col sm:flex-row justify-center items-center mt-4">
                      <Link className="/profile/pastreviews">
                        <Button className="py-2 px-4 rounded-full text-2xl">
                          Більше відгуків
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
                <Carousel
                  opts={{
                    align: "center",
                    loop: false,
                    slidesToScroll: 1,
                    containScroll: false,
                  }}
                  className="w-full overflow-hidden"
                >
                  <CarouselContent>
                    {visibleReviews.map((item) => {
                      const matchedProduct = products.find(
                        (p) => p._id === item.product,
                      );
                      return (
                        <CarouselItem key={item._id}>
                          <Card>
                            <CardHeader className="font-secondary text-xl">
                              <Link
                                href={`/catalog/product/${matchedProduct._id}`}
                              >
                                {matchedProduct.title}
                              </Link>
                            </CardHeader>
                            <CardContent className="mx-4 p-4 bg-white min-h-20 rounded-full border border-border">
                              <p>{item.review}</p>
                            </CardContent>
                            <CardFooter>
                              {Array.from({ length: 5 }, (_, index) => {
                                const starValue = index + 1;
                                const isFilled = starValue <= (item.star || 0);

                                return (
                                  <Star
                                    key={`review-${item._id}-star-${starValue}`}
                                    className={`w-5 h-5 ${
                                      isFilled
                                        ? "text-secondary fill-secondary"
                                        : "text-secondary"
                                    }`}
                                  />
                                );
                              })}
                              <p>{item.createdAt}</p>
                            </CardFooter>
                          </Card>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="-left-6" />
                  <CarouselNext className="-right-6" />
                </Carousel>
              </div>
              <div className="flex justify-center items-center">
                <Button asChild className="rounded-full text-xl px-4 py-2">
                  <Link href="/profile/wishlist">Вподобані</Link>
                </Button>
                <Button asChild className="rounded-full text-xl px-4 py-2">
                  <Link href="/profile/pastorders">Минулі замовлення</Link>
                </Button>
                <Button asChild className="rounded-full text-xl px-4 py-2">
                  <Link href="/profile/edit">Редагувати профіль</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
