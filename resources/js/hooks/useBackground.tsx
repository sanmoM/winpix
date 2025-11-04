import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';


const differentNavUrls = [
    "/",
    "/quests/active-quests",
    /^\/profile\/[^/]+$/
];

export default function useBackground() {
    const [top, setTop] = useState(0);
    const { url } = usePage();
    useEffect(() => {
        const handleScroll = () => setTop(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isUrlIncluded = differentNavUrls.some(pattern => {
        if (pattern instanceof RegExp) {
            return pattern.test(url);
        }
        return pattern === url;
    });

    const hasBackground = top > 0 || !isUrlIncluded;
    return { hasBackground, isUrlIncluded }

}
