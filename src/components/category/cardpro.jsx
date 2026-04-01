import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { ShoppingBasket, Star, StarHalf } from "lucide-react";
import { Button } from "../ui/button";
import { addToCart } from "@/lib/cart/cart";

export default function CardProduct({item}){
    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        addToCart(item)
    }
    return (
      <Link href={`/product/${item._id}`} key={item.id}>
        <Card className="w-full h-full hover:scale-110 my-transition">
          <CardContent className="">
            <div className="relative rounded-xl py-4 w-full h-auto aspect-square bg-white overflow-hidden">
              <Image
                src={item?.images[0]}
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
            <Button onClick={handleSubmit} variant="card" className="p-2">
              <ShoppingBasket className="" />
            </Button>
          </CardFooter>
        </Card>
      </Link>
    );
}