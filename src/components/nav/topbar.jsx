"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
const data = [
  {
    title: "Про нас",
    href: "/about",
  },
  {
    title: "Доставка та оплата",
    href: "/delivery",
  },
  {
    title: "Політика конфіденційності",
    href: "/policy",
  },
  {
    title: "Публічна оферта",
    href: "/oferta",
  },
  {
    title: "Гарантії та повернення",
    href: "/return",
  },
  {
    title: "Контактна інформація",
    href: "/contact",
  },
  {
    title: "Часті питання",
    href: "/faq",
  },
];
export default function TopBar() {
  return (
    <NavigationMenu className="bg-primary w-full [&_div]:!w-full overflow-hidden max-lg:items-start px-4">
      <NavigationMenuList className="w-full! flex-col lg:flex-row gap-2 lg:gap-6 max-lg:py-4">
        <Carousel
          className={"w-full"}
          opts={{
            align: "center",
            active: false,
            breakpoints: {
              "(min-width: 1024px)": { active: true },
            },
          }}
        >
          <CarouselContent
            className={"flex max-lg:flex-col 2xl:justify-center"}
          >
            {data.map((item, i) => (
              <CarouselItem
                className={"lg:max-w-max"}
                key={`${item.href}_${i}`}
              >
                <NavigationMenuItem className="py-2 px-2 cursor-pointer my-transition lg:text-center max-lg:w-full max-lg:text-end">
                  <Link
                    href={item.href}
                    className="w-full navtext text-foreground hover:underline text-nowrap"
                  >
                    {item.title}
                  </Link>
                </NavigationMenuItem>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
