import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: 'admin/about',
    },
];

interface AboutItem {
    id: number;
    title: string;
    picture: string | null;
    status: string;
}

interface FlashProps {
    success?: string;
    error?: string;
}

export default function Index({
    items,
    flash,
}: {
    items: AboutItem[];
    flash: FlashProps;
}) {
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash?.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        router.delete(route('admin.about.destroy', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer />
            <Head title="About" />

            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-lg font-semibold">About Items</h1>
                <Link
                    href={route('admin.about.create')}
                    className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                >
                    Create
                </Link>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-bg-primary shadow-sm">
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
                        {items?.length > 0 ? (
                            items.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-t transition hover:bg-amber-50"
                                >
                                    <td className="px-4 py-3 font-medium">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.picture ? (
                                            <img
                                                src={`localhost:8000/storage/uploads/about/${item.picture}`}
                                                alt={item.title}
                                                className="h-10 w-10 rounded object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                                                —
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{item?.title}</td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            className={
                                                item?.status === 'Active'
                                                    ? 'bg-green-400'
                                                    : 'bg-red-400'
                                            }
                                        >
                                            {item?.status}
                                        </Badge>
                                    </td>
                                    <td className="space-x-3 px-4 py-3 text-right">
                                        <Link
                                            href={route(
                                                'admin.about.edit',
                                                item?.id,
                                            )}
                                            className="bg-dark cursor-pointer rounded-md bg-slate-800 px-3 py-2 font-medium text-white"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                            className="cursor-pointer rounded-md bg-red-500 p-2 font-medium text-white"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-6 !text-center text-gray-500"
                                >
                                    No items found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
