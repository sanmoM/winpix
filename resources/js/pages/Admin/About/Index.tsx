import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface AboutItem {
    id: number;
    title: string;
    picture: string | null;
    status: string;
}

export default function Index({ items }: { items: AboutItem[] }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full border-collapse text-left text-sm text-gray-700">
                <thead className="bg-amber-600 text-white">
                    <tr>
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <tr
                                key={item.id}
                                className="border-t transition hover:bg-amber-50"
                            >
                                <td className="px-4 py-3 font-medium">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-3">
                                    {item.image ? (
                                        <img
                                            src="{item.picture}"
                                            alt={item.title}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                                            —
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3">{item.title}</td>
                                <td className="px-4 py-3">{item.picture}</td>
                                <td className="px-4 py-3 text-right">
                                    <Link
                                        href={route(
                                            'admin.about.edit',
                                            item.id,
                                        )}
                                        className="font-medium text-amber-600 hover:text-amber-700"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-4 py-6 text-center text-gray-500"
                            >
                                No items found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
