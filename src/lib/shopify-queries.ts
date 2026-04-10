/**
 * Shopify Storefront API — GraphQL Queries & Mutations
 *
 * All queries use Shopify metafield aliases for sculpture-specific data.
 * Metafield namespace: "custom" (default Shopify custom metafields).
 */

// ─── Fragment for product fields (shared across queries) ────────────────────

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  descriptionHtml
  priceRange {
    minVariantPrice { amount currencyCode }
    maxVariantPrice { amount currencyCode }
  }
  images(first: 10) {
    edges {
      node {
        url
        altText
        width
        height
      }
    }
  }
  variants(first: 5) {
    edges {
      node {
        id
        title
        availableForSale
        price { amount currencyCode }
      }
    }
  }
  medium: metafield(namespace: "custom", key: "medium") { value type }
  edition: metafield(namespace: "custom", key: "edition") { value type }
  dimensions_height: metafield(namespace: "custom", key: "dimensions_height") { value type }
  dimensions_width: metafield(namespace: "custom", key: "dimensions_width") { value type }
  dimensions_depth: metafield(namespace: "custom", key: "dimensions_depth") { value type }
  weight: metafield(namespace: "custom", key: "weight") { value type }
  materials: metafield(namespace: "custom", key: "materials") { value type }
`;

// ─── Product Queries ────────────────────────────────────────────────────────

/** Fetch all products in a collection by handle (e.g., "gypsum", "bronze") */
export const PRODUCTS_BY_COLLECTION = `
  query ProductsByCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(first: $first) {
        edges {
          node {
            ${PRODUCT_FIELDS}
          }
        }
      }
    }
  }
`;

/** Fetch a single product by handle */
export const PRODUCT_BY_HANDLE = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_FIELDS}
    }
  }
`;

// ─── Cart Fragment ──────────────────────────────────────────────────────────

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            product {
              id
              handle
              title
              images(first: 1) {
                edges {
                  node { url altText width height }
                }
              }
              medium: metafield(namespace: "custom", key: "medium") { value type }
              edition: metafield(namespace: "custom", key: "edition") { value type }
              dimensions_height: metafield(namespace: "custom", key: "dimensions_height") { value type }
              dimensions_width: metafield(namespace: "custom", key: "dimensions_width") { value type }
              dimensions_depth: metafield(namespace: "custom", key: "dimensions_depth") { value type }
              weight: metafield(namespace: "custom", key: "weight") { value type }
              materials: metafield(namespace: "custom", key: "materials") { value type }
            }
            price { amount currencyCode }
          }
        }
        cost {
          totalAmount { amount currencyCode }
        }
      }
    }
  }
  cost {
    totalAmount { amount currencyCode }
    subtotalAmount { amount currencyCode }
  }
`;

// ─── Cart Mutations ─────────────────────────────────────────────────────────

/** Create a new cart with initial line items */
export const CART_CREATE = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

/** Add line items to an existing cart */
export const CART_LINES_ADD = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

/** Remove line items from a cart */
export const CART_LINES_REMOVE = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

/** Update line item quantities */
export const CART_LINES_UPDATE = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ${CART_FIELDS} }
      userErrors { field message }
    }
  }
`;

/** Fetch an existing cart by ID (for rehydration from localStorage) */
export const CART_QUERY = `
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      ${CART_FIELDS}
    }
  }
`;
