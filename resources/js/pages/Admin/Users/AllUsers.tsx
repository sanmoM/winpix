import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface User {
    id: number;
    name: string;
    email: string;
    level: string;
    status: string;
}

interface DashboardProps {
    users: User[];
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: 'admin/dashboard',
    },
];

export default function Dashboard({ users }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About" />
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-lg font-semibold">All Users</h1>
                    {/* <Link href={route('admin.help.create')}>
                        <Button text="Create" />
                    </Link> */}
                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200 bg-bg-primary shadow-sm">
                    <table className="min-w-full border-collapse text-left text-sm text-gray-700">
                        <thead className="bg-primary-color text-white">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Level</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3 !text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.length > 0 ? (
                                users?.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="border-t transition hover:bg-amber-50"
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            {user?.name}
                                        </td>
                                        <td className="px-4 py-3">
                                            {user?.email}
                                        </td>
                                        <td className="px-4 py-3">
                                            {user?.level}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge
                                                className={
                                                    user?.status === 'active'
                                                        ? 'bg-green-400'
                                                        : 'bg-red-400'
                                                }
                                            >
                                                {user?.status}
                                            </Badge>
                                        </td>
                                        <td className="space-x-3 px-4 py-3 !text-right">
                                            <Link
                                                href={route(
                                                    'admin.editUsers',
                                                    user.id,
                                                )}
                                                className="bg-dark cursor-pointer rounded-md bg-slate-800 px-3 py-2 font-medium text-white"
                                            >
                                                Edit
                                            </Link>

                                            {/* <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                                className="cursor-pointer rounded-md bg-red-500 p-2 font-medium text-white"
                                            >
                                                Delete
                                            </button> */}
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
            </div>
        </AppLayout>
    );
}
