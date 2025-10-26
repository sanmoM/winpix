import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Slider',
        href: route('admin.slider.index'),
    },
    {
        title: 'Edit',
        href: '',
    },
];

interface EditProps {
    slider: {
        id: number;
        title: string;
        content: string;
        status: string;
        bg_image: string | null;
    };
}

export default function Edit({ slider }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: slider.title,
        content: slider.content,
        status: slider.status,
        bg_image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.slider.update', slider.id), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Slider" />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-6 p-6"
                encType="multipart/form-data"
            >
                {/* Current Image Preview */}
                {slider.bg_image && (
                    <div>
                        <Label className="mb-2 block">Current Image</Label>
                        <img
                            src={`/storage/${slider.bg_image}`}
                            alt={slider.title}
                            className="h-32 w-32 rounded-lg border object-cover"
                        />
                    </div>
                )}

                {/* Image Upload */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="bg_image">Change Image</Label>
                    <Input
                        id="bg_image"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setData(
                                'bg_image',
                                e.target.files ? e.target.files[0] : null,
                            )
                        }
                    />
                    {errors.bg_image && (
                        <p className="text-sm text-red-600">
                            {errors.bg_image}
                        </p>
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
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="content" className="font-semibold">
                        Sub Title <span className="text-red-600">*</span>
                    </Label>
                    <Textarea
                        id="content"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        placeholder="Enter sub title"
                    />
                    {errors.content && (
                        <p className="text-sm text-red-600">{errors.content}</p>
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
                    className="w-28 rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white shadow hover:bg-amber-700 disabled:opacity-60"
                    disabled={processing}
                >
                    {processing ? 'Updating...' : 'Update'}
                </button>
            </form>
        </AppLayout>
    );
}
