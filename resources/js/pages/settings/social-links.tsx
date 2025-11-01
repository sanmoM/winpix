import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Social Links',
        href: "/settings/social-links",
    },
];



const SocialLinks = () => {
    // You would typically manage state for each input field here
    // const [website, setWebsite] = useState('');
    // const [instagram, setInstagram] = useState('');
    // ...

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
                    title="Add Social Links"
                    description="Add your social links to your profile"
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
                            <div className="grid gap-2">
                                <Label htmlFor="current_password">
                                    Personal Website
                                </Label>

                                <Input
                                    id="personal-website"
                                    name="personal_website"
                                    placeholder="Enter your personal website URL"
                                    className="mt-1 block w-full"
                                    autoComplete="personal-website"
                                />

                                <InputError
                                    message={errors.personal_website}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="current_password">
                                    Facebook Username
                                </Label>

                                <Input
                                    id="facebook"
                                    name="facebook"
                                    placeholder="Enter your Facebook username"
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                />

                                <InputError
                                    message={errors.facebook}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    Instagram Username
                                </Label>

                                <Input
                                    id="instagram-username"
                                    name="instagram_username"
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    placeholder="Enter your Instagram username"
                                />

                                <InputError message={errors.instagram_username} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    X Username
                                </Label>

                                <Input
                                    id="x-username"
                                    name="x_username"
                                    className="mt-1 block w-full"
                                    placeholder="Enter your X username"
                                />

                                <InputError
                                    message={errors.x_username}
                                />
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

export default SocialLinks;
