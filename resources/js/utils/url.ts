export function normalizePath(href: string | undefined | null): string {
    if (!href) return '';

    try {
        const url = new URL(href, window.location.origin);
        return url.pathname.replace(/\/+$/, '');
    } catch {
        return href.replace(/\/+$/, '');
    }
}
