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

interface EditProps {
    brand_marketing: {
        id: number;
        title: string;
        content: string;
        status: string;
        bg_image: string | null;
        brand_marketing_type: string;
    };
    flash?: FlashProps;
}

export default function Edit({ brand_marketing, flash }: EditProps) {
    const { t } = useLocales();
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        title: brand_marketing.title,
        content: brand_marketing.content,
        status: brand_marketing.status,
        bg_image: null as File | null,
        brand_marketing_type: brand_marketing.brand_marketing_type,
    });

    const breadcrumbs: BreadcrumbItem[] = t(
        'dashboard.slider.edit.breadcrumbs',
        {
            returnObjects: true,
        },
    ) as BreadcrumbItem[];

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
        formData.append('content', data.content);
        formData.append('status', data.status);
        formData.append('brand_marketing_type', data.brand_marketing_type);

        if (data.bg_image) {
            formData.append('bg_image', data.bg_image);
        }

        post(route('admin.brand_marketing.update', brand_marketing.id), {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Brand Marketing" />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-6 p-4"
                encType="multipart/form-data"
            >
                {/* Background Image */}
                <ImageInput
                    image={
                        data.bg_image
                            ? data.bg_image
                            : brand_marketing.bg_image
                              ? `/storage/${brand_marketing.bg_image}`
                              : null
                    }
                    setImage={(value) => setData('bg_image', value)}
                    wrapperClassName="w-full aspect-[2/1]"
                    iconClassName="w-[20%]"
                    error={errors.bg_image}
                    label={t('dashboard.slider.inputs.bg_image.label')}
                    required={false}
                    ref={fileInputRef}
                />

                <SelectInput
                    label={t('dashboard.brand_marketing_type.label')}
                    placeholder={t(
                        'dashboard.brand_marketing_type.placeholder',
                    )}
                    className="max-w-full"
                    value={data?.status}
                    options={
                        t('dashboard.brand_marketing_type.options', {
                            returnObjects: true,
                        }) as any
                    }
                    onChange={(value) => setData('brand_marketing_type', value)}
                />

                {/* Title */}
                <TextInput
                    id="title"
                    value={data.title}
                    setValue={(value) => setData('title', value)}
                    placeholder={t('dashboard.slider.inputs.title.placeholder')}
                    error={errors.title}
                    label={t('dashboard.slider.inputs.title.label')}
                    required={true}
                />

                {/* Content */}
                <TextAreaInput
                    id="content"
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    placeholder={t(
                        'dashboard.slider.inputs.content.placeholder',
                    )}
                    label={t('dashboard.slider.inputs.content.label')}
                    required={true}
                    error={errors.content}
                />

                <SelectInput
                    label={t('dashboard.slider.inputs.status.label')}
                    placeholder={t(
                        'dashboard.slider.inputs.status.placeholder',
                    )}
                    className="max-w-full"
                    value={data?.status}
                    options={
                        t('dashboard.slider.inputs.status.options', {
                            returnObjects: true,
                        }) as any
                    }
                    onChange={(value) => setData('status', value)}
                />

                {/* Save / Back Buttons */}
                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.brand_marketing.index')}
                />
            </form>
        </AppLayout>
    );
}
