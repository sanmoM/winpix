import RichTextEditor from '@/components/RichTextEditor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('admin.dashboard') },
    { title: 'About', href: route('admin.about.index') },
    { title: 'Edit', href: '' },
];

interface EditProps {
    item: {
        id: number;
        title: string;
        content: string;
        picture: string | null;
    };
}

export default function Edit({ item }: EditProps) {
    const { data, setData, post, processing, progress, errors } = useForm({
        _method: 'PUT',
        title: item.title,
        content: item.content,
        picture: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.picture) formData.append('picture', data.picture);

        post(route('admin.about.update', item.id), {
            data: formData,
            forceFormData: true,
            onSuccess: () => console.log('Updated successfully'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit About" />

            <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-3xl space-y-6 rounded-lg bg-white p-6 shadow"
            >
                {/* CURRENT IMAGE PREVIEW */}
                {item.picture && (
                    <div className="mb-4">
                        <Label>Current Image</Label>
                        <img
                            src={`/storage/${item.picture}`}
                            alt={item.title}
                            className="mt-1 h-24 w-24 rounded border object-cover"
                        />
                    </div>
                )}

                {/* IMAGE UPLOAD */}
                <div>
                    <Label htmlFor="picture">Change Image</Label>
                    <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setData(
                                'picture',
                                e.target.files ? e.target.files[0] : null,
                            )
                        }
                    />
                    {progress && (
                        <p className="mt-1 text-xs text-gray-500">
                            Uploading: {progress.percentage}%
                        </p>
                    )}
                    {errors.picture && (
                        <p className="text-sm text-red-600">{errors.picture}</p>
                    )}
                </div>

                {/* TITLE */}
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Enter title"
                    />
                    {errors.title && (
                        <p className="text-sm text-red-600">{errors.title}</p>
                    )}
                </div>

                {/* CONTENT */}
                <div>
                    <Label htmlFor="content">Content</Label>
                    <RichTextEditor
                        modelValue={data.content}
                        onChange={(val) => setData('content', val)}
                    />
                    {errors.content && (
                        <p className="text-sm text-red-600">{errors.content}</p>
                    )}
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white shadow transition hover:bg-amber-700 ${
                            processing && 'cursor-not-allowed opacity-60'
                        }`}
                    >
                        {processing ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
