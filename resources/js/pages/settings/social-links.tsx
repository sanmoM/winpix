import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';



interface UserItem {
    id: number;
    personal_website: string;
    instagram: string;
    facebook: string;
    x: string;
}

interface SocialLinksProps {
    user: UserItem;
}

const SocialLinks = ({ user }: SocialLinksProps) => {
    const { t } = useLocales();
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            personal_website: user?.personal_website || '',
            instagram: user?.instagram || '',
            facebook: user?.facebook || '',
            x: user?.x || '',
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('address.profileUpdate'));
    };
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard.socialLinks.heading'),
            href: '/settings/social-links',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                {/* <HeadingSmall
                    title="Add Social Links"
                    description="Add your social links to your profile"
                /> */}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="personal_website">
                            {t('dashboard.socialLinks.inputs.personalWebsite.label')}
                        </Label>
                        <Input
                            id="personal_website"
                            name="personal_website"
                            value={data.personal_website}
                            onChange={(e) =>
                                setData('personal_website', e.target.value)
                            }
                            placeholder={t('dashboard.socialLinks.inputs.personalWebsite.placeholder')}
                        />
                        <InputError message={errors.personal_website} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="facebook">{t('dashboard.socialLinks.inputs.facebook.label')}</Label>
                        <Input
                            id="facebook"
                            name="facebook"
                            value={data.facebook}
                            onChange={(e) =>
                                setData('facebook', e.target.value)
                            }
                            placeholder={t('dashboard.socialLinks.inputs.facebook.placeholder')}
                        />
                        <InputError message={errors.facebook} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="instagram">{t('dashboard.socialLinks.inputs.instagram.label')}</Label>
                        <Input
                            id="instagram"
                            name="instagram"
                            value={data.instagram}
                            onChange={(e) =>
                                setData('instagram', e.target.value)
                            }
                            placeholder={t('dashboard.socialLinks.inputs.instagram.placeholder')}
                        />
                        <InputError message={errors.instagram} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="x">{t('dashboard.socialLinks.inputs.x.label')}</Label>
                        <Input
                            id="x"
                            name="x"
                            value={data.x}
                            onChange={(e) => setData('x', e.target.value)}
                            placeholder={t('dashboard.socialLinks.inputs.x.placeholder')}
                        />
                        <InputError message={errors.x} />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {t('dashboard.shared.save')}
                        </Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">{t('dashboard.shared.saved')}</p>
                        </Transition>
                    </div>
                </form>
            </SettingsLayout>
        </AppLayout>
    );
};

export default SocialLinks;
