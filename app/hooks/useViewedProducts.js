// app/hooks/useViewedProducts.js
"use client";

import { useEffect } from "react";

export function useViewedProductTracking(productId) {
  useEffect(() => {
    if (!productId) return;

    const updateViewedProducts = () => {
      // Fix: Use empty array string as default
      const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

      // Remove if already exists
      const filtered = viewed.filter((id) => id !== productId.toString());

      // Add to beginning and limit to 10 items
      const updated = [productId.toString(), ...filtered].slice(0, 10);

      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
    };

    updateViewedProducts();
  }, [productId]);
}
