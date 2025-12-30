import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import axios from 'axios';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { initializeTheme } from './hooks/use-appearance';
import "./i18n";
import LanguageProvider from './providers/language-provider';
import StoreProvider from './providers/store-provider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        axios.get("/settings")
            .then(response => {
                if (response.data?.favicon) {
                    setFavicon("/storage/"+response?.data?.favicon?.image);
                }
            })
            .catch(() => {
                console.warn("Failed to load favicon");
            });

        root.render(<StoreProvider>
            <LanguageProvider>
                <App {...props} />
                <Toaster />
            </LanguageProvider>
        </StoreProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();



function setFavicon(url: string) {
    console.log(url)
    let link: HTMLLinkElement | null =
        document.querySelector("link[rel~='icon']");

    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }

    link.href = url;
}
