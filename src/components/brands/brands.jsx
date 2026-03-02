"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { getMarqueeVariants, slideVariants } from "../lib/animation";
import { useEffect, useState } from "react";
const data = [
  {
    id: 1,
    image: "/4jwKW74J1.svg",
  },
  {
    id: 2,
    image: "/fposter,small,wall_texture,product,750x10001.svg",
  },
  {
    id: 3,
    image: "/images1.svg",
  },
  {
    id: 4,
    image: "/ljqlvughy8fz86c9j5ed1.svg",
  },
  {
    id: 5,
    image: "/mac-cosmetics-logo1.svg",
  },
  {
    id: 6,
    image: "/tirtir_logo1.svg",
  },
];
const itemWidthComp = 200;
const itemWidthMob = 100;
const totalWidthComp = data.length * itemWidthComp;
const groups = [
  [data[0], data[1]],
  [data[2], data[3]],
  [data[4], data[5]],
];

export default function Brands() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % groups.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-black py-10">
      <motion.div
        className="sm:flex hidden"
        variants={getMarqueeVariants(totalWidthComp)}
        animate="animate"
      >
        {[...data, ...data, ...data].map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: `${itemWidthComp}px` }}
          >
            <Image
              src={item.image}
              width={120}
              height={120}
              alt="logo"
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>
      <div className="flex sm:hidden justify-center relative h-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="flex gap-4 absolute"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {groups[index].map((item, i) => (
              <div
                key={item.image}
                className="flex flex-row items-center justify-between"
                style={{ width: `${itemWidthMob}px` }}
              >
                <Image
                  src={item.image}
                  width={80}
                  height={80}
                  alt="logo"
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}