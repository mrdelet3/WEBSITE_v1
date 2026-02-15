import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

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
                    <label htmlFor="firstName" className="text-[10px] uppercase tracking-[0.3em] font-medium text-charcoal/40 block">
                        First Name
                    </label>
                    <input
                        required
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full bg-transparent border-b border-stone-200 focus:border-primary outline-none pb-3 text-base font-light transition-all duration-300 placeholder:text-stone-300 placeholder:text-[10px] placeholder:font-sans placeholder:tracking-[0.2em] focus:placeholder:text-transparent text-charcoal"
                        placeholder="ALEXEY"
                    />
                </div>
                <div className="space-y-6">
                    <label htmlFor="lastName" className="text-[10px] uppercase tracking-[0.3em] font-medium text-charcoal/40 block">
                        Last Name
                    </label>
                    <input
                        required
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full bg-transparent border-b border-stone-200 focus:border-primary outline-none pb-3 text-base font-light transition-all duration-300 placeholder:text-stone-300 placeholder:text-[10px] placeholder:font-sans placeholder:tracking-[0.2em] focus:placeholder:text-transparent text-charcoal"
                        placeholder="KUKHTIN"
                    />
                </div>
            </div>

            <div className="space-y-6">
                <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] font-medium text-charcoal/40 block">
                    Email Address
                </label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-transparent border-b border-stone-200 focus:border-primary outline-none pb-3 text-base font-light transition-all duration-300 placeholder:text-stone-300 placeholder:text-[10px] placeholder:font-sans placeholder:tracking-[0.2em] focus:placeholder:text-transparent text-charcoal"
                    placeholder="HELLO@EXAMPLE.COM"
                />
            </div>

            <div className="space-y-6">
                <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] font-medium text-charcoal/40 block">
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
                    className="w-full bg-transparent border-b border-stone-200 focus:border-primary outline-none pb-3 text-base font-light transition-colors resize-none placeholder:text-stone-300 placeholder:text-[10px] placeholder:font-sans placeholder:tracking-[0.2em] focus:placeholder:text-transparent text-charcoal min-h-[50px]"
                    placeholder="TELL US ABOUT YOUR VISION..."
                />
            </div>

            <div className="pt-12 text-center">
                <Button
                    disabled={isLoading}
                    type="submit"
                    className="animate-shine click-container group relative px-14 py-5 h-auto rounded-none text-[10px] uppercase tracking-[0.4em] text-charcoal dark:text-bg-dark bg-gold-beige/50 backdrop-blur-sm border border-gold-beige/20 transition-all duration-500 hover:bg-gold-beige/70 hover:scale-105 w-full md:w-auto"
                >
                    {isLoading ? 'Sending...' : 'Send Request'}
                </Button>
            </div>
        </form>
    );
}
