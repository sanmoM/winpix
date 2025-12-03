import SaveAndBackButtons from '@/components/save-and-back-buttons';
import ImageInput from '@/components/shared/inputs/image-input';
import SelectInput from '@/components/shared/inputs/select-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
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

export default function EditSeries({ series, flash }: EditProps) {
    const { t } = useLocales();

    const { data, setData, post, processing, errors, reset } = useForm<{
        title_en: string;
        description_en: string;
        title_ar: string;
        description_ar: string;
        image: File | null;
        status: string;
        _method: 'PUT';
    }>({
        _method: 'PUT',
        title_en: series.title_en,
        description_en: series.description_en,
        title_ar: series.title_ar,
        description_ar: series.description_ar,
        image: null,
        status: series.status,
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
        formData.append('title_en', data.title_en);
        formData.append('description_en', data.description_en);
        formData.append('title_ar', data.title_ar);
        formData.append('description_ar', data.description_ar);
        formData.append('status', data.status);
        if (data.image) formData.append('image', data.image);

        post(route('admin.series.update', series.id), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard.series.index.title'),
            href: route('admin.series.index'),
        },
        { title: t('dashboard.series.edit.title') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.series.edit.title')} />
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
                                : series.image
                                  ? `/storage/${series.image}`
                                  : null
                        }
                        setImage={(value) => setData('image', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
                        error={errors.image}
                        label={t('dashboard.series.inputs.image.label')}
                        ref={fileInputRef}
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* English Column */}
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-bg-primary p-4">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-blue-600">
                            <span>🇬🇧</span> English Content
                        </h3>

                        {/* TITLE */}
                        <TextInput
                            id="title_en"
                            value={data.title_en}
                            setValue={(value) => setData('title_en', value)}
                            label={t('dashboard.series.inputs.title.label')}
                            placeholder={t(
                                'dashboard.series.inputs.title.placeholder',
                            )}
                            error={errors.title_en}
                            required={true}
                        />

                        {/* DESCRIPTION */}
                        <TextAreaInput
                            id="description_en"
                            value={data.description_en}
                            onChange={(e) =>
                                setData('description_en', e.target.value)
                            }
                            label={t(
                                'dashboard.series.inputs.description.label',
                            )}
                            placeholder={t(
                                'dashboard.series.inputs.description.placeholder',
                            )}
                            error={errors.description_en}
                            required={true}
                        />
                    </div>

                    <div
                        className="space-y-4 rounded-lg border border-gray-200 bg-bg-primary p-4"
                        dir="rtl"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-bold text-green-600">
                            <span>🇸🇦</span> المحتوى العربي
                        </h3>

                        <TextInput
                            id="title_ar"
                            value={data?.title_ar}
                            setValue={(value) => setData('title_ar', value)}
                            placeholder="العنوان"
                            error={errors.title_ar}
                            dir="rtl"
                            label={t(
                                'dashboard.brandMarketingBanner.edit.inputs.title_ar.label',
                            )}
                            required={true}
                        />

                        <TextAreaInput
                            id="description_ar"
                            value={data?.description_ar}
                            onChange={(e) =>
                                setData('description_ar', e.target.value)
                            }
                            placeholder="الوصف"
                            label="Description (Arabic)"
                            required={false}
                            dir="rtl"
                            error={errors?.description_ar}
                        />
                    </div>
                </div>

                <SelectInput
                    id="status"
                    name="status"
                    label={t('dashboard.series.inputs.status.label')}
                    options={
                        t('dashboard.series.inputs.status.options', {
                            returnObjects: true,
                        }) as any
                    }
                    value={data.status}
                    onChange={(value) => setData('status', value)}
                    className="max-w-auto w-full"
                />

                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.series.index')}
                />
            </form>
        </AppLayout>
    );
}
