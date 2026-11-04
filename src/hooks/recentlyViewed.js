"use client";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "recently_viewed_products";
const MAX_ITEMS = 10;

export function useRecentlyViewed() {
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setProductIds(parsed);
        }
      }
    } catch (err) {
      console.error("Error loading recently viewed from localStorage:", err);
    }
  }, []);
  useEffect(() => {
    if (!productIds.length) {
      setProducts([]);
      return;
    }
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: productIds }),
        });
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching recently viewed products:", err);
      }
    }
    fetchProducts();
  }, [productIds]);

  const addProduct = useCallback((id) => {
    if (!id) return;

    setProductIds((prev) => {
      const filtered = prev.filter((item) => item !== id);
      const updated = [id, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { productIds, products, addProduct };
}