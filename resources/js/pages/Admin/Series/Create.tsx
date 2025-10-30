import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Series',
        href: route('admin.series.index'),
    },
    {
        title: 'Create',
        href: '',
    },
];

interface FlashProps {
    success?: string;
    error?: string;
}

interface Props {
    flash?: FlashProps;
}

export default function Create({ flash }: Props) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        image: null as File | null,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.series.store'), {
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
            <Head title="Create Series" />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 p-6"
                encType="multipart/form-data"
            >
                {/* Image Upload */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="image">
                        Image <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="image"
                        ref={fileInputRef}
                        type="file"
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
                        placeholder="Enter number of coin"
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

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-4">
                    <Link
                        href={route('admin.redeem.index')}
                        className="w-28 rounded-lg border border-gray-300 px-6 py-2 text-center font-semibold text-gray-700 hover:bg-gray-100"
                    >
                        Back
                    </Link>

                    <button
                        type="submit"
                        className="w-28 rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white shadow hover:bg-amber-700 disabled:opacity-70"
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
