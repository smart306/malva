import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ToolTipButtons } from "../toolt/tooltip";
import { Label } from "../ui/label";
import { Field, FieldGroup } from "../ui/field";
import { Checkbox } from "../ui/checkbox";
export default function Filter({
  minBound,
  maxBound,
  rangeValue,
  onRangeChange,
  categories,
  selectedCategories,
  onToggleCategory,
  brands,
  selectedBrands,
  onToggleBrand,
  colors,
  selectedColors,
  onToggleColor,
  onReset,
}) {
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
          <Accordion type="single" collapsible className="p-2 w-full">
            <AccordionItem value="categories">
              <AccordionTrigger className="h3">Категорії</AccordionTrigger>
              <AccordionContent>
                <FieldGroup className="p-2">
                  {categories.length === 0 ? (
                    <p className="text-sm opacity-70">Категорії відсутні</p>
                  ) : (
                    categories.map((category) => {
                      const checkboxId = `category-${category}`;
                      return (
                        <Field
                          key={category}
                          orientation="horizontal"
                          value={category}
                          className="flex justify-between"
                        >
                          <Label
                            htmlFor={checkboxId}
                            className="p font-primary"
                          >
                            {category}
                          </Label>
                          <Checkbox
                            id={checkboxId}
                            name={checkboxId}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => onToggleCategory(category)}
                          />
                        </Field>
                      );
                    })
                  )}
                </FieldGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SidebarGroup>
        <SidebarGroup className="gap-4 border-b border-secondary">
          <Accordion type="single" collapsible className="p-2">
            <AccordionItem value="price">
              <AccordionTrigger className="h3">Ціна</AccordionTrigger>
              <AccordionContent>
                <div className="p-2">
                  <ToolTipButtons text={`${rangeValue[0]} — ${rangeValue[1]}`}>
                    <Slider
                      value={rangeValue}
                      min={minBound}
                      max={maxBound}
                      step={1}
                      onValueChange={onRangeChange}
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
            <AccordionItem value="colors">
              <AccordionTrigger className="h3 text-secondary">
                Кольори
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-6 gap-2 p-2">
                  {colors.length === 0 ? (
                    <p className="text-sm opacity-70 col-span-6">Кольори відсутні</p>
                  ) : (
                    colors.map((color) => {
                      const isActive = selectedColors.includes(color);
                      return (
                        <ToolTipButtons key={color} text={color}>
                          <button
                            type="button"
                            onClick={() => onToggleColor(color)}
                            aria-label={`Обрати колір ${color}`}
                            className={`h-7 w-7 rounded-full border transition ${
                              isActive
                                ? "border-secondary ring-2 ring-secondary"
                                : "border-white/40"
                            } ${color}`}
                           
                          />
                        </ToolTipButtons>
                      );
                    })
                  )}
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
                  {brands.map((brand) => {
                    const isActive = selectedBrands.includes(brand);
                    return (
                      <ToolTipButtons key={brand} text="Обрати цей бренд">
                        <div className="flex justify-center items-center">
                          <Button
                            onClick={() => onToggleBrand(brand)}
                            className={`font-primary font-light px-2 py-1 text-xs w-full rounded-xl ${
                              isActive ? "bg-secondary text-primary" : ""
                            }`}
                          >
                            <p className="text-wrap">{brand}</p>
                          </Button>
                        </div>
                      </ToolTipButtons>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SidebarGroup>
        <SidebarGroup>
          <ToolTipButtons text={"Скинути всі фільтри"}>
            <Button
              variant="secondary"
              onClick={onReset}
              className="w-full p-2 rounded-full font-primary"
            >
              Скинути
            </Button>
          </ToolTipButtons>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
