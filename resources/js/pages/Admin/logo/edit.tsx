import SaveAndBackButtons from '@/components/save-and-back-buttons';
import ImageInput from '@/components/shared/inputs/image-input';
import SelectInput from '@/components/shared/inputs/select-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';
import logo from '.';
import favicon from '../favicon';

interface FlashProps {
    success?: string;
    error?: string;
}

interface EditProps {
    logo: {
        id: number;
        light_logo: string;
        dark_logo: string;
    };
    flash?: FlashProps;
}

export default function EditSeries({ logo, flash }: EditProps) {
    const { t } = useLocales();

    const { data, setData, post, processing, errors, reset } = useForm<{
        light_logo: File | null;
        dark_logo: File | null;
        _method: 'PUT';
    }>({
        _method: 'PUT',
        light_logo: null,
        dark_logo: null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('light_logo', data.light_logo);
        formData.append('dark_logo', data.dark_logo);

        post(route('admin.logo.update', logo.id), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileInputRef.current) fileInputRef.current.value = '';
                // router.visit(route('admin.favicon.index'));
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard.logo.index.title'),
            href: route('admin.logo.index'),
        },
        { title: t('dashboard.logo.edit.title') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.logo.edit.title')} />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-6 p-6"
                encType="multipart/form-data"
            >
                {/* IMAGE UPLOAD */}
                <div className="grid w-full items-center gap-6">
                    <ImageInput
                        image={
                            data.light_logo
                                ? URL.createObjectURL(data.light_logo)
                                : logo.light_logo
                                    ? `/storage/${logo.light_logo}`
                                    : null
                        }
                        setImage={(value) => setData('light_logo', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
                        error={errors.light_logo}
                        label={t('dashboard.logo.inputs.light-logo.label')}
                        ref={fileInputRef}
                    />
                    <ImageInput
                        image={
                            data.dark_logo
                                ? URL.createObjectURL(data.dark_logo)
                                : logo.dark_logo
                                    ? `/storage/${logo.dark_logo}`
                                    : null
                        }
                        setImage={(value) => setData('dark_logo', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
                        error={errors.dark_logo}
                        label={t('dashboard.logo.inputs.dark-logo.label')}
                        ref={fileInputRef}
                    />
                </div>
                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.favicon.index')}
                />
            </form>
        </AppLayout>
    );
}
