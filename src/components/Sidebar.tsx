import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';


const MAIN_NAV = [
    { label: 'Home', path: '/', type: 'link' },
    { label: 'Store', path: '/store', type: 'link', hasSubmenu: true },
    { label: 'About', path: '/', hash: '#about', type: 'link' },
    { label: 'Custom', path: '/', hash: '#bespoke', type: 'link' },
];

const STORE_SUBMENU = [
    { label: 'Gypsum', path: '/store/gypsum' },
    { label: 'Bronze', path: '/store/bronze' },
    { label: 'Clear', path: '/store/clear' },
];

export function Sidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [mobileExpandedItems, setExpandedMobileItems] = useState<string[]>([]);

    useEffect(() => {
        // Automatically expand submenu if we are on a relevant page
        const activeItem = MAIN_NAV.find(item =>
            item.hasSubmenu && location.pathname.startsWith(item.path)
        );

        if (activeItem) {
            setExpandedMobileItems(prev => {
                if (prev.includes(activeItem.label)) return prev;
                return [...prev, activeItem.label];
            });
        }
    }, [location.pathname]);

    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const isActive = (path: string, hash?: string) => {
        if (hash) {
            return location.pathname === path && location.hash === hash;
        }
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    };

    const isStoreActive = location.pathname.startsWith('/store');

    const handleScrollTop = () => {
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 200);
    };

    return (
        <>
            {/* Mobile/Tablet Header */}
            <header className="lg:hidden fixed top-0 w-full bg-bg-warm/95 dark:bg-bg-dark/95 backdrop-blur-sm z-50 border-b border-stone-100 dark:border-white/5 p-4 flex justify-between items-center transition-colors duration-500">
                <Link to="/" onClick={handleScrollTop}>
                    <h1 className="text-xl tracking-[0.3em] uppercase font-display font-light text-charcoal dark:text-off-white">Alexey Kukhtin</h1>
                </Link>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                        className="flex items-center justify-center border border-stone-100 dark:border-white/10 rounded-full w-11 h-11 hover:border-gold-beige dark:hover:border-gold-beige transition-all duration-500"
                    >
                        <span
                            className="material-symbols-outlined text-[17px] text-charcoal dark:text-off-white transition-all duration-500"
                            style={{ fontVariationSettings: "'wght' 300" }}
                            aria-hidden="true"
                        >
                            {theme === 'light' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    <Link to="/checkout" className="relative flex items-center p-2 group" aria-label={`View cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}>
                        <span
                            className="material-symbols-outlined text-[22px] text-charcoal dark:text-off-white transition-colors duration-500"
                            style={{ fontVariationSettings: "'wght' 300" }}
                            aria-hidden="true"
                        >
                            shopping_bag
                        </span>
                        {totalItems > 0 && (
                            <span aria-hidden="true" className="absolute top-0 right-0 flex items-center justify-center bg-primary text-off-white dark:text-bg-dark rounded-full w-5 h-5 text-[10px] font-bold shadow-sm ring-2 ring-bg-warm dark:ring-bg-dark transition-all duration-500">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    <button
                        aria-label="Open navigation menu"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="flex items-center justify-center w-11 h-11"
                    >
                        <span
                            className="material-symbols-outlined text-[24px] text-charcoal dark:text-off-white"
                            style={{ fontVariationSettings: "'wght' 300" }}
                            aria-hidden="true"
                        >
                            menu
                        </span>
                    </button>
                </div>
            </header>

            {/* Desktop Sidebar */}
            <nav aria-label="Main navigation" className="fixed left-0 top-0 h-full w-64 p-12 hidden lg:flex flex-col border-r border-stone-100 dark:border-white/5 z-50 bg-white dark:bg-bg-dark text-charcoal dark:text-off-white transition-colors duration-500">
                <div className="mb-24">
                    <Link to="/" onClick={handleScrollTop}>
                        <h1 className="text-[20px] tracking-[0.55em] uppercase font-display text-charcoal dark:text-off-white leading-relaxed -ml-1">
                            Alexey<br />Kukhtin
                        </h1>
                    </Link>
                    <p className="text-[9px] tracking-[0.3em] uppercase mt-4 opacity-40">Toronto, Canada</p>
                </div>

                <ul className="space-y-6 flex-grow">
                    {MAIN_NAV.map((item) => (
                        <li key={item.label}>
                            <Link
                                to={{ pathname: item.path, hash: item.hash }}
                                aria-current={isActive(item.path, item.hash) ? 'page' : undefined}
                                onClick={() => {
                                    if (item.path === '/' && !item.hash) handleScrollTop();
                                }}
                                className={cn(
                                    "text-[11px] uppercase tracking-[0.4em] font-light transition-all duration-500",
                                    isActive(item.path, item.hash)
                                        ? "text-primary dark:text-gold-beige translate-x-1 font-medium"
                                        : "text-charcoal/40 dark:text-white/40 hover:text-primary dark:hover:text-gold-beige hover:translate-x-1"
                                )}
                            >
                                {item.label}
                            </Link>

                            {item.hasSubmenu && isStoreActive && (
                                <ul className="space-y-4 pt-8 pl-4 border-l border-stone-100 dark:border-white/5 ml-1 animate-in slide-in-from-left-2 duration-300">
                                    {STORE_SUBMENU.map((subItem) => (
                                        <li key={subItem.path}>
                                            <Link to={subItem.path} className={cn(
                                                "text-[10px] uppercase tracking-[0.3em] block transition-all",
                                                isActive(subItem.path) ? "font-medium text-primary dark:text-gold-beige" : "text-charcoal/30 dark:text-white/30 hover:text-charcoal dark:hover:text-white"
                                            )}>
                                                {subItem.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                    <li>
                        <Link to="/checkout" className="flex items-center gap-4 group relative w-fit">
                            <div className="relative">
                                <span
                                    className="material-symbols-outlined text-[20px] text-charcoal dark:text-off-white group-hover:text-primary dark:group-hover:text-gold-beige transition-all duration-500"
                                    style={{ fontVariationSettings: "'wght' 300" }}
                                >
                                    shopping_bag
                                </span>
                                {totalItems > 0 && (
                                    <span aria-hidden="true" className="absolute -top-1 -right-1 flex items-center justify-center bg-primary text-off-white dark:text-bg-dark rounded-full min-w-[14px] h-[14px] px-1 text-[8px] font-bold ring-2 ring-white dark:ring-bg-dark transition-all duration-500">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </li>
                </ul>

                <div className="mt-auto pt-12 flex flex-col gap-12">
                    <button
                        onClick={toggleTheme}
                        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                        className="flex items-center justify-center border border-stone-100 dark:border-white/5 rounded-full w-10 h-10 hover:border-gold-beige dark:hover:border-gold-beige transition-all duration-500 group"
                    >
                        <span
                            className="material-symbols-outlined text-sm text-charcoal dark:text-off-white group-hover:text-charcoal dark:group-hover:text-white transition-colors"
                            style={{ fontVariationSettings: "'wght' 300" }}
                            aria-hidden="true"
                        >
                            {theme === 'light' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    <div className="text-[8px] tracking-[0.3em] uppercase opacity-50 leading-loose">
                        <p>© 2026 ALEXEY KUKHTIN</p>
                        <p>ALL RIGHTS RESERVED</p>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    id="mobile-menu"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation menu"
                    className="fixed inset-0 z-[60] bg-white dark:bg-bg-dark flex flex-col p-12 lg:hidden animate-in fade-in transition-colors duration-500"
                >
                    <div className="flex justify-end mb-12">
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-label="Close navigation menu"
                            className="flex items-center justify-center w-11 h-11"
                        >
                            <span
                                className="material-symbols-outlined text-3xl text-charcoal dark:text-off-white"
                                style={{ fontVariationSettings: "'wght' 300" }}
                                aria-hidden="true"
                            >
                                close
                            </span>
                        </button>
                    </div>
                    <nav aria-label="Mobile navigation" className="flex flex-col space-y-10 text-center justify-center flex-grow">
                        {MAIN_NAV.map((item) => (
                            <div key={item.label} className="flex flex-col items-center">
                                <Link
                                    to={{ pathname: item.path, hash: item.hash }}
                                    aria-current={isActive(item.path, item.hash) ? 'page' : undefined}
                                    className={cn(
                                        "text-2xl font-light uppercase tracking-[0.4em] transition-colors",
                                        isActive(item.path, item.hash) ? "text-primary dark:text-gold-beige" : "text-charcoal dark:text-white"
                                    )}
                                    // Don't close mobile menu if it has a submenu (like Store) so user can see/interact with submenu
                                    onClick={(e) => {
                                        if (item.hasSubmenu) {
                                            if (mobileExpandedItems.includes(item.label)) {
                                                // If already expanded, collapse it and prevent navigation (act as toggle)
                                                e.preventDefault();
                                                setExpandedMobileItems(prev => prev.filter(l => l !== item.label));
                                            } else {
                                                // If collapsed, expand it. Allow navigation to proceed.
                                                setExpandedMobileItems(prev => [...prev, item.label]);
                                            }
                                        } else {
                                            setIsMobileMenuOpen(false);
                                        }
                                    }}
                                >
                                    {item.label}
                                </Link>

                                {item.hasSubmenu && mobileExpandedItems.includes(item.label) && (
                                    <div className="flex flex-col items-center gap-6 mt-8 animate-in slide-in-from-top-2 duration-300 w-full">
                                        {STORE_SUBMENU.map((subItem) => (
                                            <Link
                                                key={subItem.path}
                                                to={subItem.path}
                                                className={cn(
                                                    "text-lg font-light uppercase tracking-[0.3em] transition-colors block text-center w-full",
                                                    isActive(subItem.path) ? "font-medium text-primary dark:text-gold-beige" : "text-charcoal/60 dark:text-white/60 hover:text-charcoal dark:hover:text-white"
                                                )}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {subItem.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="mt-auto pt-12 border-t border-charcoal/10 dark:border-white/5 flex flex-col items-center gap-8">
                        <button
                            onClick={toggleTheme}
                            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                            className="flex items-center justify-center border border-charcoal/10 dark:border-white/5 rounded-full w-12 h-12 hover:border-gold-beige dark:hover:border-gold-beige transition-all duration-500"
                        >
                            <span
                                className="material-symbols-outlined text-[17px] text-charcoal dark:text-off-white"
                                style={{ fontVariationSettings: "'wght' 300" }}
                                aria-hidden="true"
                            >
                                {theme === 'light' ? 'light_mode' : 'dark_mode'}
                            </span>
                        </button>

                        <div className="text-[8px] tracking-[0.3em] uppercase opacity-50 text-center leading-loose text-charcoal dark:text-white">
                            <p>© 2026 ALEXEY KUKHTIN</p>
                            <p>HAND SCULPTED IN TORONTO</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
