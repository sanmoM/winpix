import SaveAndBackButtons from '@/components/save-and-back-buttons';
import Button from '@/components/shared/buttons/button';
import ImageInput from '@/components/shared/inputs/image-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: 'admin/about',
    },
];

interface AboutItem {
    id: number;
    title: string;
    picture: string | null;
    status: string;
}

interface FlashProps {
    success?: string;
    error?: string;
}

export default function Index({
    website_settings,
    flash,
}: {
    website_settings: AboutItem[];
    flash: FlashProps;
}) {
    const { data, setData, errors, processing } = useForm({
        light_logo: null,
        dark_logo: null,
        fav_icon: null,
        app_name: website_settings?.app_name || '',
        app_description: website_settings?.app_description || '',
        terms_of_service: website_settings?.terms_of_service || '',
        privacy_policy: website_settings?.privacy_policy || '',
        copyright: website_settings?.copyright || '',
        facebook: website_settings?.facebook || '',
        twitter: website_settings?.twitter || '',
        instagram: website_settings?.instagram || '',
    });

    const { t } = useLocales()

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash?.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.put(route('admin.others.update', website_settings?.id), data, {
            preserveScroll: true,
            // onSuccess: () => {
            //     toast.success('Website settings updated successfully');
            // },
            // onError: (error: any) => {
            //     toast.error(error.responseJSON.message);
            // },
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer />
            <Head title="About" />
            <form onSubmit={onSubmit} className='p-4 space-y-4'>
                <div className="grid grid-cols-3 w-full items-center gap-6">
                    <ImageInput
                        image={
                            data.light_logo
                                ? URL.createObjectURL(data.light_logo)
                                : website_settings?.light_logo
                                    ? `/storage/${website_settings?.light_logo}`
                                    : null
                        }
                        setImage={(value) => setData('light_logo', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
                        error={errors.light_logo}
                        label={t('dashboard.website_settings.inputs.logo.light_logo.label')}
                    />
                    <ImageInput
                        image={
                            data.dark_logo
                                ? URL.createObjectURL(data.dark_logo)
                                : website_settings?.dark_logo
                                    ? `/storage/${website_settings?.dark_logo}`
                                    : null
                        }
                        setImage={(value) => setData('dark_logo', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
                        error={errors.dark_logo}
                        label={t('dashboard.website_settings.inputs.logo.dark_logo.label')}
                    />
                    <ImageInput
                        image={
                            data.fav_icon
                                ? URL.createObjectURL(data.fav_icon)
                                : website_settings?.fav_icon
                                    ? `/storage/${website_settings?.fav_icon}`
                                    : null
                        }
                        setImage={(value) => setData('fav_icon', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
                        error={errors.fav_icon}
                        label={t('dashboard.website_settings.inputs.fav_icon.label')}
                    />
                </div>
                <TextInput
                    value={data.app_name}
                    setValue={(value) => setData('app_name', value)}
                    error={errors.app_name}
                    label={t('dashboard.website_settings.inputs.app_name.label')}
                    placeholder={t('dashboard.website_settings.inputs.app_name.placeholder')}
                />
                <TextAreaInput
                    value={data.app_description}
                    onChange={(e) => setData('app_description', e.target.value)}
                    error={errors.app_description}
                    label={t('dashboard.website_settings.inputs.app_description.label')}
                    placeholder={t('dashboard.website_settings.inputs.app_description.placeholder')}
                />
                <TextAreaInput
                    value={data.terms_of_service}
                    onChange={(e) => setData('terms_of_service', e.target.value)}
                    error={errors.terms_of_service}
                    label={t('dashboard.website_settings.inputs.terms_of_service.label')}
                    placeholder={t('dashboard.website_settings.inputs.terms_of_service.placeholder')}
                />
                <TextAreaInput
                    value={data.privacy_policy}
                    onChange={(e) => setData('privacy_policy', e.target.value)}
                    error={errors.privacy_policy}
                    label={t('dashboard.website_settings.inputs.privacy_policy.label')}
                    placeholder={t('dashboard.website_settings.inputs.privacy_policy.placeholder')}
                />
                <TextInput
                    value={data.copyright}
                    setValue={(value) => setData('copyright', value)}
                    error={errors.copyright}
                    label={t('dashboard.website_settings.inputs.copyright.label')}
                    placeholder={t('dashboard.website_settings.inputs.copyright.placeholder')}
                />
                <TextInput
                    value={data.facebook}
                    setValue={(value) => setData('facebook', value)}
                    error={errors.facebook}
                    label={t('dashboard.website_settings.inputs.facebook.label')}
                    placeholder={t('dashboard.website_settings.inputs.facebook.placeholder')}
                />
                <TextInput
                    value={data.twitter}
                    setValue={(value) => setData('twitter', value)}
                    error={errors.twitter}
                    label={t('dashboard.website_settings.inputs.twitter.label')}
                    placeholder={t('dashboard.website_settings.inputs.twitter.placeholder')}
                />
                <TextInput
                    value={data.instagram}
                    setValue={(value) => setData('instagram', value)}
                    error={errors.instagram}
                    label={t('dashboard.website_settings.inputs.instagram.label')}
                    placeholder={t('dashboard.website_settings.inputs.instagram.placeholder')}
                />
                {/* <SaveAndBackButtons
                    processing={processing}
                    // href={route('admin.others.')}
                /> */}
                <Button text={t('dashboard.shared.save')} processing={processing} className="w-28 py-2.5 text-lg mt-10 mr-auto ml-0" />
            </form>

        </AppLayout>
    );
}
