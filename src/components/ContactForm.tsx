import { useState } from 'react';
import { toast } from 'sonner';

import { ShinyButton } from '@/components/ui/shiny-button';

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast.success("Message sent successfully. We'll be in touch soon.");
        setIsLoading(false);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-12 w-full text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <label htmlFor="firstName" className="text-[10px] uppercase tracking-[0.3em] font-medium text-charcoal/40 dark:text-off-white/30 block">
                        First Name
                    </label>
                    <input
                        required
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full bg-transparent border-b border-stone-200 dark:border-white/10 focus:border-primary dark:focus:border-gold-beige outline-none pb-3 pt-1 text-base font-light transition-all duration-300 placeholder:text-charcoal/40 dark:placeholder:text-gold-beige/60 placeholder:text-[10px] placeholder:font-sans placeholder:tracking-[0.2em] focus:placeholder:text-transparent dark:focus:placeholder:text-transparent text-charcoal dark:text-gold-beige min-h-[44px]"
                        placeholder="ALEXEY"
                    />
                </div>
                <div className="space-y-6">
                    <label htmlFor="lastName" className="text-[10px] uppercase tracking-[0.3em] font-medium text-charcoal/40 dark:text-off-white/30 block">
                        Last Name
                    </label>
                    <input
                        required
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full bg-transparent border-b border-stone-200 dark:border-white/10 focus:border-primary dark:focus:border-gold-beige outline-none pb-3 pt-1 text-base font-light transition-all duration-300 placeholder:text-charcoal/40 dark:placeholder:text-gold-beige/60 placeholder:text-[10px] placeholder:font-sans placeholder:tracking-[0.2em] focus:placeholder:text-transparent dark:focus:placeholder:text-transparent text-charcoal dark:text-gold-beige min-h-[44px]"
                        placeholder="KUKHTIN"
                    />
                </div>
            </div>

            <div className="space-y-6">
                <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] font-medium text-charcoal/40 dark:text-off-white/30 block">
                    Email Address
                </label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-transparent border-b border-stone-200 dark:border-white/10 focus:border-primary dark:focus:border-gold-beige outline-none pb-3 pt-1 text-base font-light transition-all duration-300 placeholder:text-charcoal/40 dark:placeholder:text-gold-beige/60 placeholder:text-[10px] placeholder:font-sans placeholder:tracking-[0.2em] focus:placeholder:text-transparent dark:focus:placeholder:text-transparent text-charcoal dark:text-gold-beige min-h-[44px]"
                    placeholder="HELLO@EXAMPLE.COM"
                />
            </div>

            <div className="space-y-6">
                <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] font-medium text-charcoal/40 dark:text-off-white/30 block">
                    Message
                </label>
                <textarea
                    required
                    id="message"
                    name="message"
                    rows={1}
                    onInput={(e) => {
                        e.currentTarget.style.height = 'auto';
                        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                    }}
                    className="w-full bg-transparent border-b border-stone-200 dark:border-white/10 focus:border-primary dark:focus:border-gold-beige outline-none pb-3 pt-1 text-base font-light transition-colors resize-none placeholder:text-charcoal/40 dark:placeholder:text-gold-beige/60 placeholder:text-[10px] placeholder:font-sans placeholder:tracking-[0.2em] focus:placeholder:text-transparent dark:focus:placeholder:text-transparent text-charcoal dark:text-gold-beige min-h-[50px]"
                    placeholder="TELL US ABOUT YOUR VISION..."
                />
            </div>

            <div className="pt-12 text-center">
                <ShinyButton
                    type="submit"
                    disabled={isLoading}
                    title={isLoading ? 'Sending...' : 'Send Request'}
                    className="w-full md:w-auto"
                />
            </div>
        </form>
    );
}
