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
            className="text-foreground/60 hover:text-foreground rounded-full border border-transparent hover:border-foreground/20 hover:bg-transparent transition-all duration-300"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
