import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToAnchor() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.slice(1));
            if (element) {
                // Short timeout to ensure the element is rendered and layout is stable
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [pathname, hash]);

    return null;
}
