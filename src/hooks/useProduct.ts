/**
 * useProduct — Fetches a single product from Shopify by handle.
 * Falls back to static data if Shopify is unavailable.
 */

import { useState, useEffect } from "react";
import type { Product } from "@/data/products";
import { products as staticProducts } from "@/data/products";
import { fetchProductByHandle } from "@/lib/shopify";
import { mapShopifyProduct } from "@/lib/shopify-mappers";

interface UseProductResult {
  product: Product | null;
  isLoading: boolean;
  error: string | null;
}

export function useProduct(handle: string | undefined): UseProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(!!handle);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) {
      setProduct(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function loadProduct() {
      setIsLoading(true);
      setError(null);

      try {
        const shopifyProduct = await fetchProductByHandle(handle!);

        if (cancelled) return;

        if (shopifyProduct) {
          setProduct(mapShopifyProduct(shopifyProduct));
        } else {
          fallbackToStatic();
        }
      } catch (err) {
        if (cancelled) return;
        console.warn("Shopify product fetch failed, falling back:", err);
        fallbackToStatic();
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    function fallbackToStatic() {
      // Try matching by handle (id in static data) or by numeric id
      const found = staticProducts.find(
        (p) => p.id === handle || p.title.toLowerCase().replace(/\s+/g, "-") === handle
      );
      setProduct(found || null);
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, [handle]);

  return { product, isLoading, error };
}
