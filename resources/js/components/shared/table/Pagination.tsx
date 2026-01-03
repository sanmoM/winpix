import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export default function Pagination({
    links,
}: {
    links: PaginationLink[];
}) {
    return (
        <div className="flex justify-end mt-4 gap-2">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url ?? ''}
                    preserveScroll
                    preserveState
                    className={`px-3 py-1 border rounded text-sm
                        ${link.active ? 'bg-primary-color text-white' : ''}
                        ${!link.url ? 'text-gray-400 cursor-not-allowed' : ''}
                    `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
