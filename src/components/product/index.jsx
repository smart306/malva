"use client";
import { useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/recentlyViewed";
import SimilarProducts from "./similarproducts";
import Reviews from "./reviews";
import Information from "./information";
import MainInfo from "./maininfo";
import Background from "../background";
import Brands from "../brands/brands";

export default function ProductP({
  data,
  productssim,
  session,
  dostavkasOptions,
  userreviews,
}) {
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    if (data?._id) {
      addProduct(data._id);
    }
  }, [data?._id, addProduct]);
  return (
    <div className="relative overflow-hidden">
      <div className="absolute hidden lg:block w-full h-full -z-10">
        <Background />
      </div>
      <div className="my-container">
        <div className="h-full">
          <MainInfo datamain={data} dostavkasOptions={dostavkasOptions} />
          <Information datainfo={data.info} />
          <Reviews
            productId={data._id}
            datareview={data.reviews || []}
            session={session}
            reviews={userreviews}
          />
          <SimilarProducts datasimilar={productssim} />
        </div>
      </div>
      <Brands />
    </div>
  );
}