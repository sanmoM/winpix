import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Quest Category',
        href: 'admin/questCategory',
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
    const { data, setData, post, errors, processing, reset } = useForm({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.questCategory.store'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Help" />
            <ToastContainer />
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

                {/* Action Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-4">
                    <Link
                        href={route('admin.questCategory.index')}
                        className="w-28 rounded-lg border border-gray-300 px-6 py-2 text-center font-semibold text-gray-700 hover:bg-gray-100"
                    >
                        Back
                    </Link>

                    <button
                        type="submit"
                        className="w-28 cursor-pointer rounded-lg bg-amber-600 px-6 py-2 font-semibold text-white shadow hover:bg-amber-700 disabled:opacity-70"
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
