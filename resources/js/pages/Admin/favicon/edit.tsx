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

interface FlashProps {
    success?: string;
    error?: string;
}

interface EditProps {
    series: {
        id: number;
        title_en: string;
        description_en: string;
        title_ar: string;
        description_ar: string;
        image: string;
        status: string;
    };
    flash?: FlashProps;
}

export default function EditSeries({ favicon, flash }: EditProps) {
    const { t } = useLocales();

    const { data, setData, post, processing, errors, reset } = useForm<{
        title: string;
        image: File | null;
        _method: 'PUT';
    }>({
        _method: 'PUT',
        title: favicon.title,
        image: null,
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
        formData.append('title', data.title);
        if (data.image) formData.append('image', data.image);

        post(route('admin.favicon.update', favicon.id), {
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
            title: t('dashboard.favicon.index.title'),
            href: route('admin.favicon.index'),
        },
        { title: t('dashboard.favicon.edit.title') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.favicon.edit.title')} />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-6 p-6"
                encType="multipart/form-data"
            >
                {/* IMAGE UPLOAD */}
                <div className="grid w-full items-center gap-3">
                    <ImageInput
                        image={
                            data.image
                                ? URL.createObjectURL(data.image)
                                : favicon.image
                                    ? `/storage/${favicon.image}`
                                    : null
                        }
                        setImage={(value) => setData('image', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
                        error={errors.image}
                        label={t('dashboard.favicon.inputs.image.label')}
                        ref={fileInputRef}
                    />
                </div>
                <TextInput
                    id="title"
                    value={data.title}
                    setValue={(value) => setData('title', value)}
                    label={t('dashboard.favicon.inputs.title.label')}
                    placeholder={t(
                        'dashboard.favicon.inputs.title.placeholder',
                    )}
                    error={errors.title}
                    required={true}
                />

                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.favicon.index')}
                />
            </form>
        </AppLayout>
    );
}
