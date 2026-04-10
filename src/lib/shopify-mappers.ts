/**
 * Shopify → Product Mapper
 *
 * Transforms Shopify Storefront API responses into the existing `Product`
 * interface used by all UI components. This is the key layer that ensures
 * zero visual regressions — no UI component needs to know about Shopify.
 */

import type { Product } from "@/data/products";
import type { ShopifyProduct, ShopifyCart, ShopifyCartLine } from "@/types/shopify";

// ─── Product Mapping ────────────────────────────────────────────────────────

/**
 * Convert a Shopify product into the local Product shape used by
 * ProductCard, ProductModal, and the Cart.
 */
export function mapShopifyProduct(sp: ShopifyProduct): Product {
  const firstImage = sp.images.edges[0]?.node;
  const price = sp.priceRange.minVariantPrice;

  // Parse dimensions from individual metafields
  const h = sp.dimensions_height?.value || "";
  const w = sp.dimensions_width?.value || "";
  const d = sp.dimensions_depth?.value || "";

  // Parse materials from JSON array metafield or comma-separated string
  let materials: string[] = [];
  if (sp.materials?.value) {
    try {
      const parsed = JSON.parse(sp.materials.value);
      materials = Array.isArray(parsed) ? parsed : [sp.materials.value];
    } catch {
      materials = sp.materials.value.split(",").map((m: string) => m.trim());
    }
  }

  // Format price as "$X,XXX" CAD
  const priceNum = parseFloat(price.amount);
  const formattedPrice = `$${priceNum.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  // Determine category from product handle or collection association
  // Shopify products will be categorized via collections
  const category = inferCategory(sp);

  return {
    id: sp.handle, // Use handle for URL-friendly IDs
    title: sp.title,
    image: firstImage?.url || "",
    price: formattedPrice,
    category,
    dimensions: { h, w, d },
    weight: sp.weight?.value || undefined,
    edition: sp.edition?.value || undefined,
    medium: sp.medium?.value || undefined,
    description: sp.description || undefined,
    materials,
    // Shopify-specific fields stored for cart operations
    shopifyId: sp.id,
    shopifyVariantId: sp.variants.edges[0]?.node.id || "",
    images: sp.images.edges.map((edge) => edge.node.url),
  };
}

/**
 * Infer category from product tags, type, or handle prefix.
 * Falls back to 'gypsum' if indeterminate.
 */
function inferCategory(sp: ShopifyProduct): "gypsum" | "bronze" | "clear" {
  const searchText = `${sp.handle} ${sp.title} ${sp.description}`.toLowerCase();

  if (searchText.includes("bronze")) return "bronze";
  if (searchText.includes("clear") || searchText.includes("resin") || searchText.includes("crystal")) return "clear";
  return "gypsum";
}

// ─── Cart Mapping ───────────────────────────────────────────────────────────

export interface MappedCartItem extends Product {
  quantity: number;
  lineId: string; // Shopify cart line ID (needed for mutations)
  lineCost: number; // Total cost for this line (price × quantity)
}

/**
 * Map a Shopify Cart into the shape consumed by the Checkout page.
 */
export function mapShopifyCart(cart: ShopifyCart): {
  items: MappedCartItem[];
  total: number;
  subtotal: number;
  checkoutUrl: string;
  cartId: string;
  totalQuantity: number;
} {
  const items: MappedCartItem[] = cart.lines.edges.map((edge) => {
    const line = edge.node;
    return mapCartLine(line);
  });

  return {
    items,
    total: parseFloat(cart.cost.totalAmount.amount),
    subtotal: parseFloat(cart.cost.subtotalAmount.amount),
    checkoutUrl: cart.checkoutUrl,
    cartId: cart.id,
    totalQuantity: cart.totalQuantity,
  };
}

function mapCartLine(line: ShopifyCartLine): MappedCartItem {
  const product = line.merchandise.product;
  const firstImage = product.images.edges[0]?.node;
  const price = line.merchandise.price;
  const priceNum = parseFloat(price.amount);
  const formattedPrice = `$${priceNum.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

  let materials: string[] = [];
  if (product.materials?.value) {
    try {
      const parsed = JSON.parse(product.materials.value);
      materials = Array.isArray(parsed) ? parsed : [product.materials.value];
    } catch {
      materials = product.materials.value.split(",").map((m: string) => m.trim());
    }
  }

  const h = product.dimensions_height?.value || "";
  const w = product.dimensions_width?.value || "";
  const d = product.dimensions_depth?.value || "";

  const category = (() => {
    const text = `${product.handle} ${product.title}`.toLowerCase();
    if (text.includes("bronze")) return "bronze" as const;
    if (text.includes("clear") || text.includes("resin")) return "clear" as const;
    return "gypsum" as const;
  })();

  return {
    id: product.handle,
    title: product.title,
    image: firstImage?.url || "",
    price: formattedPrice,
    category,
    dimensions: { h, w, d },
    weight: product.weight?.value || undefined,
    edition: product.edition?.value || undefined,
    medium: product.medium?.value || undefined,
    materials,
    shopifyId: product.id,
    shopifyVariantId: line.merchandise.id,
    images: product.images.edges.map((e) => e.node.url),
    quantity: line.quantity,
    lineId: line.id,
    lineCost: parseFloat(line.cost.totalAmount.amount),
  };
}
