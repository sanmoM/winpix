import ImageInput from '@/components/shared/inputs/image-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Redeem Package',
        href: route('admin.redeem.index'),
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
    const { data, setData, post, processing, progress, reset, errors } =
        useForm({
            number_of_coin: '',
            price: '',
            prize_type: 'app_prize',
            icon_image: null as File | null,
        });
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.redeem.store'), {
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
            <Head title="Create Redeem Package" />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="flex max-w-6xl flex-col space-y-4 p-6"
                encType="multipart/form-data"
            >
                {/* Image Upload */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="bg_image">Icon Image</Label>
                    <ImageInput
                        image={data.icon_image}
                        setImage={(value) => setData('icon_image', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
                    />
                    {progress && (
                        <p className="mt-1 text-xs text-gray-500">
                            Uploading: {progress.percentage}%
                        </p>
                    )}
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
                        id="number_of_coin"
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
                        className="w-28 cursor-pointer rounded-lg bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] px-6 py-2 font-semibold text-white disabled:opacity-70"
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
