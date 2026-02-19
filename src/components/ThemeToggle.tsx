import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
    const { toggleTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-charcoal/60 dark:text-off-white/60 hover:text-charcoal dark:hover:text-off-white rounded-full border border-transparent hover:border-charcoal/20 dark:hover:border-white/20 hover:bg-transparent transition-all duration-300"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
