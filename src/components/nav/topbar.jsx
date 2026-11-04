"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ToolTipPages } from "../toolt/tooltip";

export default function TopBar({data}) {
  return (
    <NavigationMenu className=" bg-primary w-full [&_div]:!w-full overflow-hidden max-lg:items-start px-4">
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
            {data.map((item) => (
              <CarouselItem
                className={"lg:max-w-max"}
                key={item._id}
              >
                <NavigationMenuItem className="py-2 px-2 cursor-pointer my-transition lg:text-center max-lg:w-full max-lg:text-end">
                  <Link
                    href={`/regulation/${item.slug}`}
                    className="w-full navtext text-foreground hover:underline text-nowrap"
                  >
                    <ToolTipPages text={item.name}>
                      <span>{item.name}</span>
                    </ToolTipPages>
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
