/**
 * useProducts — Fetches products from Shopify by collection handle.
 * Falls back to static data if Shopify is unavailable.
 */

import { useState, useEffect } from "react";
import type { Product } from "@/data/products";
import { products as staticProducts } from "@/data/products";
import { fetchProductsByCollection } from "@/lib/shopify";
import { mapShopifyProduct } from "@/lib/shopify-mappers";

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  isFromShopify: boolean;
}

export function useProducts(category?: string): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFromShopify, setIsFromShopify] = useState(false);

  const currentCategory = category?.toLowerCase() || "gypsum";

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      setIsLoading(true);
      setError(null);

      try {
        const shopifyProducts = await fetchProductsByCollection(currentCategory);

        if (cancelled) return;

        if (shopifyProducts.length > 0) {
          const mapped = shopifyProducts.map(p => mapShopifyProduct(p, currentCategory));

          // Merge with static data to fill missing Shopify metafields
          // (dimensions, weight, etc. may not be set in Shopify yet)
          const merged = mapped.map(shopifyProduct => {
            const staticMatch = staticProducts.find(sp => sp.id === shopifyProduct.id);
            if (!staticMatch) return shopifyProduct;

            return {
              ...shopifyProduct,
              // Prefer Shopify data, fall back to static for empty fields
              dimensions: {
                h: shopifyProduct.dimensions.h || staticMatch.dimensions.h,
                w: shopifyProduct.dimensions.w || staticMatch.dimensions.w,
                d: shopifyProduct.dimensions.d || staticMatch.dimensions.d,
              },
              weight: shopifyProduct.weight || staticMatch.weight,
              edition: shopifyProduct.edition || staticMatch.edition,
              medium: shopifyProduct.medium || staticMatch.medium,
              description: shopifyProduct.description || staticMatch.description,
              materials: shopifyProduct.materials.length > 0 ? shopifyProduct.materials : staticMatch.materials,
            };
          });

          setProducts(merged);
          setIsFromShopify(true);
        } else {
          // Collection empty or not found — fall back to static data
          fallbackToStatic();
        }
      } catch (err) {
        if (cancelled) return;
        console.warn("Shopify fetch failed, falling back to static data:", err);
        fallbackToStatic();
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    function fallbackToStatic() {
      const filtered = staticProducts.filter(
        (p) => p.category === currentCategory
      );
      setProducts(filtered);
      setIsFromShopify(false);
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [currentCategory]);

  return { products, isLoading, error, isFromShopify };
}
