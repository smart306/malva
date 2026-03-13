"use client"
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export default function Information({data}){
    return (
      <section className="bg-primary">
        <div className="p-4">
          <Accordion type="single" collapsible className="p-2">
            {data.info.map((item) => (
              <AccordionItem key={item.id} value={item.id.toString()} className={cn("border-b border-white p-2", item.id === 4 ? "border-none" : "")}>
                <AccordionTrigger className="h3 text-white font-primary p-4">{item.acoritem}</AccordionTrigger>
                <AccordionContent className="text-white font-primary p-4">{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    );
}