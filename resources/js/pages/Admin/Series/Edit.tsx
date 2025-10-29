import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Series',
        href: route('admin.series.index'),
    },
    {
        title: 'Edit',
        href: '',
    },
];

interface EditProps {
    series: {
        id: number;
        title: string;
        description: string;
        image: string;
        status: string;
    };
}

export default function Edit({ series }: EditProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        title: series.title,
        description: series.description,
        status: series.status,
        image: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.series.update', series.id), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Series " />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-6 p-6"
                encType="multipart/form-data"
            >
                {/* Current Image Preview */}
                {series?.image && (
                    <div className="mb-2">
                        <img
                            src={`/storage/${series?.image}`}
                            alt="icon image"
                            className="h-20 w-20 rounded object-cover"
                        />
                    </div>
                )}
                {/* Image Upload */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="image">Change Image</Label>
                    <Input
                        id="image"
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) =>
                            setData('image', e.target.files?.[0] ?? null)
                        }
                    />
                    {errors.image && (
                        <p className="text-sm text-red-600">{errors.image}</p>
                    )}
                </div>
                {/* Title */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="title" className="font-semibold">
                        Title <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="title"
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Enter title"
                    />
                    {errors.title && (
                        <p className="text-sm text-red-600">{errors.title}</p>
                    )}
                </div>
                {/* Content */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="description" className="font-semibold">
                        Description <span className="text-red-600">*</span>
                    </Label>
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Enter Description"
                    />
                    {errors.description && (
                        <p className="text-sm text-red-600">
                            {errors.description}
                        </p>
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

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-4">
                    <Link
                        href={route('admin.series.index')}
                        className="w-28 rounded-lg border border-gray-300 px-6 py-2 text-center font-semibold text-gray-700 hover:bg-gray-100"
                    >
                        Back
                    </Link>

                    <button
                        type="submit"
                        className="w-28 rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white shadow hover:bg-amber-700 disabled:opacity-60"
                        disabled={processing}
                    >
                        {processing ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
