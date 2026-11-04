"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter, useParams } from "next/navigation";
import { ToolTipPages } from "../toolt/tooltip";
import { cn } from "@/lib/utils";
export default function CategoryButton({data}) {
    const router = useRouter();
    const params = useParams();
    const currentSlug = params.slug || null;
    return (
      <div className="lg:mt-30">
        {data
          .filter((item) => item.slug === currentSlug)
          .map((item) => (
            <div
              key={item._id}
              className="relative w-full aspect-[20/9] sm:aspect-[30/9] md:aspect-[40/9] lg:aspect-[60/9] overflow-hidden bg-primary mb-4"
            >
              <div className="flex justify-between h-full w-full">
                <div className="relative w-1/2 h-full">
                  <Image
                    src={item.image}
                    alt="category"
                    fill
                    className="object-cover"
                  />
                  <div className="w-full absolute inset-0 z-10 rotate-0 bg-linear-to-r from-transparent to-bg-down" />
                </div>
                <div className="relative w-1/2 h-full">
                  <Image
                    src={item.image}
                    alt="category"
                    fill
                    className="object-cover rotate-180"
                  />
                  <div className="absolute inset-0 z-10 rotate-180 bg-linear-to-r from-transparent to-bg-down" />
                </div>
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20">
                  <h1 className="text-white text-h1 font-primary">
                    {item.maincategory}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        <div
          className={cn(
            "grid grid-cols-1 gap-4 px-4",
            currentSlug === null ? "md:grid-cols-4" : "md:grid-cols-3",
          )}
        >
          {data
            .filter((item) => item.slug !== currentSlug)
            .map((item) => (
              <ToolTipPages key={item._id} text={item.maincategory}>
                <Button
                  asChild
                  variant="category"
                  size="ghostsize"
                  key={item._id}
                  className="w-full overflow-hidden"
                  onClick={() => router.push(`/catalog/${item.slug}`)}
                >
                  <div className="group relative aspect-[30/9] md:aspect-[10/9] lg:aspect-video h-full cursor-pointer">
                    <div className="">
                      <Image
                        src={item.image}
                        alt="category"
                        fill
                        className="object-cover my-transition group-hover:scale-105"
                      />
                      <div className="absolute inset-0 z-10 h-full bg-primary/75 group-hover:bg-primary/0 my-transition" />
                    </div>
                    <div className="absolute inset-0 z-20 flex items-center w-full">
                      <p className="text-2xl p-6 flex flex-row justify-center text-center w-full text-white group-hover:text-primary text-wrap">
                        {item.maincategory}
                      </p>
                    </div>
                  </div>
                </Button>
              </ToolTipPages>
            ))}
        </div>
      </div>
    );
}