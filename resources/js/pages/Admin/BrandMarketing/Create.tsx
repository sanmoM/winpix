import SaveAndBackButtons from '@/components/save-and-back-buttons';
import ImageInput from '@/components/shared/inputs/image-input';
import SelectInput from '@/components/shared/inputs/select-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface FlashProps {
    success?: string;
    error?: string;
}

interface Props {
    flash?: FlashProps;
}

export default function Create({ flash }: Props) {
    const { t } = useLocales();
    const { data, setData, post, processing, reset, errors } = useForm<{
        title: string;
        content: string;
        brand_marketing_type: string;
        bg_image: File | null;
    }>({
        title: '',
        content: '',
        brand_marketing_type: 'why_choose',
        bg_image: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.bg_image) formData.append('bg_image', data.bg_image);

        post(route('admin.brand_marketing.store'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = t(
        'dashboard.slider.create.breadcrumbs',
        {
            returnObjects: true,
        },
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Brand Marketing" />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-6 p-4"
                encType="multipart/form-data"
            >
                {/* Background Image */}

                <ImageInput
                    image={data.bg_image}
                    setImage={(value) => setData('bg_image', value)}
                    wrapperClassName="w-full aspect-[2/1]"
                    iconClassName="w-[20%]"
                    error={errors.bg_image}
                    label={t('dashboard.slider.inputs.bg_image.label')}
                    required={true}
                />
                <SelectInput
                    id="brand_marketing_type"
                    value={data.brand_marketing_type}
                    onChange={(value) => setData('brand_marketing_type', value)}
                    label={t('dashboard.brand_marketing_type.label')}
                    options={t('dashboard.brand_marketing_type.options', {
                        returnObjects: true,
                    })}
                    error={errors.brand_marketing_type}
                    required
                    className="max-w-auto w-full"
                    hasOption={false}
                />
                {/* Title */}
                <TextInput
                    id="title"
                    value={data.title}
                    setValue={(value) => setData('title', value)}
                    label={t('dashboard.slider.inputs.title.label')}
                    placeholder={t('dashboard.slider.inputs.title.placeholder')}
                    error={errors.title}
                    required={true}
                />

                {/* Content */}
                <TextAreaInput
                    id="content"
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    label={t('dashboard.slider.inputs.content.label')}
                    placeholder={t(
                        'dashboard.slider.inputs.content.placeholder',
                    )}
                    required={true}
                />
                {errors.content && (
                    <p className="text-sm text-red-600">{errors.content}</p>
                )}
                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.brand_marketing.index')}
                />
            </form>
        </AppLayout>
    );
}
