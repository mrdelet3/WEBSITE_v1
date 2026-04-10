
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '@/data/products';
import {
    createCart as shopifyCreateCart,
    addCartLine,
    removeCartLines,
    updateCartLine as shopifyUpdateCartLine,
    fetchCart,
} from '@/lib/shopify';
import { mapShopifyCart } from '@/lib/shopify-mappers';
import type { MappedCartItem } from '@/lib/shopify-mappers';

export interface CartItem extends Product {
    quantity: number;
    lineId?: string; // Shopify cart line ID
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    clearCart: () => void;
    total: number;
    checkoutUrl: string | null;
    isCartLoading: boolean;
    cartError: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = 'ak_shopify_cart_id';
const CART_CACHE_KEY = 'ak_cart_cache';

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(() => {
        try {
            const cached = localStorage.getItem(CART_CACHE_KEY);
            return cached ? JSON.parse(cached) : [];
        } catch {
            return [];
        }
    });
    const [shopifyCartId, setShopifyCartId] = useState<string | null>(() => {
        try {
            return localStorage.getItem(CART_ID_KEY);
        } catch {
            return null;
        }
    });
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [cartError, setCartError] = useState<string | null>(null);

    // Persist cart cache for instant display
    useEffect(() => {
        localStorage.setItem(CART_CACHE_KEY, JSON.stringify(cart));
    }, [cart]);

    // Persist Shopify cart ID
    useEffect(() => {
        if (shopifyCartId) {
            localStorage.setItem(CART_ID_KEY, shopifyCartId);
        } else {
            localStorage.removeItem(CART_ID_KEY);
        }
    }, [shopifyCartId]);

    // Sync cart state from Shopify cart response
    const syncFromShopifyCart = useCallback((mapped: ReturnType<typeof mapShopifyCart>) => {
        const items: CartItem[] = mapped.items.map((item: MappedCartItem) => ({
            ...item,
        }));
        setCart(items);
        setTotal(mapped.total);
        setCheckoutUrl(mapped.checkoutUrl);
        setShopifyCartId(mapped.cartId);
    }, []);

    // Rehydrate cart from Shopify on mount
    useEffect(() => {
        if (!shopifyCartId) return;

        let cancelled = false;

        async function rehydrate() {
            try {
                const shopifyCart = await fetchCart(shopifyCartId!);
                if (cancelled) return;

                if (shopifyCart && shopifyCart.totalQuantity > 0) {
                    syncFromShopifyCart(mapShopifyCart(shopifyCart));
                } else {
                    // Cart expired or empty
                    setShopifyCartId(null);
                    setCart([]);
                    setTotal(0);
                    setCheckoutUrl(null);
                }
            } catch (err) {
                if (cancelled) return;
                console.warn('Failed to rehydrate Shopify cart, using cached data:', err);
                // Keep cached cart data for display, recalculate total from local data
                recalculateLocalTotal();
            }
        }

        rehydrate();

        return () => { cancelled = true; };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Fallback total calculation from local price strings
    const recalculateLocalTotal = useCallback(() => {
        const sum = cart.reduce((acc, item) => {
            if (!item.price || typeof item.price !== 'string') return acc;
            const priceNumber = parseFloat(item.price.replace(/[$,]/g, ''));
            return acc + (priceNumber * item.quantity);
        }, 0);
        setTotal(sum);
    }, [cart]);

    // ─── Cart Operations ──────────────────────────────────────────

    const addToCart = useCallback(async (product: Product) => {
        setCartError(null);
        setIsCartLoading(true);

        // Optimistic update
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });

        try {
            const variantId = product.shopifyVariantId;

            if (!variantId) {
                // No Shopify variant — keep local-only cart (static data mode)
                recalculateLocalTotal();
                return;
            }

            let shopifyCart;

            if (shopifyCartId) {
                // Add to existing cart
                shopifyCart = await addCartLine(shopifyCartId, variantId, 1);
            } else {
                // Create new cart
                shopifyCart = await shopifyCreateCart(variantId, 1);
            }

            syncFromShopifyCart(mapShopifyCart(shopifyCart));
        } catch (err) {
            console.error('Failed to add to Shopify cart:', err);
            setCartError(err instanceof Error ? err.message : 'Failed to add to cart');
            // Keep optimistic update — local cart still works
            recalculateLocalTotal();
        } finally {
            setIsCartLoading(false);
        }
    }, [shopifyCartId, syncFromShopifyCart, recalculateLocalTotal]);

    const removeFromCart = useCallback(async (productId: string) => {
        setCartError(null);
        setIsCartLoading(true);

        const itemToRemove = cart.find(item => item.id === productId);

        // Optimistic update
        setCart(prev => prev.filter(item => item.id !== productId));

        try {
            if (shopifyCartId && itemToRemove?.lineId) {
                const shopifyCart = await removeCartLines(shopifyCartId, [itemToRemove.lineId]);
                syncFromShopifyCart(mapShopifyCart(shopifyCart));
            } else {
                recalculateLocalTotal();
            }
        } catch (err) {
            console.error('Failed to remove from Shopify cart:', err);
            setCartError(err instanceof Error ? err.message : 'Failed to remove from cart');
            recalculateLocalTotal();
        } finally {
            setIsCartLoading(false);
        }
    }, [cart, shopifyCartId, syncFromShopifyCart, recalculateLocalTotal]);

    const updateQuantity = useCallback(async (productId: string, quantity: number) => {
        if (quantity < 1) return;

        setCartError(null);
        setIsCartLoading(true);

        const item = cart.find(i => i.id === productId);

        // Optimistic update
        setCart(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));

        try {
            if (shopifyCartId && item?.lineId) {
                const shopifyCart = await shopifyUpdateCartLine(shopifyCartId, item.lineId, quantity);
                syncFromShopifyCart(mapShopifyCart(shopifyCart));
            } else {
                recalculateLocalTotal();
            }
        } catch (err) {
            console.error('Failed to update Shopify cart:', err);
            setCartError(err instanceof Error ? err.message : 'Failed to update cart');
            recalculateLocalTotal();
        } finally {
            setIsCartLoading(false);
        }
    }, [cart, shopifyCartId, syncFromShopifyCart, recalculateLocalTotal]);

    const clearCart = useCallback(() => {
        setCart([]);
        setTotal(0);
        setCheckoutUrl(null);
        setShopifyCartId(null);
        localStorage.removeItem(CART_ID_KEY);
        localStorage.removeItem(CART_CACHE_KEY);
    }, []);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            total,
            checkoutUrl,
            isCartLoading,
            cartError,
        }}>
            {children}
        </CartContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
