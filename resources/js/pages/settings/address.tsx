import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import SelectInput from '@/components/shared/inputs/select-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useLocales from '@/hooks/useLocales';
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


const Address = ({ user, countries }: PageProps) => {
    // Use Inertia form helper
    const { t } = useLocales();
    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('dashboard.address.heading'), href: '/settings/address' },
    ];
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
                {/* <HeadingSmall
                    title="Shipping Address"
                    description="Add your shipping address"
                /> */}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="w-full max-w-2xl space-y-6 rounded-lg shadow-lg">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Country */}
                            <SelectInput
                                id="country"
                                name="country_id"
                                label={t('dashboard.address.inputs.country.label')}
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
                                <Label htmlFor="city">{t('dashboard.address.inputs.city.label')}</Label>
                                <Input
                                    id="city"
                                    name="city"
                                    value={data.city}
                                    onChange={(e) =>
                                        setData('city', e.target.value)
                                    }
                                    placeholder={t('dashboard.address.inputs.city.placeholder')}
                                />
                                <InputError message={errors.city} />
                            </div>
                        </div>

                        {/* Full Address */}
                        <div className="grid gap-2">
                            <Label htmlFor="full_address">{t('dashboard.address.inputs.fullAddress.label')}</Label>
                            <Input
                                id="full_address"
                                name="full_address"
                                value={data.full_address}
                                onChange={(e) =>
                                    setData('full_address', e.target.value)
                                }
                                placeholder={t('dashboard.address.inputs.fullAddress.placeholder')}
                            />
                            <InputError message={errors.full_address} />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>  {t('dashboard.shared.save')}</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">{t('dashboard.shared.saved')}</p>
                        </Transition>
                    </div>
                </form>
            </SettingsLayout>
        </AppLayout>
    );
};

export default Address;
