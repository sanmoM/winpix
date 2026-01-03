import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: 'admin/all-users',
    },
    {
        title: 'Edit',
        href: '',
    },
];

interface EditProps {
    user: {
        id: number;
        name: string;
        email: string;
        number: string;
        status: string;
        pixel: number;
        coin: number;
        cash: number;
        country_id: string;
        level: number;
    };
    countries: any[];
}

export default function Edit({ user, countries }: EditProps) {
    const { data, setData, put, errors, processing } = useForm({
        name: user.name || '',
        email: user.email || '',
        status: user.status || 'active',
        number: user.number || '',
        pixel: user.pixel,
        coin: user.coin,
        cash: user.cash,
        country_id: user.country_id || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.updateUsers', user.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />

            <form
                onSubmit={handleSubmit}
                className="flex max-w-6xl flex-col space-y-4 p-6"
            >
                {/* Name */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter name"
                    />
                    {errors.name && (
                        <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                </div>

                {/* Email */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Enter email"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                </div>

                {/* Number */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="number">Number</Label>
                    <Input
                        id="number"
                        type="text" // Changed to text to handle symbols like '+' if needed
                        value={data.number}
                        onChange={(e) => setData('number', e.target.value)}
                        placeholder="Enter number"
                    />
                    {errors.number && (
                        <p className="text-sm text-red-600">{errors.number}</p>
                    )}
                </div>

                {/* Country Selection */}
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="country_id" className="font-semibold">
                        Country
                    </Label>
                    <select
                        id="country_id"
                        value={data.country_id}
                        onChange={(e) => setData('country_id', e.target.value)}
                        className="rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    >
                        <option value="">Select Country</option>
                        {countries?.map((country) => (
                            <option
                                key={country.id || country.country_name}
                                value={country.country_name}
                            >
                                {country.country_name}
                            </option>
                        ))}
                    </select>
                    {errors.country_id && (
                        <p className="text-sm text-red-600">
                            {errors.country_id}
                        </p>
                    )}
                </div>

                {/* Coin */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="coin">Coin</Label>
                    <Input
                        id="coin"
                        type="number"
                        value={data.coin}
                        onChange={(e) =>
                            setData('coin', Number(e.target.value))
                        }
                        placeholder="Enter coin"
                    />
                    {errors.coin && (
                        <p className="text-sm text-red-600">{errors.coin}</p>
                    )}
                </div>

                {/* Pixel */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="pixel">Pixel</Label>
                    <Input
                        id="pixel"
                        type="number"
                        value={data.pixel}
                        onChange={(e) =>
                            setData('pixel', Number(e.target.value))
                        }
                        placeholder="Enter pixel"
                    />
                    {errors.pixel && (
                        <p className="text-sm text-red-600">{errors.pixel}</p>
                    )}
                </div>

                {/* Cash */}
                <div className="grid w-full items-center gap-3">
                    <Label htmlFor="cash">Cash</Label>
                    <Input
                        id="cash"
                        type="number"
                        value={data.cash}
                        onChange={(e) =>
                            setData('cash', Number(e.target.value))
                        }
                        placeholder="Enter cash"
                    />
                    {errors.cash && (
                        <p className="text-sm text-red-600">{errors.cash}</p>
                    )}
                </div>

                {/* Status Selection */}
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="status" className="font-semibold">
                        Status
                    </Label>
                    <select
                        id="status"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    >
                        <option value="active">Active</option>
                        <option value="inactive">InActive</option>
                        {/* <option value="ban">Ban</option> */}
                    </select>
                    {errors.status && (
                        <p className="text-sm text-red-600">{errors.status}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`cursor-pointer rounded-lg bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] px-6 py-2 font-semibold text-white shadow transition ease-in-out ${
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
