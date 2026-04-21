import Image from "next/image";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useState } from "react";
import { ToolTipButtons } from "../toolt/tooltip";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Field, FieldGroup } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
const datacolor = [
  {
    classname: "bg-color-1",
  },
  {
    classname: "bg-color-2",
  },
  {
    classname: "bg-color-3",
  },
  {
    classname: "bg-color-4",
  },
  {
    classname: "bg-color-5",
  },
  {
    classname: "bg-color-6",
  },
  {
    classname: "bg-color-7",
  },
  {
    classname: "bg-color-8",
  },
  {
    classname: "bg-color-9",
  },
  {
    classname: "bg-color-10",
  },
  {
    classname: "bg-color-11",
  },
  {
    classname: "bg-color-12",
  },
];
const databrand = [
  {
    id: 1,
    brand: "HanGlow",
  },
  {
    id: 2,
    brand: "LANCOME",
  },
  {
    id: 3,
    brand: "Claresa",
  },
  {
    id: 4,
    brand: "CLIO",
  },
  {
    id: 5,
    brand: "Missha",
  },
  {
    id: 6,
    brand: "esseance",
  },
  {
    id: 7,
    brand: "MAX FACTOR",
  },
  {
    id: 8,
    brand: "Saint Laurent",
  },
  {
    id: 9,
    brand: "RiRe",
  },
  {
    id: 10,
    brand: "Dermacol",
  },
  {
    id: 11,
    brand: "NARS",
  },
  {
    id: 12,
    brand: "MAC",
  },
  {
    id: 13,
    brand: "L`oreal Paris",
  },
  {
    id: 14,
    brand: "Rom&nd",
  },
  {
    id: 15,
    brand: "TIRTIR",
  },
  {
    id: 16,
    brand: "Caterice",
  },
  {
    id: 17,
    brand: "Heimish",
  },
  {
    id: 18,
    brand: "Paese",
  },
  {
    id: 19,
    brand: "Maybeline",
  },
  {
    id: 20,
    brand: "NYX",
  },
];
export default function Filter() {
  const [rangeValue, setRangeValue] = useState([25, 50]);
  return (
    <Sidebar
      side="left"
      className="h-full p-4 bg-linear-to-r from-transparent to-primary"
    >
      <SidebarHeader className="flex flex-row justify-between w-full border-b border-secondary">
        <h1 className="text-secondary font-primary h3">Фільтри</h1>
        <Image src="/Frame.svg" alt="p" width={16} height={16} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="gap-4 border-b border-secondary">
          <FieldGroup className="p-2">
            <Field
              orientation="horizontal"
              value="face"
              className="flex justify-between"
            >
              <Label htmlFor="filter-checkbox" className="p font-primary">
                Обличчя
              </Label>
              <Checkbox id="filter-checkbox" name="filter-checkbox" />
            </Field>
            <Field
              orientation="horizontal"
              value="face"
              className="flex justify-between"
            >
              <Label htmlFor="filter-checkbox" className="p font-primary">
                Очі
              </Label>
              <Checkbox id="filter-checkbox" name="filter-checkbox" />
            </Field>
            <Field
              orientation="horizontal"
              value="face"
              className="flex justify-between"
            >
              <Label htmlFor="filter-checkbox" className="p font-primary">
                Брови
              </Label>
              <Checkbox id="filter-checkbox" name="filter-checkbox" />
            </Field>
            <Field
              orientation="horizontal"
              value="face"
              className="flex justify-between"
            >
              <Label htmlFor="filter-checkbox" className="p font-primary">
                Губи
              </Label>
              <Checkbox id="filter-checkbox" name="filter-checkbox" />
            </Field>
            <Field
              orientation="horizontal"
              value="face"
              className="flex justify-between"
            >
              <Label htmlFor="filter-checkbox" className="p font-primary">
                Нігті
              </Label>
              <Checkbox id="filter-checkbox" name="filter-checkbox" />
            </Field>
          </FieldGroup>
        </SidebarGroup>
        <SidebarGroup className="gap-4 border-b border-secondary">
          <Accordion type="single" collapsible className="p-2">
            <AccordionItem value="price">
              <AccordionTrigger className="h3">Ціна</AccordionTrigger>
              <AccordionContent>
                <div className="p-2">
                  <ToolTipButtons text={`${rangeValue[0]} — ${rangeValue[1]}`}>
                    <Slider
                      value={rangeValue} // Важливо: використовуємо value для синхронізації
                      max={100}
                      step={1}
                      onValueChange={(v) => setRangeValue(v)}
                      className="mx-auto w-full max-w-xs"
                    />
                  </ToolTipButtons>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SidebarGroup>
        <SidebarGroup className="gap-4 border-b border-secondary">
          <Accordion type="single" collapsible className="p-2">
            <AccordionItem value="color">
              <AccordionTrigger className="h3">Кольори</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-6 grid-rows-2 p-2 gap-2 w-full">
                  {datacolor.map((item) => (
                    <ToolTipButtons
                      key={item.classname}
                      text="Обрати цей колір"
                    >
                      <Button
                        size="xs"
                        variant="color"
                        className={cn(
                          "rounded-full aspect-square",

                          item.classname,
                        )}
                      />
                    </ToolTipButtons>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SidebarGroup>
        <SidebarGroup className="gap-4 border-b border-secondary">
          <Accordion type="single" collapsible className="p-2">
            <AccordionItem value="brands">
              <AccordionTrigger className="h3 text-secondary">
                Бренди
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-3 gap-1 justify-center items-center">
                  {databrand.map((item) => (
                    <ToolTipButtons key={item.id} text="Обрати цей бренд">
                      <div className="flex justify-center items-center">
                        <Button className="font-primary font-light px-2 py-1 text-xs w-full rounded-xl">
                          <p className="text-wrap">{item.brand}</p>
                        </Button>
                      </div>
                    </ToolTipButtons>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SidebarGroup>
        <SidebarGroup>
          <ToolTipButtons text={"Застосувати обрані фільтри"}>
            <Button
              variant="secondary"
              className="w-full p-2 rounded-full font-primary"
            >
              Застосувати
            </Button>
          </ToolTipButtons>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}