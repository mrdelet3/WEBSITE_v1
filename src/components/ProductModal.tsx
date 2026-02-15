import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ShoppingBag, X, Check } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { products } from '@/data/products';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';

interface ProductModalProps {
    product: Product;
}

export function ProductModal({ product }: ProductModalProps) {
    const navigate = useNavigate();
    const { theme: globalTheme } = useTheme();
    const { cart, addToCart, removeFromCart } = useCart();

    // Get current item quantity in cart
    const cartItem = cart.find(item => item.id === product.id);
    const quantity = cartItem?.quantity || 0;

    // Close modal function
    const handleClose = useCallback(() => {
        // Navigate back to the collection (remove product ID from URL)
        navigate(`/store/${product.category}`);
    }, [navigate, product.category]);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleEsc);

        // Prevent body scroll and handle layout shift
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = originalStyle;
        };
    }, [handleClose]);

    if (!product) return null;

    const isDarkTheme = globalTheme === 'dark';

    // Theme configurations
    const theme = isDarkTheme ? {
        overlay: 'bg-black/85 backdrop-blur-[24px]',
        modalBg: 'bg-bg-dark',
        border: 'border-white/5',
        text: 'text-off-white',
        textMuted: 'text-off-white/40',
        textDim: 'text-off-white/80',
        heading: 'text-off-white',
        closeBtn: 'text-off-white/60 hover:text-primary',
        iconColor: 'text-off-white',
        navBtn: 'border-white/20 hover:bg-white/10 text-off-white',
        divider: 'border-white/10',
        gradient: 'bg-gradient-to-t from-bg-dark via-bg-dark to-transparent',
        tagLabel: 'text-off-white/30',
        tagValue: 'text-off-white/80',
        btnPrimary: 'bg-primary text-bg-dark hover:brightness-110',
        btnSecondary: 'border-primary text-primary hover:bg-primary/5',
        imageBg: 'bg-zinc-900',
        imageBlend: '',
        xBadgeBg: 'border border-primary text-primary bg-white/10 backdrop-blur-sm hover:bg-charcoal transition-all duration-300'
    } : {
        overlay: 'bg-white/40 backdrop-blur-[24px]',
        modalBg: 'bg-bg-warm',
        border: 'border-black/5',
        text: 'text-charcoal',
        textMuted: 'text-charcoal/40',
        textDim: 'text-charcoal/80',
        heading: 'text-charcoal',
        closeBtn: 'text-charcoal/60 hover:text-primary',
        iconColor: 'text-charcoal',
        navBtn: 'border-black/10 hover:bg-black/5 text-charcoal',
        divider: 'border-black/5',
        gradient: 'bg-gradient-to-t from-bg-warm via-bg-warm to-transparent',
        tagLabel: 'text-charcoal/40',
        tagValue: 'text-charcoal/90',
        btnPrimary: 'bg-primary text-white hover:brightness-105',
        btnSecondary: 'border-primary text-primary hover:bg-primary/5',
        imageBg: 'bg-[radial-gradient(circle_at_center,_#F2F2F2_0%,_#E8E8E8_100%)]',
        imageBlend: 'mix-blend-multiply opacity-90',
        xBadgeBg: 'border border-primary text-primary bg-white/20 backdrop-blur-sm hover:bg-white transition-all duration-300'
    };

    const bgImages = Array(9).fill(null).map((_, i) => products[i % products.length]?.image);

    return (
        <div className={`fixed inset-0 z-[100] overflow-hidden ${isDarkTheme ? 'dark' : ''}`}>
            {/* Background Grid Layer */}
            <div className={`absolute inset-0 z-0 grid grid-cols-3 gap-8 p-12 scale-110 pointer-events-none ${isDarkTheme ? 'opacity-20 grayscale' : 'opacity-10 grayscale'}`}>
                {bgImages.map((img, i) => (
                    <div key={i} className={`aspect-[3/4] rounded-none overflow-hidden ${!img ? (isDarkTheme ? 'bg-zinc-900' : 'bg-zinc-200') : ''}`}>
                        {img && <img src={img} alt="" className="w-full h-full object-cover" />}
                    </div>
                ))}
            </div>

            {/* Overlay and Modal Container */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-500 ${theme.overlay}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="absolute inset-0" onClick={handleClose} />

                <div className={`relative w-full max-w-7xl h-[90vh] ${theme.modalBg} rounded-none shadow-2xl flex flex-col lg:flex-row overflow-hidden border ${theme.border} z-10 animate-in zoom-in-95 duration-500`}>

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className={`absolute top-8 right-8 z-[70] group flex items-center gap-2 transition-colors focus:outline-none focus:ring-1 focus:ring-primary rounded-none p-1 ${theme.closeBtn}`}
                        aria-label="Close details"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
                        <X className="w-8 h-8 font-extralight" />
                    </button>

                    {/* Left: Image */}
                    <div className={`lg:w-[55%] h-[45vh] lg:h-full relative overflow-hidden flex items-center justify-center border-r ${theme.border} ${theme.imageBg}`}>
                        <img
                            src={product.image}
                            alt={product.title}
                            className={`w-full h-full object-cover ${theme.imageBlend}`}
                        />

                        {/* Nav Buttons (Visual) */}
                        <div className="absolute bottom-10 left-10 flex gap-4 z-20">
                            <button
                                className={`w-12 h-12 flex items-center justify-center backdrop-blur-md transition-all rounded-full focus:outline-none focus:ring-1 focus:ring-primary ${theme.navBtn}`}
                                aria-label="Previous image"
                            >
                                <ArrowLeft className="w-5 h-5 font-light" />
                            </button>
                            <button
                                className={`w-12 h-12 flex items-center justify-center backdrop-blur-md transition-all rounded-full focus:outline-none focus:ring-1 focus:ring-primary ${theme.navBtn}`}
                                aria-label="Next image"
                            >
                                <ArrowRight className="w-5 h-5 font-light" />
                            </button>
                        </div>

                        <div className={`absolute bottom-12 right-12 text-[10px] tracking-[0.4em] uppercase font-medium z-20 ${theme.textMuted}`}>
                            01 / 05
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="lg:w-[45%] h-full flex flex-col relative">
                        <div className="flex-1 overflow-y-auto px-8 py-10 lg:px-16 lg:pt-20 lg:pb-10 scrollbar-hide">
                            <nav className={`flex items-center space-x-3 text-[10px] uppercase tracking-[0.3em] ${theme.textMuted} mb-10`}>
                                <span className="hover:text-primary transition-colors cursor-pointer" onClick={handleClose}>Collection</span>
                                <span>/</span>
                                <span className="lowercase first-letter:uppercase">{product.category}</span>
                            </nav>

                            <h1 id="modal-title" className={`text-5xl lg:text-6xl font-display font-light mb-6 leading-[1.1] tracking-tight ${theme.heading}`}>
                                {product.title}
                            </h1>

                            <div className="mb-12">
                                <p className="font-price text-3xl lg:text-4xl font-light text-primary tracking-tight flex items-baseline gap-4">
                                    {product.price} <span className="text-xs font-medium tracking-[0.3em] text-primary/70 uppercase">CAD</span>
                                </p>
                            </div>

                            <div className={`grid grid-cols-2 gap-y-10 gap-x-12 border-t ${theme.divider} pt-10 mb-12`}>
                                <div className="space-y-1.5">
                                    <span className={`text-[9px] uppercase tracking-[0.25em] font-bold ${theme.tagLabel}`}>Medium</span>
                                    <p className={`text-sm ${theme.tagValue}`}>{product.medium || 'Gypsum'}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <span className={`text-[9px] uppercase tracking-[0.25em] font-bold ${theme.tagLabel}`}>Edition</span>
                                    <p className={`text-sm ${theme.tagValue}`}>{product.edition || 'Limited'}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <span className={`text-[9px] uppercase tracking-[0.25em] font-bold ${theme.tagLabel}`}>Dimensions</span>
                                    <p className={`text-sm ${theme.tagValue}`}>{product.dimensions.h} × {product.dimensions.w} × {product.dimensions.d}</p>
                                </div>
                                <div className="space-y-1.5">
                                    <span className={`text-[9px] uppercase tracking-[0.25em] font-bold ${theme.tagLabel}`}>Weight</span>
                                    <p className={`text-sm ${theme.tagValue}`}>{product.weight || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="space-y-6 mb-12">
                                <h3 className={`text-[10px] uppercase tracking-[0.3em] font-bold opacity-50 ${theme.tagLabel}`}>Description</h3>
                                <p className={`text-xl lg:text-2xl font-display leading-relaxed italic ${theme.textDim}`}>
                                    "{product.description || 'An exploration of form and silence.'}"
                                </p>
                                <p className={`text-sm leading-relaxed max-w-sm font-light ${theme.textMuted}`}>
                                    Cast in {product.medium || 'high-density material'} and meticulously hand-finished in our Toronto studio.
                                </p>
                            </div>

                            <div className={`pt-8 border-t ${theme.divider} flex items-center justify-between`}>
                                <div className="flex flex-col gap-1">
                                    <span className={`text-[8px] uppercase tracking-[0.2em] font-bold opacity-50 ${theme.tagLabel}`}>Estimated Shipping</span>
                                    <span className={`text-[10px] opacity-50 ${theme.textMuted}`}>Global White Glove / 14-21 Days</span>
                                </div>
                                <div className={`flex gap-4 opacity-40 ${theme.iconColor}`}>
                                    <Check className="w-5 h-5" />
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Sticky Actions */}
                        <div className={`px-8 pb-12 lg:px-16 lg:pb-16 pt-6 z-10 sticky bottom-0 ${theme.gradient}`}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="relative flex-[1.5]">
                                    <Button
                                        onClick={() => {
                                            addToCart(product);
                                            toast.success(`${product.title} added to cart`);
                                        }}
                                        className={`w-full py-5 px-10 text-[10px] tracking-[0.4em] font-bold uppercase rounded-none shadow-md group transition-all h-auto ${theme.btnPrimary}`}
                                    >
                                        <span className="mr-auto">
                                            Add to Cart {quantity > 0 && `(${quantity})`}
                                        </span>
                                        <ShoppingBag className="w-5 h-5 font-extralight group-hover:translate-x-1 transition-transform" />
                                    </Button>

                                    {/* Overlapping X Reset Button - Refined Hover Effect */}
                                    {quantity > 0 && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFromCart(product.id);
                                                toast.info("Item removed from cart");
                                            }}
                                            className={`absolute -top-3 -left-3 w-8 h-8 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 z-20 ${theme.xBadgeBg}`}
                                            title="Reset quantity"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                <Button variant="outline" className={`flex-1 py-5 px-8 text-[10px] tracking-[0.4em] font-bold uppercase rounded-none transition-all h-auto ${theme.btnSecondary}`}>
                                    Inquire
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
