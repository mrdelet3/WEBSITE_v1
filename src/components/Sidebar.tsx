import { useState } from 'react';
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
            <header className="lg:hidden fixed top-0 w-full bg-bg-warm/95 dark:bg-bg-dark/95 backdrop-blur-sm z-50 border-b border-stone-100 dark:border-white/5 p-6 flex justify-between items-center transition-colors duration-500">
                <Link to="/" onClick={handleScrollTop}>
                    <h1 className="text-xl tracking-[0.3em] uppercase font-light text-charcoal dark:text-off-white">Alexey Kukhtin</h1>
                </Link>
                <div className="flex items-center gap-6">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center border border-stone-100 dark:border-white/10 rounded-full w-8 h-8 hover:border-gold-beige dark:hover:border-gold-beige transition-all duration-500"
                    >
                        <span className="material-symbols-outlined text-sm text-charcoal/40 dark:text-white/40">
                            {theme === 'light' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    <Link to="/checkout" className="relative flex items-center">
                        <span className="material-symbols-outlined text-2xl text-accent">shopping_bag</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 flex items-center justify-center bg-stone-100 dark:bg-white/10 text-stone-500 dark:text-accent rounded-full w-4 h-4 text-[8px] font-medium transition-colors">{totalItems}</span>
                        )}
                    </Link>
                    <button className="material-symbols-outlined text-2xl text-bronze-black dark:text-off-white" onClick={() => setIsMobileMenuOpen(true)}>menu</button>
                </div>
            </header>

            {/* Desktop Sidebar */}
            <nav className="fixed left-0 top-0 h-full w-64 p-12 hidden lg:flex flex-col border-r border-stone-100 dark:border-white/5 z-50 bg-white dark:bg-bg-dark text-charcoal dark:text-off-white transition-colors duration-500">
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
                                onClick={() => {
                                    if (item.path === '/' && !item.hash) handleScrollTop();
                                    if (item.hash) {
                                        const element = document.querySelector(item.hash);
                                        element?.scrollIntoView({ behavior: 'smooth' });
                                    }
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
                                                isActive(subItem.path) ? "font-medium text-accent" : "text-charcoal/30 dark:text-white/30 hover:text-charcoal dark:hover:text-white"
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
                        <Link to="/checkout" className="flex items-center gap-3 group">
                            <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110 text-accent">shopping_bag</span>
                            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40">({totalItems})</span>
                        </Link>
                    </li>
                </ul>

                <div className="mt-auto pt-12 flex flex-col gap-12">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center justify-center border border-stone-100 dark:border-white/5 rounded-full w-10 h-10 hover:border-gold-beige dark:hover:border-gold-beige transition-all duration-500 group"
                    >
                        <span className="material-symbols-outlined text-base text-charcoal/20 dark:text-white/20 group-hover:text-charcoal dark:group-hover:text-white transition-colors">
                            {theme === 'light' ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>

                    <div className="text-[8px] tracking-[0.3em] uppercase opacity-30 leading-loose">
                        <p>© 2026 ALEXEY KUKHTIN</p>
                        <p>ALL RIGHTS RESERVED</p>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-white dark:bg-bg-dark flex flex-col p-12 lg:hidden animate-in fade-in transition-colors duration-500">
                    <div className="flex justify-end mb-12">
                        <button onClick={() => setIsMobileMenuOpen(false)}>
                            <span className="material-symbols-outlined text-4xl text-charcoal dark:text-white">close</span>
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-10 text-center justify-center flex-grow">
                        {MAIN_NAV.map((item) => (
                            <Link
                                key={item.label}
                                to={{ pathname: item.path, hash: item.hash }}
                                className={cn(
                                    "text-2xl font-light uppercase tracking-[0.4em] transition-colors",
                                    isActive(item.path, item.hash) ? "text-accent" : "text-charcoal dark:text-white"
                                )}
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    if (item.hash) {
                                        setTimeout(() => {
                                            const element = document.querySelector(item.hash);
                                            element?.scrollIntoView({ behavior: 'smooth' });
                                        }, 300); // Small delay to allow menu animation to finish/start closing
                                    }
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}
