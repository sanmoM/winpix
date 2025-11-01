import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
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
import { Form, Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Address',
        href: "/settings/address",
    },
];

const countryOptions = [
    { value: 'usa', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
];




const Address = () => {
    const [country, setCountry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted!');
    };

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <HeadingSmall
                    title="Shipping Address"
                    description="Add your shipping address"
                />

                <Form
                    {...PasswordController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    resetOnError={[
                        'password',
                        'password_confirmation',
                        'current_password',
                    ]}
                    resetOnSuccess
                    onError={(errors) => {
                        if (errors.password) {
                            passwordInput.current?.focus();
                        }

                        if (errors.current_password) {
                            currentPasswordInput.current?.focus();
                        }
                    }}
                    className="space-y-6"
                >
                    {({ errors, processing, recentlySuccessful }) => (
                        <>
                            <div className="rounded-lg shadow-lg w-full max-w-2xl">


                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <SelectInput
                                            id="country"
                                            name="country"
                                            label="Country"
                                            options={countryOptions}
                                            value={country}
                                            onChange={(value) => setCountry(value)}
                                        />

                                        {/* City Input */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="current_password">
                                                City
                                            </Label>

                                            <Input
                                                id="city"
                                                name="city"
                                                placeholder="Please enter your city"
                                                className="mt-1 block w-full"
                                            />

                                            <InputError
                                                message={errors.city}
                                            />
                                        </div>
                                    </div>

                                    {/* Full Address Textarea */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="current_password">
                                            Full Address
                                        </Label>

                                        <Input
                                            id="full-address"
                                            name="full_address"
                                            placeholder="Enter your full address"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                                        />

                                        <InputError
                                            message={errors.full_address}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-password-button"
                                >
                                    Save Links
                                </Button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-neutral-600">
                                        Saved
                                    </p>
                                </Transition>
                            </div>
                        </>
                    )}
                </Form>
            </SettingsLayout>
        </AppLayout>
    );
};

export default Address;
