/**
 * Shopify Storefront API — TypeScript Types
 *
 * These types mirror the GraphQL response shapes from Shopify's Storefront API.
 * They are used internally by the API client and mappers.
 */

// ─── Product Types ──────────────────────────────────────────────────────────

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyPrice;
}

export interface ShopifyMetafield {
  value: string;
  type: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  images: {
    edges: Array<{ node: ShopifyImage }>;
  };
  variants: {
    edges: Array<{ node: ShopifyVariant }>;
  };
  // Custom metafields for sculpture-specific data
  medium: ShopifyMetafield | null;
  edition: ShopifyMetafield | null;
  dimensions_height: ShopifyMetafield | null;
  dimensions_width: ShopifyMetafield | null;
  dimensions_depth: ShopifyMetafield | null;
  weight: ShopifyMetafield | null;
  materials: ShopifyMetafield | null;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description: string;
  products: {
    edges: Array<{ node: ShopifyProduct }>;
  };
}

// ─── Cart Types ─────────────────────────────────────────────────────────────

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      handle: string;
      title: string;
      images: {
        edges: Array<{ node: ShopifyImage }>;
      };
      medium: ShopifyMetafield | null;
      edition: ShopifyMetafield | null;
      dimensions_height: ShopifyMetafield | null;
      dimensions_width: ShopifyMetafield | null;
      dimensions_depth: ShopifyMetafield | null;
      weight: ShopifyMetafield | null;
      materials: ShopifyMetafield | null;
    };
    price: ShopifyPrice;
  };
  cost: {
    totalAmount: ShopifyPrice;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: Array<{ node: ShopifyCartLine }>;
  };
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
  };
}

// ─── API Response Shapes ────────────────────────────────────────────────────

export interface ShopifyProductsResponse {
  data: {
    collection: ShopifyCollection | null;
  };
}

export interface ShopifyProductResponse {
  data: {
    product: ShopifyProduct | null;
  };
}

export interface ShopifyCartResponse {
  data: {
    cartCreate?: { cart: ShopifyCart; userErrors: ShopifyUserError[] };
    cartLinesAdd?: { cart: ShopifyCart; userErrors: ShopifyUserError[] };
    cartLinesRemove?: { cart: ShopifyCart; userErrors: ShopifyUserError[] };
    cartLinesUpdate?: { cart: ShopifyCart; userErrors: ShopifyUserError[] };
    cart?: ShopifyCart | null;
  };
}

export interface ShopifyUserError {
  field: string[];
  message: string;
}
