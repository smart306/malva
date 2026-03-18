"use client"; 
import Background from "../background";
import Brands from "../brands/brands";
import Information from "./information";
import MainInfo from "./maininfo";
import Reviews from "./reviews";
import SimilarProducts from "./similarproducts";
export default function ProductP({data, productssim}){
    return (
      <div className="relative overflow-hidden">
         <div className="absolute hidden lg:block w-full h-full -z-10">
            <Background />
        </div>
        <div className="my-container">
          <div className="h-full">
            <MainInfo datamain={data} />
            <Information datainfo={data.info} />
            <Reviews datareview={data.reviews} />
            <SimilarProducts datasimilar={productssim} />
          </div>
        </div>
        <Brands/>
      </div>
    );
}