"use client";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import {
  AlignJustify,
  Heart,
  Search,
  ShoppingBasket,
  UserRound,
  XIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import TopBar from "./topbar";
import Link from "next/link";
import { ToolTipPages } from "../toolt/tooltip";
import SearchInput from "../search";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export default function Lowbar() {
  return (
    <NavigationMenu className="fixed w-full">
      <div className="my-container w-full ">
        <div className="bg-primary rounded-full border-[3px] border-border-nav py-2 px-4">
          <NavigationMenuList className="hidden w-full lg:flex flex-row justify-between ">
            <div className="flex flex-row items-center w-full gap-4">
              <NavigationMenuItem className="cursor-pointer">
                <Link href="/">
                  <Image src="/image1.svg" alt="p" width={40} height={40} />
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="max-w-200 w-full flex gap-2 cursor-pointer my-transition">
                <SearchInput />
              </NavigationMenuItem>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-2">
                <NavigationMenuItem>
                  <Link href="/profile">
                    <ToolTipPages text="Профіль">
                      <Button variant="ghost" className="relative">
                        <UserRound width={24} height={24} />
                      </Button>
                    </ToolTipPages>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/cart">
                    <ToolTipPages text="Кошик">
                      <Button variant="ghost" className="relative">
                        <ShoppingBasket width={24} height={24} />
                      </Button>
                    </ToolTipPages>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/profile/wishlist">
                    <ToolTipPages text="Впродобані">
                      <Button variant="ghost" className="relative">
                        <Heart width={24} height={24} />
                      </Button>
                    </ToolTipPages>
                  </Link>
                </NavigationMenuItem>
              </div>
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
                side="right"
                className="w-full bg-primary text-secondary my-container py-4 px-2"
              >
                <SheetHeader className="flex flex-row items-center justify-end">
                  <SheetTitle></SheetTitle>
                  <SheetClose>
                    <XIcon />
                  </SheetClose>
                </SheetHeader>
                <Separator className="bg-secondary border-2 border-secondary rounded-full" />
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex flex-row justify-end items-center gap-2 px-4 py-2">
                    <Collapsible>
                      <CollapsibleTrigger>
                        <Button asChild variant="ghost">
                          <div className="flex flex-row justify-end items-center gap-2">
                            <h3 className="h3">Пошук</h3>
                            <div className="w-2 h-2">
                              <Search width={24} height={24} />
                            </div>
                          </div>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SearchInput />
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                  <div className="flex flex-row justify-end items-center gap-2 px-4 py-2">
                    <Link href="/profile">
                      <SheetClose>
                        <Button asChild variant="ghost">
                          <div>
                            <h3 className="h3">Аккаунт</h3>
                            <UserRound width={24} height={24} />
                          </div>
                        </Button>
                      </SheetClose>
                    </Link>
                  </div>
                  <div className="flex flex-row justify-end items-center gap-2 px-4 py-2">
                    <Link href="/cart">
                      <SheetClose>
                        <Button asChild variant="ghost">
                          <div>
                            <h3 className="h3">Кошик</h3>
                            <ShoppingBasket width={24} height={24} />
                          </div>
                        </Button>
                      </SheetClose>
                    </Link>
                  </div>
                  <div className="flex flex-row justify-end items-center gap-2 px-4 py-2">
                    <Link href="/profile/wishlist">
                      <SheetClose>
                        <Button asChild variant="ghost">
                          <div>
                            <h3 className="h3">Вподобані</h3>
                            <Heart width={24} height={24} />
                          </div>
                        </Button>
                      </SheetClose>
                    </Link>
                  </div>
                </div>
                <Separator className="bg-secondary border-2 border-secondary rounded-full" />
                <TopBar />
              </SheetContent>
            </Sheet>
          </NavigationMenuList>
        </div>
      </div>
    </NavigationMenu>
  );
}
