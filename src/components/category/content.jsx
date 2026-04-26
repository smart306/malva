"use client";
import { useEffect, useMemo, useState } from "react";
import { SidebarProvider, useSidebar } from "../ui/sidebar";
import Filter from "./filter";
import { SlidersIcon } from "lucide-react";
import { Button } from "../ui/button";
import Background from "../background";
import CardProduct from "./cardpro";
import { ToolTipButtons } from "../toolt/tooltip";

const normalizeRange = (nextMin, nextMax, minBound, maxBound) => {
  const lowBound = Math.min(minBound, maxBound);
  const highBound = Math.max(minBound, maxBound);

  const clampedMin = Math.min(Math.max(nextMin, lowBound), highBound);
  const clampedMax = Math.min(Math.max(nextMax, lowBound), highBound);

  return {
    min: Math.min(clampedMin, clampedMax),
    max: Math.max(clampedMin, clampedMax),
  };
};

export default function ContentCategory({
  data,
  minBound,
  maxBound,
  brands,
  colors,
  currentCategory,
}) {
  const computedMinBound = useMemo(() => {
    if (typeof minBound === "number") {
      return minBound;
    }
    const prices = data
      .map((item) => Number(item.price))
      .filter((price) => !Number.isNaN(price));
    return prices.length ? Math.floor(Math.min(...prices)) : 0;
  }, [data, minBound]);

  const computedMaxBound = useMemo(() => {
    if (typeof maxBound === "number") {
      return maxBound;
    }
    const prices = data
      .map((item) => Number(item.price))
      .filter((price) => !Number.isNaN(price));
    return prices.length ? Math.ceil(Math.max(...prices)) : 10000;
  }, [data, maxBound]);

  const categories = useMemo(() => {
    const set = new Set();
    for (const item of data) {
      const values = Array.isArray(item.subcategories)
        ? item.subcategories
        : [];
      for (const value of values) {
        const normalized = String(value || "").trim();
        if (normalized) {
          set.add(normalized);
        }
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const availableBrands = useMemo(() => {
    if (Array.isArray(brands) && brands.length > 0) {
      return brands;
    }

    const set = new Set();
    for (const item of data) {
      const brand = String(item.brand || "").trim();
      if (brand) {
        set.add(brand);
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [brands, data]);

  const availableColors = useMemo(() => {
    if (Array.isArray(colors) && colors.length > 0) {
      return colors;
    }

    const set = new Set();
    for (const item of data) {
      const values = Array.isArray(item.colors) ? item.colors : [];
      for (const value of values) {
        const normalized = String(value?.color || "").trim();
        if (normalized) {
          set.add(normalized);
        }
      }
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [colors, data]);

  const [rangeValue, setRangeValue] = useState([
    computedMinBound,
    computedMaxBound,
  ]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const price = Number(item.price);
      if (
        Number.isNaN(price) ||
        price < rangeValue[0] ||
        price > rangeValue[1]
      ) {
        return false;
      }

      if (selectedBrands.length > 0) {
        const brand = String(item.brand || "").trim();
        if (!selectedBrands.includes(brand)) {
          return false;
        }
      }

      if (selectedCategories.length > 0) {
        const itemCategories = Array.isArray(item.subcategories)
          ? item.subcategories
          : [];
        const hasCategory = itemCategories.some((value) =>
          selectedCategories.includes(String(value || "").trim()),
        );
        if (!hasCategory) {
          return false;
        }
      }

      if (selectedColors.length > 0) {
        const itemColors = Array.isArray(item.colors) ? item.colors : [];
        const hasColor = itemColors.some((value) =>
          selectedColors.includes(String(value?.color || "").trim()),
        );
        if (!hasColor) {
          return false;
        }
      }

      return true;
    });
  }, [data, rangeValue, selectedBrands, selectedCategories, selectedColors]);

  const handleRangeChange = (nextRange) => {
    const [nextMin = computedMinBound, nextMax = computedMaxBound] = nextRange;
    const normalized = normalizeRange(
      nextMin,
      nextMax,
      computedMinBound,
      computedMaxBound,
    );
    setRangeValue([normalized.min, normalized.max]);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand],
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color],
    );
  };

  const resetFilters = () => {
    setRangeValue([computedMinBound, computedMaxBound]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedColors([]);
  };

  useEffect(() => {
    setRangeValue([computedMinBound, computedMaxBound]);
  }, [computedMinBound, computedMaxBound]);

  const MobileTrigger = () => {
    const { toggleSidebar } = useSidebar();
    return (
      <Button variant="secondary" onClick={toggleSidebar} className="p-2">
        <SlidersIcon />
      </Button>
    );
  };
  return (
    <div className="w-full h-full relative">
      <div className="absolute hidden lg:block w-full h-full -z-10">
        <Background />
      </div>
      <div className="my-container relative flex flex-col md:flex-row gap-x-4">
        <SidebarProvider className="contents h-full">
          <div className="md:hidden flex justify-center items-center p-4">
            <MobileTrigger />
          </div>
          <Filter
            currentCategory={currentCategory}
            minBound={computedMinBound}
            maxBound={computedMaxBound}
            rangeValue={rangeValue}
            onRangeChange={handleRangeChange}
            categories={categories}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
            brands={availableBrands}
            selectedBrands={selectedBrands}
            onToggleBrand={toggleBrand}
            colors={availableColors}
            selectedColors={selectedColors}
            onToggleColor={toggleColor}
            onReset={resetFilters}
          />
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {filteredData.map((item) => (
                <CardProduct key={item._id} item={item} />
              ))}
            </div>
            <div className="w-full flex justify-center p-4">
              <ToolTipButtons text="Більше товарів">
                <Button className="px-4 py-2 flex justify-center items-center text-center rounded-full w-full md:w-fit">
                  <p className="h3 font-secondary text-center items-center ">
                    Більше
                  </p>
                </Button>
              </ToolTipButtons>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}
