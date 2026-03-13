"use client"; 
import dataFile from "../../app/data/data.json";
import Background from "../background";
import Brands from "../brands/brands";
import Information from "./information";
import MainInfo from "./maininfo";
import Reviews from "./reviews";
import SimilarProducts from "./similarproducts";
export default function Product(){
    const products = dataFile.data;
    const product = dataFile.data[0]; 
    return (
      <div className="relative overflow-hidden">
         <div className="absolute hidden lg:block w-full h-full -z-10">
            <Background />
        </div>
        <div className="my-container">
          <div className="h-full">
            <MainInfo data={product} />
            <Information data={product} />
            <Reviews data={product} />
            <SimilarProducts data={products} />
          </div>
        </div>
        <Brands/>
      </div>
    );
}