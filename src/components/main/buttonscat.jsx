"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
const data = [
  {
    id: 1,
    image: "/Дизайн без назви1(4).svg",
    title: "Декоративна косметика",
    gradient: "bg-linear-to-r from-transparent to-bg-down",
  },
  {
    id: 2,
    image: "/Дизайн без назви1(1).svg",
    title: "Чоловіча доглядова косметика",
    gradient: "bg-linear-to-l from-transparent to-bg-down",
  },
  {
    id: 3,
    image: "/Дизайн без назви1(2).svg",
    title: "Жіноча доглядова косметика",
    gradient: "bg-linear-to-r from-transparent to-bg-down",
  },
  {
    id: 4,
    image: "/Дизайн без назви1(3).svg",
    title: "Інструменти для догляду",
    gradient: "bg-linear-to-l from-transparent to-bg-down",
  },
];
export default function ButtonCategoryMain() {
  return (
    <div>
      <div className="my-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item) => (
            <Button
              asChild
              variant="category1"
              size="ghostsize"
              key={item.id}
              className="w-full h-auto overflow-hidden"
            >
              <div className="group relative aspect-video cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain my-transition group-hover:scale-105"
                />
                <div className={cn(item.gradient, "absolute inset-0 z-10")} />
                <div className="absolute inset-0 z-20 flex items-center w-full">
                  <p
                    className={cn(
                      "text-2xl p-6 flex flex-row justify-center text-center w-full",
                    )}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}