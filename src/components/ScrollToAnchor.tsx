import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToAnchor() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Helper function to retry finding the element
            let attempt = 0;
            const maxAttempts = 20; // Try for 2 seconds (20 * 100ms)

            const scrollToElement = () => {
                const element = document.getElementById(hash.slice(1));
                if (element) {
                    // Small delay to ensure layout is stable
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                } else if (attempt < maxAttempts) {
                    attempt++;
                    setTimeout(scrollToElement, 100);
                }
            };

            scrollToElement();
        }
    }, [pathname, hash]);

    return null;
}
