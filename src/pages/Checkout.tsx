import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { Minus, Plus, ExternalLink } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';

export function Checkout() {
    const { cart, removeFromCart, updateQuantity, total, checkoutUrl, isCartLoading } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-bg-warm dark:bg-bg-dark flex flex-col items-center justify-center p-6 text-center transition-colors duration-500">
                <FadeIn className="flex flex-col items-center">
                    <h2 className="text-4xl font-display text-charcoal dark:text-off-white mb-6">Your cart is empty.</h2>
                    <Link to="/store" className="text-sm uppercase tracking-[0.3em] text-primary dark:text-gold-beige border-b border-primary/30 dark:border-gold-beige/30 pb-1 hover:border-primary dark:hover:border-gold-beige transition-colors">
                        Return to Store
                    </Link>
                </FadeIn>
            </div>
        );
    }

    const handleCheckout = () => {
        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        }
    };

    return (
        <div className="min-h-screen bg-bg-warm dark:bg-bg-dark p-6 md:p-20 transition-colors duration-500">
            <SEO title="Checkout" description="Review your cart and proceed to checkout." path="/checkout" />
            <h1 className="text-4xl md:text-6xl font-display text-charcoal dark:text-off-white mb-12">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Cart Items */}
                <div className="space-y-8">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-6 border-b border-charcoal/10 dark:border-white/10 pb-8">
                            <div className="w-24 h-32 bg-stone-100 dark:bg-zinc-900 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-display text-2xl text-charcoal dark:text-off-white">{item.title}</h3>
                                    <span className="font-mono text-sm opacity-60 text-charcoal dark:text-off-white">{item.price}</span>
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 dark:text-off-white/40 mb-4">{item.category}</p>
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-4">
                                        <span className="opacity-40 font-light text-charcoal dark:text-off-white">Quantity</span>
                                        <div className="flex items-center border border-charcoal/10 dark:border-white/10 rounded-none overflow-hidden text-charcoal dark:text-off-white">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1.5 hover:bg-charcoal hover:text-white dark:hover:bg-white dark:hover:text-bg-dark transition-all duration-300 disabled:opacity-10 disabled:hover:bg-transparent disabled:hover:text-current"
                                                disabled={item.quantity <= 1 || isCartLoading}
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={10} strokeWidth={3} />
                                            </button>
                                            <span className="w-10 text-center font-mono text-[11px] border-x border-charcoal/10 dark:border-white/10 py-1.5 bg-white/50 dark:bg-black/20">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1.5 hover:bg-charcoal hover:text-white dark:hover:bg-white dark:hover:text-bg-dark transition-all duration-300"
                                                disabled={isCartLoading}
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={10} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-primary hover:opacity-70 transition-opacity border-b border-transparent hover:border-primary"
                                        disabled={isCartLoading}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Continue Shopping link */}
                    <Link
                        to="/store"
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-primary/60 hover:text-primary transition-colors mt-4"
                    >
                        ← Continue Shopping
                    </Link>
                </div>

                {/* Summary & Payment */}
                <div className="bg-white/50 dark:bg-sidebar-dark/50 backdrop-blur-sm p-8 md:p-12 h-fit border border-charcoal/10 dark:border-white/5 shadow-sm rounded-none text-charcoal dark:text-off-white">
                    <h3 className="text-xl font-display mb-8">Order Summary</h3>

                    <div className="space-y-4 mb-8 text-sm font-light tracking-wide">
                        <div className="flex justify-between">
                            <span className="opacity-60 text-charcoal dark:text-off-white">Subtotal</span>
                            <span className="font-mono text-lg">${total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="opacity-60 text-charcoal dark:text-off-white">Shipping</span>
                            <span className="opacity-40 italic">Calculated at checkout</span>
                        </div>
                    </div>

                    <div className="border-t border-charcoal/10 dark:border-white/10 pt-6 mb-10 flex justify-between items-center text-primary">
                        <span className="font-medium uppercase tracking-[0.1em] text-xs">Total</span>
                        <span className="font-display text-3xl">
                            ${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                    </div>

                    {checkoutUrl ? (
                        <Button
                            size="luxury"
                            className="w-full bg-bronze-black text-white px-8 hover:bg-opacity-90 transition-all border-none"
                            onClick={handleCheckout}
                            disabled={isCartLoading}
                        >
                            <span className="mr-auto">Proceed to Checkout</span>
                            <ExternalLink className="w-4 h-4 opacity-60" />
                        </Button>
                    ) : (
                        <Button
                            size="luxury"
                            className="w-full bg-bronze-black text-white px-8 hover:bg-opacity-90 transition-all border-none"
                            disabled
                        >
                            Proceed via Email Inquiry
                        </Button>
                    )}

                    {checkoutUrl && (
                        <p className="mt-4 text-[10px] text-center opacity-50 uppercase tracking-widest">
                            Secure checkout powered by Shopify
                        </p>
                    )}
                    {!checkoutUrl && (
                        <p className="mt-4 text-[10px] text-center opacity-50 uppercase tracking-widest">
                            Secure checkout — add items to enable
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
