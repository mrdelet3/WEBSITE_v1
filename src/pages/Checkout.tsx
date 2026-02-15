
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';

export function Checkout() {
    const { cart, removeFromCart, updateQuantity, total } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-4xl font-display text-foreground mb-6">Your cart is empty.</h2>
                <Link to="/store" className="text-sm uppercase tracking-[0.3em] text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors">
                    Return to Store
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6 md:p-20 transition-colors duration-500">
            <h1 className="text-4xl md:text-6xl font-display text-foreground mb-12">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Cart Items */}
                <div className="space-y-8">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-6 border-b border-border pb-8">
                            <div className="w-24 h-32 bg-muted overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-display text-2xl text-foreground">{item.title}</h3>
                                    <span className="font-mono text-sm opacity-60 text-foreground">{item.price}</span>
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">{item.category}</p>
                                <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-4">
                                        <span className="opacity-40 font-light">Quantity</span>
                                        <div className="flex items-center border border-border/30 rounded-none overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="px-2 py-1.5 hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-10 disabled:hover:bg-transparent disabled:hover:text-foreground"
                                                disabled={item.quantity <= 1}
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={10} strokeWidth={3} />
                                            </button>
                                            <span className="w-10 text-center font-mono text-[11px] border-x border-border/30 py-1.5 bg-background/50">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="px-2 py-1.5 hover:bg-foreground hover:text-background transition-all duration-300"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={10} strokeWidth={3} />
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-primary hover:opacity-70 transition-opacity border-b border-transparent hover:border-primary"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary & Payment */}
                <div className="bg-card text-card-foreground p-8 md:p-12 h-fit border border-border shadow-sm rounded-none">
                    <h3 className="text-xl font-display mb-8">Order Summary</h3>

                    <div className="space-y-4 mb-8 text-sm font-light tracking-wide">
                        <div className="flex justify-between">
                            <span className="opacity-60">Subtotal</span>
                            <span className="font-mono text-lg text-foreground">${total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="opacity-60">Shipping</span>
                            <span className="opacity-40 italic">Calculated next step</span>
                        </div>
                    </div>

                    <div className="border-t border-border pt-6 mb-10 flex justify-between items-center text-primary">
                        <span className="font-medium uppercase tracking-[0.1em] text-xs">Total</span>
                        <span className="font-display text-3xl">
                            ${total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                    </div>

                    <button className="w-full bg-bronze-black text-white py-5 px-8 uppercase tracking-[0.2em] text-[10px] hover:bg-opacity-90 transition-all">
                        Proceed via Email Inquiry
                    </button>
                    <p className="mt-4 text-[10px] text-center opacity-40 uppercase tracking-widest">
                        Secure checkout integration coming soon
                    </p>
                </div>
            </div>
        </div>
    );
}
