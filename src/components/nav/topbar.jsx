"use client"; 
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu"; 
import { cn } from "@/lib/utils";
const data = [ 
  { 
    title: "Про нас", 
    href: "/about" 
  }, 
  { 
    title: "Доставка та оплата", 
    href: "/delivery" 
  }, 
  { 
    title: "Політика конфіденційності", 
    href: "/policy" 
  }, 
  { 
    title: "Публічна оферта", 
    href: "/oferta" 
  }, 
  { 
    title: "Гарантії та повернення", 
    href: "/return" 
  }, 
  { 
    title: "Контактна інформація", 
    href: "/contact" 
  }, 
  { 
    title: "Часті питання", 
    href: "/faq" 
  }, 
] 
export default function TopBar(){ 
  return (
    <nav className="w-full bg-primary">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="hidden lg:flex gap-6">
          {data.map((item, i) => (
            <NavigationMenuItem
              key={i}
              className="py-2 px-6 cursor-pointer my-transition"
            >
              <Link
                href={item.href}
                className="navtext text-foreground hover:underline"
              >
                {item.title}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <NavigationMenuList className="grid grid-cols-2 lg:hidden gap-6 p-4">
          {data.map((item, i) => (
            <NavigationMenuItem
              key={i}
              className={cn(
                "items-center flex flex-row justify-center text-center",
                i === 6 ? "col-span-2 tex-center items-center" : "",
              )}
            >
              <Link
                href={item.href}
                className="navtext text-foreground hover:underline p-2"
              >
                {item.title}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  ); 
}