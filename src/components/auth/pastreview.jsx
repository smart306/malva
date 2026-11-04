import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Star } from "lucide-react";


export default function PastReviews({user, products}){
      return (
        <div className="w-full py-4">
          <div className="my-container">
            <div className="flex flex-col lg:flex-row w-full">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4">
                {user.map((item) => {
                    const matchedProduct = products.find(
                        (p) => p._id === item.product,
                      );
                      return(
                      <Card key={item._id}>
                    <CardHeader className="font-secondary text-xl">
                      <Link href={`/catalog/product/${matchedProduct._id}`}>
                        {matchedProduct.title}
                      </Link>
                    </CardHeader>
                    <CardContent className="mx-4 p-4 bg-white min-h-20 rounded-full border border-border">
                      <p>{item.review}</p>
                    </CardContent>
                    <CardFooter>
                      {Array.from({ length: 5 }, (_, index) => {
                        const starValue = index + 1;
                        const isFilled = starValue <= (item.star || 0);

                        return (
                          <Star
                            key={`review-${item._id}-star-${starValue}`}
                            className={`w-5 h-5 ${
                              isFilled
                                ? "text-secondary fill-secondary"
                                : "text-secondary"
                            }`}
                          />
                        );
                      })}
                      <p>{item.createdAt}</p>
                    </CardFooter>
                  </Card>
                      )
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }