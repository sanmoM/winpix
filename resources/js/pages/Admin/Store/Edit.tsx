import ImageInput from '@/components/shared/inputs/image-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Store',
        href: route('admin.store.index'),
    },
    {
        title: 'Edit',
        href: '',
    },
];

interface EditProps {
    store: {
        id: number;
        number_of_coin: string;
        price: string;
        status: string;
        icon_image: string;
    };
}

export default function Edit({ store }: EditProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        number_of_coin: store.number_of_coin,
        price: store.price,
        status: store.status,
        icon_image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.store.update', store.id), {
            forceFormData: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Store Package" />

            <form
                onSubmit={handleSubmit}
                className="flex max-w-6xl flex-col space-y-6 p-6"
                encType="multipart/form-data"
            >
                {/* Image Upload */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="bg_image">Icon Image</Label>

                    <ImageInput
                        image={
                            data.icon_image
                                ? data.icon_image instanceof File
                                    ? URL.createObjectURL(data.icon_image)
                                    : `/storage/${data.icon_image}`
                                : store.icon_image
                                  ? `/storage/${store.icon_image}`
                                  : null
                        }
                        setImage={(value) => setData('icon_image', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
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
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="content" className="font-semibold">
                        Sub Title <span className="text-red-600">*</span>
                    </Label>
                    <Textarea
                        id="content"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        placeholder="Enter sub title"
                    />
                    {errors.price && (
                        <p className="text-sm text-red-600">{errors.price}</p>
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
                        href={route('admin.store.index')}
                        className="w-28 rounded-lg border border-gray-300 px-6 py-2 text-center font-semibold text-gray-700 hover:bg-gray-100"
                    >
                        Back
                    </Link>

                    <button
                        type="submit"
                        className="w-28 cursor-pointer rounded-lg bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] px-6 py-2 font-semibold text-white disabled:opacity-70"
                        disabled={processing}
                    >
                        {processing ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </form>
        </AppLayout>
    );
}
