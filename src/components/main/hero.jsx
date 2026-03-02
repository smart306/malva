"use client"
import Image from "next/image";
import { Button } from "../ui/button";

export default function Header(){
    return (
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute w-full h-screen z-10 bg-linear-to-b from-primary/15 to-linear"></div>
        <Image
          src="/Header.gif"
          alt="hero"
          fill
          priority
          className="hidden lg:block object-cover -z-10"
        />
        <div className="lg:hidden relative">
          <div className="absolute -translate-x-5/8 sm:-translate-x-1/5 translate-y-3">
            <div className="relative w-100 sm:w-110 md:w-120 aspect-square rounded-full">
              <Image
                src="/Header.gif"
                alt="hero"
                fill
                priority
                className="object-cover object-right rounded-full -z-10"
              />
            </div>
          </div>

          <div className="absolute translate-x-4/6 sm:translate-x-1/5 right-0 top-50 sm:top-90">
            <div className="relative w-100 sm:w-110 md:w-120 h-auto aspect-square rounded-full">
              <Image
                src="/Header.gif"
                alt="hero"
                fill
                priority
                className="object-cover object-bottom-left rounded-full -z-10"
              />
            </div>
          </div>
          <div className="absolute -translate-x-3/5 sm:hidden top-110">
            <div className="relative w-100 h-auto aspect-square rounded-full">
              <Image
                src="/Header.gif"
                alt="hero"
                fill
                priority
                className="object-cover rounded-full -z-10"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="my-container z-20">
            <div className="w-full h-screen flex flex-col justify-center items-center text-center gap-5">
              <div>
                <h2 className="h1 text-center">Malva</h2>
                <p className="font-secondary h3">
                  Швидкоб зручно, якісно. Магазин найркащої косметики з усього
                  світу
                </p>
              </div>
              <Button className="py-2 px-4 text-2xl">Асортимент</Button>
            </div>
          </div>
        </div>
      </div>
    );
}