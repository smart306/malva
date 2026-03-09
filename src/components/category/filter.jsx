import Image from "next/image";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
const data = [
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
  }
];
export default function Filter(){

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
            <Accordion type="single" collapsible className="p-2">
              <AccordionItem value="face">
                <AccordionTrigger className="p font-primary">
                  Обличчя
                </AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
              <AccordionItem value="eye">
                <AccordionTrigger className="p font-primary">
                  Очі
                </AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
              <AccordionItem value="brows">
                <AccordionTrigger className="p font-primary">
                  Брови
                </AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
              <AccordionItem value="brush">
                <AccordionTrigger className="p font-primary">
                  Пензлі
                </AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
              <AccordionItem value="nails">
                <AccordionTrigger className="p font-primary">
                  Нігті
                </AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarGroup>
          <SidebarGroup className="gap-4 border-b border-secondary">
            <Accordion type="single" collapsible className="p-2">
              <AccordionItem value="price">
                <AccordionTrigger className="h3">Ціна</AccordionTrigger>
                <AccordionContent>
                  <div className="p-2">
                    <Slider
                      defaultValue={[25, 50]}
                      max={100}
                      step={1}
                      className="mx-auto w-full max-w-xs"
                    />
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
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-1"
                    />
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-2"
                    />
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-3"
                    />
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-4"
                    />
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-5"
                    />
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-6"
                    />
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-7"
                    />
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-8"
                    />
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-9"
                    />
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-10"
                    />
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-11"
                    />
                    <Button
                      size="xs"
                      variant="color"
                      className="rounded-full aspect-square bg-color-12"
                    />
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
                    {data.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-center items-center"
                      >
                        <Button className="font-primary font-light px-2 py-1 text-xs w-full rounded-xl">
                          <p className="text-wrap">{item.brand}</p>
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarGroup>
          <SidebarGroup>
            <Button
              variant="secondary"
              className="w-full p-2 rounded-full font-primary"
            >
              Застосувати
            </Button>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>
    );
}