import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import CardProduct from "../category/cardpro";

export default function SimilarProducts({datasimilar}){
    return (
      <section className="bg-primary">
        <div className="w-full text-center p-4">
          <h1 className="font-primary h1 text-white">Схожі товари</h1>
        </div>
        <Carousel opts={{ align: "start" }} className="w-full h-full p-4">
          <CarouselContent>
                {datasimilar.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 h-full"
                  >
                    <CardProduct item={item}/>
                  </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
      </section>
    );
}