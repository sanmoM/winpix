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
        title: 'All Slider',
        href: route('admin.slider.index'),
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
    const { data, setData, post, processing, reset, errors } = useForm<{
        title: string;
        content: string;
        bg_image: File | null;
    }>({
        title: '',
        content: '',
        bg_image: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.bg_image) formData.append('bg_image', data.bg_image);

        post(route('admin.slider.store'), {
            data: formData,
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
            <Head title="Create Slider" />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 p-6"
                encType="multipart/form-data"
            >
                {/* Background Image */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="bg_image" className="font-semibold">
                        Background Image <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        ref={fileInputRef}
                        id="bg_image"
                        type="file"
                        onChange={(e) =>
                            setData('bg_image', e.target.files?.[0] ?? null)
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
                <div className="grid w-full items-center gap-3">
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

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 pt-4">
                    <button
                        type="submit"
                        className="w-28 rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white shadow hover:bg-amber-700 disabled:opacity-70"
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>

                    <Link
                        href={route('admin.slider.index')}
                        className="w-28 rounded-lg border border-gray-300 px-6 py-2 !text-center font-semibold text-gray-700 hover:bg-gray-100"
                    >
                        Back
                    </Link>
                </div>
            </form>
        </AppLayout>
    );
}
