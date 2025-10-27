import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Redeem',
        href: route('admin.redeem.index'),
    },
    {
        title: 'Edit',
        href: '',
    },
];

interface EditProps {
    redeem: {
        id: number;
        number_of_coin: string;
        price: string;
        prize_type: string;
        icon_image: string;
        status: string;
    };
}

export default function Edit({ redeem }: EditProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        number_of_coin: redeem.number_of_coin,
        price: redeem.price,
        status: redeem.status,
        prize_type: redeem.prize_type,
        icon_image: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.redeem.update', redeem.id), {
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
            <Head title="Edit Redeem Package" />

            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-6 p-6"
                encType="multipart/form-data"
            >
                {/* Current Image Preview */}
                {redeem?.icon_image && (
                    <div className="mb-2">
                        <img
                            src={`/storage/${redeem?.icon_image}`}
                            alt="icon image"
                            className="h-20 w-20 rounded object-cover"
                        />
                    </div>
                )}
                {/* Image Upload */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="icon_image">Change Image</Label>
                    <Input
                        id="icon_image"
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) =>
                            setData('icon_image', e.target.files?.[0] ?? null)
                        }
                    />
                    {errors.icon_image && (
                        <p className="text-sm text-red-600">
                            {errors.icon_image}
                        </p>
                    )}
                </div>
                {/* Title */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="number_of_coin" className="font-semibold">
                        Number Of Coin <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="number_of_coin"
                        type="number"
                        value={data.number_of_coin}
                        onChange={(e) =>
                            setData('number_of_coin', e.target.value)
                        }
                        placeholder="Enter number of coin"
                    />
                    {errors.number_of_coin && (
                        <p className="text-sm text-red-600">
                            {errors.number_of_coin}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="price" className="font-semibold">
                        Price <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="price"
                        type="number"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        placeholder="Enter price"
                    />
                    {errors.price && (
                        <p className="text-sm text-red-600">{errors.price}</p>
                    )}
                </div>

                {/* prize_type */}
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="prize_type" className="font-semibold">
                        Prize Type <span className="text-red-600">*</span>
                    </Label>
                    <select
                        id="prize_type"
                        value={data.prize_type}
                        onChange={(e) => setData('prize_type', e.target.value)}
                        className="rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    >
                        <option value="app_prize">In-app Prize</option>
                        <option value="great_prize">Great Prize</option>
                        <option value="grand_prize">Grand Prize</option>
                    </select>
                    {errors.prize_type && (
                        <p className="text-sm text-red-600">
                            {errors.prize_type}
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
                        href={route('admin.redeem.index')}
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
