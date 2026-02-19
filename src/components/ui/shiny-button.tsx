import React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactElement<LucideIcon>;
    title: string;
    // subtitle removed for minimalist look
    arrow?: boolean;
    size?: "sm" | "md" | "lg" | "luxury";
    gradientLight?: { from: string; via: string; to: string };
    gradientDark?: { from: string; via: string; to: string };
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
    icon,
    title,
    arrow = true,
    size = "luxury",
    gradientLight = { from: "from-gold-beige/40", via: "via-gold-beige/20", to: "to-gold-beige/60" },
    gradientDark = { from: "from-stone-900/90", via: "via-black/90", to: "to-stone-900/90" },
    className,
    ...props
}) => {
    const sizes = {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        luxury: "py-5 px-10",
    };

    return (
        <button
            {...props}
            className={cn(
                `group relative overflow-hidden border cursor-pointer transition-all duration-500 ease-out 
         hover:scale-[1.02] hover:-translate-y-1 active:scale-95
         rounded-none
         border-gold-beige/30 bg-gradient-to-br ${gradientLight.from} ${gradientLight.via} ${gradientLight.to} 
         dark:${gradientDark.from} dark:${gradientDark.via} dark:${gradientDark.to}
         ${sizes[size]}`,
                className
            )}
        >
            {/* Moving gradient layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-gold-beige/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

            {/* Overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold-beige/20 via-white/10 to-gold-beige/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content */}
            <div className={cn("relative z-10 flex items-center gap-4", !icon && "justify-center")}>
                {/* Icon - Conditional Render */}
                {icon && (
                    <div className="p-2 bg-charcoal/5 dark:bg-white/5 backdrop-blur-sm group-hover:bg-charcoal/10 dark:group-hover:bg-white/10 transition-all duration-300">
                        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
                            className:
                                "w-5 h-5 text-charcoal dark:text-gold-beige group-hover:scale-110 transition-all duration-300",
                        })}
                    </div>
                )}

                {/* Texts - Centered if no icon and no arrow, or just flex-1 if typical */}
                <div className={cn("flex-1 text-left", !icon && !arrow && "text-center flex-none", !icon && arrow && "text-left pl-2")}>
                    <p className="text-charcoal dark:text-off-white font-bold text-[10px] uppercase tracking-[0.4em] group-hover:text-charcoal/80 dark:group-hover:text-white transition-colors duration-300">
                        {title}
                    </p>
                </div>

                {/* Arrow */}
                {arrow && (
                    <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                        <svg
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            fill="none"
                            className="w-4 h-4 text-charcoal dark:text-gold-beige"
                        >
                            <path
                                d="M9 5l7 7-7 7"
                                strokeWidth={2}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            ></path>
                        </svg>
                    </div>
                )}
            </div>
        </button>
    );
};

