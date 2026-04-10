/**
 * Shopify Storefront API — Client
 *
 * Lightweight fetch-based client that routes all requests through
 * the Netlify Functions proxy (/api/shopify) to keep tokens server-side.
 */

import type {
  ShopifyCart,
  ShopifyCartResponse,
  ShopifyProduct,
  ShopifyProductResponse,
  ShopifyProductsResponse,
} from "@/types/shopify";
import {
  PRODUCTS_BY_COLLECTION,
  PRODUCT_BY_HANDLE,
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
  CART_QUERY,
} from "./shopify-queries";

// ─── Core Fetch ─────────────────────────────────────────────────────────────

const PROXY_ENDPOINT = "/api/shopify";

interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<GraphQLResponse<T>> {
  const response = await fetch(PROXY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Shopify API error (${response.status}): ${errorBody}`
    );
  }

  const json = await response.json();

  if (json.errors?.length) {
    throw new Error(
      `Shopify GraphQL error: ${json.errors.map((e: { message: string }) => e.message).join(", ")}`
    );
  }

  return json;
}

// ─── Product API ────────────────────────────────────────────────────────────

/**
 * Fetch all products in a collection by handle.
 * @param collectionHandle - e.g. "gypsum", "bronze", "clear"
 * @param first - max products to return (default 50)
 */
export async function fetchProductsByCollection(
  collectionHandle: string,
  first: number = 50
): Promise<ShopifyProduct[]> {
  const { data } = await shopifyFetch<ShopifyProductsResponse["data"]>(
    PRODUCTS_BY_COLLECTION,
    { handle: collectionHandle, first }
  );

  if (!data.collection) return [];
  return data.collection.products.edges.map((edge) => edge.node);
}

/**
 * Fetch a single product by its handle.
 * @param handle - URL-friendly product slug
 */
export async function fetchProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const { data } = await shopifyFetch<ShopifyProductResponse["data"]>(
    PRODUCT_BY_HANDLE,
    { handle }
  );

  return data.product;
}

// ─── Cart API ───────────────────────────────────────────────────────────────

/**
 * Create a new cart with an initial line item.
 */
export async function createCart(
  variantId: string,
  quantity: number = 1
): Promise<ShopifyCart> {
  const { data } = await shopifyFetch<ShopifyCartResponse["data"]>(
    CART_CREATE,
    {
      input: {
        lines: [{ merchandiseId: variantId, quantity }],
      },
    }
  );

  const result = data.cartCreate;
  if (!result) throw new Error("Cart creation returned no data");
  if (result.userErrors.length > 0) {
    throw new Error(
      `Cart creation failed: ${result.userErrors.map((e) => e.message).join(", ")}`
    );
  }

  return result.cart;
}

/**
 * Add a line item to an existing cart.
 */
export async function addCartLine(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<ShopifyCart> {
  const { data } = await shopifyFetch<ShopifyCartResponse["data"]>(
    CART_LINES_ADD,
    {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    }
  );

  const result = data.cartLinesAdd;
  if (!result) throw new Error("Cart line add returned no data");
  if (result.userErrors.length > 0) {
    throw new Error(
      `Add to cart failed: ${result.userErrors.map((e) => e.message).join(", ")}`
    );
  }

  return result.cart;
}

/**
 * Remove line items from a cart.
 */
export async function removeCartLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const { data } = await shopifyFetch<ShopifyCartResponse["data"]>(
    CART_LINES_REMOVE,
    { cartId, lineIds }
  );

  const result = data.cartLinesRemove;
  if (!result) throw new Error("Cart line remove returned no data");
  if (result.userErrors.length > 0) {
    throw new Error(
      `Remove from cart failed: ${result.userErrors.map((e) => e.message).join(", ")}`
    );
  }

  return result.cart;
}

/**
 * Update the quantity of a line item.
 */
export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  const { data } = await shopifyFetch<ShopifyCartResponse["data"]>(
    CART_LINES_UPDATE,
    {
      cartId,
      lines: [{ id: lineId, quantity }],
    }
  );

  const result = data.cartLinesUpdate;
  if (!result) throw new Error("Cart line update returned no data");
  if (result.userErrors.length > 0) {
    throw new Error(
      `Update cart failed: ${result.userErrors.map((e) => e.message).join(", ")}`
    );
  }

  return result.cart;
}

/**
 * Fetch an existing cart by ID (for rehydrating from localStorage).
 */
export async function fetchCart(
  cartId: string
): Promise<ShopifyCart | null> {
  const { data } = await shopifyFetch<ShopifyCartResponse["data"]>(
    CART_QUERY,
    { cartId }
  );

  return data.cart ?? null;
}
