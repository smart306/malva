"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
const data = [
  {
    id: 1,
    image: "/Дизайн без назви1(4).svg",
    title: "Декоративна косметика",
    gradient: "bg-linear-to-r from-transparent to-bg-down",
  },
  {
    id: 2,
    image: "/Frame339.svg",
    title: "Чоловіча доглядова косметика",
    gradient: "bg-linear-to-r from-transparent to-bg-down",
  },
  {
    id: 3,
    image: "/Frame338.svg",
    title: "Жіноча доглядова косметика",
    gradient: "bg-linear-to-r from-transparent to-bg-down",
  },
  {
    id: 4,
    image: "/ezre1.svg",
    title: "Інструменти для догляду",
    gradient:
      "bg-gradient-to-r from-transparent to-bg-down hover:to-white transition-color my-transition",
  },
];
export default function CategoryButton() {
    const router = useRouter();
    return (
      <div className="lg:mt-30">
        {data
          .filter((item) => item.id === 1)
          .map((item) => (
            <div
              key={item.id}
              className="relative w-full aspect-[20/9] sm:aspect-[30/9] md:aspect-[40/9] lg:aspect-[60/9] overflow-hidden bg-primary mb-4"
            >
              <div className="flex justify-between h-full w-full">
                <div className="relative w-1/2 h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className={cn(item.gradient, "absolute inset-0 z-10")} />
                </div>
                <div className="relative w-1/2 h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rotate-180"
                  />
                  <div
                    className={cn(
                      item.gradient,
                      "absolute inset-0 z-10 rotate-180",
                    )}
                  />
                </div>
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20">
                  <h1 className="text-white text-h1 font-primary">
                    {item.title}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {data
            .filter((item) => item.id !== 1)
            .map((item) => (
              <Button
                asChild
                variant="category1"
                size="ghostsize"
                key={item.id}
                className="w-full overflow-hidden"
                onClick={() => router.push(`/category`)}
              >
                <div className="group relative aspect-[30/9] md:aspect-[10/9] lg:aspect-video h-full cursor-pointer">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover my-transition group-hover:scale-105"
                  />
                  <div
                    className={cn(
                      item.gradient,
                      "absolute inset-0 z-10 h-full ",
                    )}
                  />
                  <div
                    className={cn(
                      item.gradient,
                      "absolute inset-0 w-[35%] z-10 rotate-180",
                    )}
                  />
                  <div className="absolute inset-0 z-20 flex items-center w-full">
                    <p className="text-2xl p-6 flex flex-row justify-center text-center w-full text-white text-wrap">
                      {item.title}
                    </p>
                  </div>
                </div>
              </Button>
            ))}
        </div>
      </div>
    );
}