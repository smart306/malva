"use client";

import { Loader2, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import Image from "next/image";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const wrapperRef = useRef(null);

  // доступність
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const value = query.trim();

    if (!value || value.length < 2) {
      setItems([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/products/search-preview?q=${encodeURIComponent(value)}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          setItems([]);
          setOpen(false);
          return;
        }

        const data = await res.json();
        setItems(data);
        setOpen(true);
      } catch (error) {
        if (error?.name !== "AbortError") {
          setItems([]);
          setOpen(false);
        }
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="flex gap-2 items-center">
        <Input
          placeholder="Пошук..."
          className="w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading ? <Loader2 className="animate-spin" /> : <Search />}
      </div>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border bg-white shadow-lg">
          {items.length > 0 ? (
            <div className="max-h-105 overflow-y-auto p-2">
              {items.map((item) => (
                <Link
                    key={item._id}
                    href={`/catalog/product/${item._id}`}
                    className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent"
                    onClick={() => setOpen(false)}
                    onFocus={() => {
                        if (items.length > 0) setOpen(true);
                    }}
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md aspect-square">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    {typeof item.price === "number" && (
                      <p className="text-sm text-muted-foreground">
                        {item.price.toLocaleString("uk-UA")} ₴
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="p-3 text-sm text-muted-foreground">
                Нічого не знайдено
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
