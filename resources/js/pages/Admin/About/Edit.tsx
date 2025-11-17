import RichTextEditor from '@/components/RichTextEditor';
import ImageInput from '@/components/shared/inputs/image-input';
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
        picture: File | string | null;
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

        post(route('admin.about.update', item.id), {
            data: formData,
            forceFormData: true,
            onSuccess: () => console.log('Updated successfully'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit About" />
            <div className="px-4 py-6">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-6xl space-y-6 px-4"
                >
                    {/* IMAGE UPLOAD */}
                    <div>
                        <ImageInput
                            image={
                                data.picture
                                    ? data.picture instanceof File
                                        ? URL.createObjectURL(data.picture)
                                        : `/storage/${data.picture}`
                                    : item.picture
                                      ? `/storage/${item.picture}`
                                      : null
                            }
                            setImage={(value) => setData('picture', value)}
                            wrapperClassName="w-full aspect-[2/1]"
                            iconClassName="w-[20%]"
                        />

                        {progress && (
                            <p className="mt-1 text-xs text-gray-500">
                                Uploading: {progress.percentage}%
                            </p>
                        )}
                        {errors.picture && (
                            <p className="text-sm text-red-600">
                                {errors.picture}
                            </p>
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
                            <p className="text-sm text-red-600">
                                {errors.title}
                            </p>
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
                            <p className="text-sm text-red-600">
                                {errors.content}
                            </p>
                        )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`rounded-lg bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] px-6 py-2 font-semibold text-white shadow ${
                                processing && 'cursor-not-allowed opacity-60'
                            }`}
                        >
                            {processing ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
