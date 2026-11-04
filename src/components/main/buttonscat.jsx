"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ToolTipPages } from "../toolt/tooltip";
export default function ButtonCategoryMain({data}) {
  const router = useRouter();
  return (
    <div>
      <div className="my-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item) => (
            <ToolTipPages key={item._id} text={item.maincategory}>
              <Button
                variant="category"
                size="ghostsize"
                className="w-full h-auto overflow-hidden p-0" 
                onClick={() => router.push(`/catalog/${item.slug}`)}
              >
                <div className="group relative aspect-[20/7] w-full">
                  <Image
                    src={item.image}
                    alt="category"
                    fill
                    className="object-cover my-transition group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/50 z-20 flex items-center w-full">
                    <p className="text-2xl p-6 flex flex-row justify-center text-center w-full">
                      {item.maincategory}
                    </p>
                  </div>
                </div>
              </Button>
            </ToolTipPages>
          ))}
        </div>
      </div>
    </div>
  );
}