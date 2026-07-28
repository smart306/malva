"use client";
import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "recently_viewed_products";
const MAX_ITEMS = 10;

export function useRecentlyViewed() {
  const [productIds, setProductIds] = useState([]);

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

  const addProduct = useCallback((id) => {
    if (!id) return;

    setProductIds((prev) => {
      const filtered = prev.filter((item) => item !== id);
      const updated = [id, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { productIds, addProduct };
}