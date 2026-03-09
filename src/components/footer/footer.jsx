"use client"

import { FacebookIcon, InstagramIcon, Mail, MapPinned, Phone } from "lucide-react";
import Image from "next/image"
import Link from "next/link";

export default function Footer(){
    return (
      <footer className="z-50 bg-primary border-b-2 border-t-2 border-border-nav">
        <div className="my-container">
          <div className="p-4 w-full flex flex-col lg:flex-row justify-between">
            <div className="p-4 space-y-4 md:flex md:gap-4 lg:flex-col">
              <div className="relative w-1/4 h-auto aspect-square">
                <Image
                  src="/image1.svg"
                  alt="icon"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex flex-col justify-center">
                  <h2 className="h4">Malva</h2>
                  <p className="font-secondary text-lg! lg:h4 lg:font-secondary lg:text-3xl">
                    Магазин найркащої косметики
                  </p>
                </div>
                <div>
                  <p className="p font-secondary text-lg">
                    Магазин Malva надає можливість швидко та зручно обрати
                    косметику та навіть спробувати її на собі через функцію
                    “Приміряти”
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-fit w-full p-4">
              <div className="flex gap-2">
                <MapPinned />
                <p className="font-secondary text-secondary text-2xl lg:text-base">
                  Lviv, Zelena street 40
                </p>
              </div>
              <div className="flex gap-2">
                <Mail />
                <p className="font-secondary text-secondary text-2xl lg:text-base">
                  malva.shop@gmail.com
                </p>
              </div>
              <div className="flex gap-2">
                <Phone />
                <p className="font-secondary text-secondary text-2xl lg:text-base">
                  +380095438967
                </p>
              </div>
            </div>
            <div className="w-full p-4 flex flex-col-reverse lg:flex-col gap-4 justify-between">
              <h1 className="hidden lg:block font-primary h3 text-secondary text-center">
                Корисні посилання
              </h1>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 p-1">
                <div className="flex justify-center items-center text-center w-full">
                  <Link
                    href="\"
                    className="text-base text-secondary font-primary"
                  >
                    Доставка та оплата
                  </Link>
                </div>
                <div className="flex justify-center items-center text-center w-full">
                  <Link
                    href="\"
                    className="text-base text-secondary font-primary"
                  >
                    Політика конфіденційності
                  </Link>
                </div>
                <div className="flex justify-center items-center text-center w-full">
                  <Link
                    href="\"
                    className="text-base text-secondary font-primary"
                  >
                    Контактна інформація
                  </Link>
                </div>
                <div className="flex justify-center items-center text-center w-full">
                  <Link
                    href="\"
                    className="text-base text-secondary font-primary"
                  >
                    Публічна оферта
                  </Link>
                </div>
                <div className="flex justify-center items-center text-center w-full">
                  <Link
                    href="\"
                    className="text-base text-secondary font-primary"
                  >
                    Гарантії та повернення
                  </Link>
                </div>
                <div className="flex justify-center items-center text-center w-full">
                  <Link
                    href="\"
                    className="text-base text-secondary font-primary"
                  >
                    Про нас
                  </Link>
                </div>
                <div className="flex justify-center items-center text-center w-full col-span-2 lg:col-span-1">
                  <Link
                    href="\"
                    className="text-base text-secondary font-primary"
                  >
                    Часті питання
                  </Link>
                </div>
              </div>
              <div className="flex lg:justify-end justify-center">
                <InstagramIcon width={36} height={36} />
                <FacebookIcon width={36} height={36} />
                <Image src="/tiktok.svg" width={36} height={36} alt="p" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t-2 border-secondary px-4">
          <p className="font-primary text-secondary">Design 2026</p>
        </div>
      </footer>
    );
}