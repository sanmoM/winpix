import SaveAndBackButtons from '@/components/save-and-back-buttons';
import ImageInput from '@/components/shared/inputs/image-input';
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

interface Props {
    flash?: FlashProps;
}

export default function CreateSeries({ flash }: Props) {
    const { t } = useLocales();

    const { data, setData, post, processing, progress, errors, reset } =
        useForm<{
            title_en: string;
            description_en: string;
            title_ar: string;
            description_ar: string;
            image: File | null;
        }>({
            title_en: '',
            description_en: '',
            title_ar: '',
            description_ar: '',
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
        formData.append('title_en', data.title_en);
        formData.append('description_en', data.description_en);
        formData.append('title_ar', data.title_ar);
        formData.append('description_ar', data.description_ar);
        if (data.image) formData.append('image', data.image);

        post(route('admin.series.store'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileInputRef.current) fileInputRef.current.value = '';
                router.visit(route('admin.series.index'));
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard.favicon.index.title'),
            href: route('admin.favicon.index'),
        },
        { title: t('dashboard.favicon.create.title') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.series.create.title')} />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-4xl space-y-6 p-6"
                encType="multipart/form-data"
            >
                {/* IMAGE UPLOAD */}
                <div className="grid w-full items-center gap-3">
                    <ImageInput
                        image={data.image}
                        setImage={(value) => setData('image', value)}
                        wrapperClassName="w-1/2 aspect-[3/2] !object-contain"
                        imageClassName='object-contain'
                        iconClassName="w-[20%]"
                        error={errors.image}
                        label={t('dashboard.series.inputs.image.label')}
                        required={true}
                        ref={fileInputRef}
                    />
                    {progress && (
                        <p className="mt-1 text-xs text-gray-500">
                            Uploading: {progress.percentage}%
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* English Column */}
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-bg-primary p-4">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-blue-600">
                            <span>🇬🇧</span> English Content
                        </h3>

                        {/* TITLE */}
                        <TextInput
                            id="title"
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
                            id="description"
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
                            label={t(
                                'dashboard.brandMarketingBanner.edit.inputs.title_ar.label',
                            )}
                            required={true}
                            dir='rtl'
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

                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.series.index')}
                />
            </form>
        </AppLayout>
    );
}
