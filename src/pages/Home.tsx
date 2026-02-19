
import { useNavigate } from 'react-router-dom';
import { ShinyButton } from '@/components/ui/shiny-button';
import { FadeIn } from '@/components/animations/FadeIn';
import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ContactForm } from '@/components/ContactForm';
import { SEO } from '@/components/SEO';

import { heroFadeIn } from '@/components/animations/fadeInVariants';

export function Home() {
    const [isClicked, setIsClicked] = useState(false);
    const aboutRef = useRef<HTMLElement>(null);
    const bespokeRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    const handleClick = useCallback(() => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 500);
    }, []);

    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (aboutRef.current) {
                // Show button when user scrolls past the top of the About section (with a small buffer)
                const aboutTop = aboutRef.current.offsetTop - 100;
                setShowScrollTop(window.scrollY >= aboutTop);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = useCallback((ref: React.RefObject<HTMLElement | null>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <div className="bg-bg-warm dark:bg-bg-dark text-charcoal transition-colors duration-500 min-h-screen">
            <SEO
                description="A minimalist digital gallery of handcrafted sculptures by Alexey Kukhtin, based in Toronto. Browse the Gypsum collection."
                path="/"
            />
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <img
                    src="/BATHER_HERO.jpeg"
                    alt="Bather sculpture with dramatic lighting"
                    width="1920"
                    height="1080"
                    fetchPriority="high"
                    loading="eager"
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.33] dark:opacity-50 transition-opacity duration-700"
                />
                {/* Atmospheric Tint Layer */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_transparent_70%)] bg-white/20 dark:bg-dark-charcoal/60 transition-colors duration-700"></div>

                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <FadeIn variant={heroFadeIn} delay={0.2}>
                        <span className="block text-[10px] uppercase tracking-[0.5em] mb-12 opacity-60 font-sans text-charcoal dark:text-off-white">
                            Traditional Sculptor
                        </span>
                    </FadeIn>

                    <FadeIn variant={heroFadeIn} delay={0.4}>
                        <h1 className="text-7xl md:text-[120px] font-display mb-12 tracking-tight leading-[0.9] text-charcoal dark:text-off-white transition-colors duration-500">
                            Silence. Shape.<br />
                            <span className="italic font-light">Spirit.</span>
                        </h1>
                    </FadeIn>

                    <FadeIn variant={heroFadeIn} delay={0.8}>
                        <p className="text-[11px] md:text-[12px] font-light tracking-[0.4em] max-w-3xl mx-auto opacity-70 mb-20 uppercase text-charcoal dark:text-off-white leading-relaxed">
                            WHERE THE INVISIBLE WEIGHT OF EMOTION FINDS ITS PERMANENT FORM.
                        </p>
                    </FadeIn>

                    <FadeIn variant={heroFadeIn} delay={0.8}>
                        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                            <ShinyButton
                                title="View Store"
                                arrow={false}
                                onClick={() => {
                                    handleClick();
                                    navigate('/store');
                                }}
                                className={cn(
                                    "w-full md:w-auto [&_p]:text-charcoal/80 dark:[&_p]:text-off-white/80",
                                    isClicked && "scale-95"
                                )}
                            />
                            <button
                                onClick={() => scrollToSection(bespokeRef)}
                                className="group relative text-[10px] uppercase tracking-[0.4em] text-charcoal dark:text-off-white opacity-60 hover:opacity-100 transition-opacity pb-1"
                            >
                                Custom Order
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal/30 dark:bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                            </button>
                        </div>
                    </FadeIn>
                </div>

                <button
                    onClick={() => scrollToSection(aboutRef)}
                    aria-label="Scroll down to About section"
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30 animate-bounce cursor-pointer"
                >
                    <span className="material-symbols-outlined text-charcoal dark:text-white text-2xl" aria-hidden="true">expand_more</span>
                </button>
            </section >

            {/* About Section */}
            < section id="about" ref={aboutRef} className="py-32 px-6 md:px-24 bg-bg-warm dark:bg-bg-dark transition-colors duration-500" >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-20 items-center max-w-7xl mx-auto">
                    <div className="md:col-span-6 space-y-10">
                        <FadeIn>
                            <div>
                                <span className="text-primary dark:text-primary/80 uppercase tracking-[0.4em] text-[10px] font-medium block mb-4">About</span>
                                <h3 className="text-4xl md:text-6xl font-display leading-[1.1] text-charcoal dark:text-off-white">The quiet mastery of classical technique.</h3>
                            </div>
                            <div className="space-y-6 text-charcoal/80 dark:text-off-white/70 font-light leading-relaxed text-sm tracking-wide mt-10">
                                <p>
                                    Based in Toronto, Alexey Kukhtin operates at the intersection of classical tradition and modern introspection. Every stroke in clay and every chisel mark in stone is a pursuit of the essence that lies beneath the surface.
                                </p>
                                <p>
                                    His process is slow, deliberate, and deeply rooted in the physical reality of the medium, creating works that invite a contemplative silence in the spaces they inhabit.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                    <div className="md:col-span-6">
                        <FadeIn delay={0.2}>
                            <div className="relative aspect-[4/5] bg-stone-100 dark:bg-zinc-900 group overflow-hidden">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIwAsh8zq384P11faaMrcHFH19cSeUfApKeHU38wcVO94zig00o5vQ6co4OZ4BU76v_P9zkF0uvq4XCUQOFnUe-VBH1DK9tpsul2BrthHC3zAvR3dXMW_jgUHUsK1sNgEUtlgHHDBQH3_C4jYQ1uZxBSJThyYBCIkDVCcZndJHLgVarKEkkRHVSw3NyXLIah2LK68uQ5fF0_Q4JDkf20SiOUxUh5IP9slWt_SwKFdsNc1nP8t0QUaCouJvFALPTKcpM_TFgnPb8V6p"
                                    alt="Sculptor working with clay in the studio"
                                    width="800"
                                    height="1000"
                                    loading="lazy"
                                    className="w-full h-full object-cover opacity-80 grayscale transition-all duration-1000 group-hover:opacity-100 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 border-[20px] border-bg-warm/40 dark:border-bg-dark/40 pointer-events-none transition-colors duration-500"></div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section >

            {/* Bespoke Creations Section */}
            < section id="bespoke" ref={bespokeRef} className="py-40 px-6 text-center border-y border-charcoal/10 dark:border-white/5 bg-bg-warm dark:bg-bg-dark transition-colors duration-500" >
                <FadeIn>
                    <h3 className="text-5xl md:text-8xl font-display mb-10 text-charcoal dark:text-off-white">Custom Creations</h3>
                    <p className="text-[11px] md:text-sm font-light mb-16 opacity-60 max-w-xl mx-auto tracking-[0.3em] uppercase text-charcoal dark:text-off-white">
                        Collaborate on a unique piece designed specifically for your space and narrative.
                    </p>
                    <div className="flex justify-center">
                        <ContactForm />
                    </div>
                </FadeIn>
            </section >

            {/* Footer */}
            < footer className="footer-content px-6 md:px-24 py-12 border-t border-charcoal/10 dark:border-white/10 text-[9px] tracking-[0.4em] uppercase opacity-50 flex flex-col md:flex-row justify-between gap-4 text-charcoal dark:text-off-white bg-bg-warm dark:bg-bg-dark transition-colors duration-500" >
                <p>© 2026 ALEXEY KUKHTIN ALL RIGHTS RESERVED</p>
                <p>HAND SCULPTED IN TORONTO</p>
            </footer >

            {/* Mobile/Tablet Scroll to Top */}
            {/* Mobile/Tablet Scroll to Top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
                className={cn(
                    "fixed bottom-10 right-10 bg-white/80 dark:bg-bg-dark/80 backdrop-blur-sm p-4 rounded-full shadow-lg z-50 border border-stone-200 dark:border-white/10 group hover:border-gold-beige transition-all duration-500",
                    showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                )}
            >
                <span className="material-symbols-outlined text-charcoal dark:text-white group-hover:text-gold-beige transition-colors" aria-hidden="true">arrow_upward</span>
            </button>
        </div >
    );
}
