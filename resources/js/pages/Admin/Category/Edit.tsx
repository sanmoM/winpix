import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: 'admin/quest-category',
    },
    {
        title: 'Edit',
        href: '',
    },
];

interface EditProps {
    item: {
        id: number;
        name: string;
        status: string;
    };
}

export default function Edit({ item }: EditProps) {
    const { data, setData, put, errors, processing } = useForm({
        name: item.name,
        status: item.status,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.questCategory.update', item.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Quest Category" />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 p-6"
            >
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="name" className="font-semibold">
                        Name <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter Name"
                    />
                    {errors.name && (
                        <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                </div>

                {/* Status */}
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="status" className="font-semibold">
                        Status <span className="text-red-600">*</span>
                    </Label>
                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    >
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                    </select>
                    {errors.status && (
                        <p className="text-sm text-red-600">{errors.status}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-28 rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white shadow hover:bg-amber-700"
                    disabled={processing}
                >
                    {processing ? 'Updating...' : 'Update'}
                </button>
            </form>
        </AppLayout>
    );
}
