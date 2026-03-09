"use client"
import { SidebarProvider, useSidebar } from "../ui/sidebar";
import Filter from "./filter";
import dataFile from "../../app/data/data.json";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { ShoppingBasket, SlidersIcon, Star, StarHalf } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Background from "../background";
export default function ContentCategory(){
    const products = dataFile.data;
    const MobileTrigger = () => {
      const { toggleSidebar } = useSidebar();
      return (
        <Button variant="secondary" onClick={toggleSidebar} className="p-2">
          <SlidersIcon />
        </Button>
      );
    };
    return (
      <div className="w-full h-full relative">
        <div className="absolute hidden lg:block w-full h-full -z-10">
          <Background />
        </div>
        <div className="my-container relative flex flex-col md:flex-row gap-x-4">
          <SidebarProvider className="contents h-full">
            <div className="md:hidden flex justify-center items-center p-4">
              <MobileTrigger />
            </div>
            <Filter />
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {products.map((item) => (
                  <Card
                    key={item.id}
                    className="w-full h-full hover:scale-110 my-transition"
                  >
                    <CardContent className="">
                      <div className="relative rounded-xl py-4 w-full h-auto aspect-square bg-white overflow-hidden">
                        <Image
                          src={item.image}
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
                ))}
              </div>
              <div className="w-full flex justify-center p-4">
                <Button
                  variant="secondary"
                  className="px-4 py-2 flex justify-center items-center text-center rounded-full w-full md:w-fit"
                >
                  <p className="h3 font-secondary text-center items-center ">
                    Більше
                  </p>
                </Button>
              </div>
            </div>
          </SidebarProvider>
        </div>
      </div>
    );
}