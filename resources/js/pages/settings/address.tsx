import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import SelectInput from '@/components/shared/inputs/select-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { route } from 'ziggy-js';

interface Country {
    id: number;
    country_name: string;
}

interface User {
    id: number;
    country_id: number | null;
    city: string;
    full_address: string;
}

interface PageProps {
    user: User;
    countries: Country[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Address', href: '/settings/address' },
];

const Address = ({ user, countries }: PageProps) => {
    // Use Inertia form helper
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            country_id: user.country_id || '',
            city: user.city || '',
            full_address: user.full_address || '',
        });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('address.profileUpdate'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <HeadingSmall
                    title="Shipping Address"
                    description="Add your shipping address"
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="w-full max-w-2xl space-y-6 rounded-lg p-6 shadow-lg">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Country */}
                            <SelectInput
                                id="country"
                                name="country_id"
                                label="Country"
                                options={countries.map((country) => ({
                                    value: country.id,
                                    label: country.country_name,
                                }))}
                                value={data.country_id}
                                onChange={(value) =>
                                    setData('country_id', value)
                                }
                            />
                            <InputError message={errors.country_id} />

                            {/* City */}
                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={data.city}
                                    onChange={(e) =>
                                        setData('city', e.target.value)
                                    }
                                    placeholder="Please enter your city"
                                />
                                <InputError message={errors.city} />
                            </div>
                        </div>

                        {/* Full Address */}
                        <div className="grid gap-2">
                            <Label htmlFor="full_address">Full Address</Label>
                            <Input
                                id="full_address"
                                name="full_address"
                                value={data.full_address}
                                onChange={(e) =>
                                    setData('full_address', e.target.value)
                                }
                                placeholder="Enter your full address"
                            />
                            <InputError message={errors.full_address} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Save Address</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition>
                    </div>
                </form>
            </SettingsLayout>
        </AppLayout>
    );
};

export default Address;
