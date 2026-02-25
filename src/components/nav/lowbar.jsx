"use client";

import Image from "next/image";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import { Input } from "../ui/input";
import { AlignJustify, Heart, Search, ShoppingBasket, UserRound, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import TopBar from "./topbar";

const data = [
  {
    title: "Пошук",
    image: <Search width={24} height={24} />,
  },
  {
    title: "Акаунт",
    image: <UserRound width={24} height={24} />,
  },
  {
    title: "Пошук",
    image: <ShoppingBasket width={24} height={24} />,
  },
  {
    title: "Пошук",
    image: <Heart width={24} height={24} />,
  },
];
export default function Lowbar() {
  return (
    <div className="fixed w-full">
      <NavigationMenu>
        <div className="my-container w-full bg-primary rounded-full border-[3px] border-border-nav py-2 px-4">
          <NavigationMenuList className="hidden w-full lg:flex flex-row justify-between">
            <div className="flex flex-row items-center w-full gap-4">
              <NavigationMenuItem className="cursor-pointer">
                <Image src="/image1.svg" alt="p" width={40} height={40} />
              </NavigationMenuItem>
              <NavigationMenuItem className="max-w-200 w-full flex gap-2 cursor-pointer my-transition">
                <Input placeholder="Пошук..." className="w-full" />
                <Search/>
              </NavigationMenuItem>
            </div>
            <div className="flex gap-2">
              <NavigationMenuItem className="hover:scale-120 cursor-pointer my-transition">
                <ShoppingBasket className="text-primary-foreground" />
              </NavigationMenuItem>
              <NavigationMenuItem className="hover:scale-120 cursor-pointer my-transition">
                <Heart className="text-primary-foreground" />
              </NavigationMenuItem>
              <NavigationMenuItem className="hover:scale-120 cursor-pointer my-transition">
                <UserRound className="text-primary-foreground" />
              </NavigationMenuItem>
            </div>
          </NavigationMenuList>
          <NavigationMenuList className="lg:hidden w-full flex flex-row justify-between">
            <NavigationMenuItem>
              <Image src="/image1.svg" alt="p" width={40} height={40} />
            </NavigationMenuItem>
            <Sheet className="w-full">
              <SheetTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"ghostsize"}
                  className="w-fit h-full"
                >
                  <AlignJustify
                    className="text-primary-foreground cursor-pointer"
                    width={40}
                    height={40}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full bg-primary text-secondary my-container py-4 px-2"
              >
                <SheetHeader className="flex flex-row items-center justify-end">
                  <SheetTitle></SheetTitle>
                  <SheetClose>
                    <XIcon />
                  </SheetClose>
                </SheetHeader>
                <Separator className="bg-secondary border-[2px] border-secondary rounded-full" />
                <div className="flex flex-col gap-2 py-2">
                  {data.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-row justify-end items-center gap-2 px-4 py-2"
                    >
                      <Button variant="ghost">
                        <h3 className="h3">{item.title}</h3>
                        <div className="w-2 h-2">{item.image}</div>
                      </Button>
                    </div>
                  ))}
                </div>
                <Separator className="bg-secondary border-[2px] border-secondary rounded-full" />
                <TopBar />
              </SheetContent>
            </Sheet>
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </div>
  );
}