"use client";
import Image from "next/image";
import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Subscribe() {
  return (
    <div className="w-full h-full bg-secondary border-t-8 border-b-8 border-border">
      <div className="my-container">
        <div className="flex flex-col md:flex-row justify-between items-center w-full h-full p-8 gap-8">
          <div className="relative w-full md:w-1/2 h-full aspect-square flex justify-center items-center">
            <Image
              src="/sealed-letters-piled-stockcake1.png"
              fill
              alt="p"
              className="object-contain rounded-full border-5 border-border"
            />
          </div>
          <div className="w-full flex flex-row justify-center items-center">
                <Field className="flex flex-col items-center justify-center h-full max-w-md">
                  <FieldLabel className="text-black font-primary text-4xl text-center">
                    Надайте свій емейл, щоб найпершим отримувати сповіщення про
                    нові товари
                  </FieldLabel>
                  <Input
                    placeholder="Введіть свій емейл..."
                    className="w-full border-2 border-primary p-4"
                  />
                  <Button className="p-4 text-2xl rounded-full">Надати</Button>
                </Field>
          </div>
        </div>
      </div>
    </div>
  );
}