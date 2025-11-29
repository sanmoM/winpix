import SaveAndBackButtons from '@/components/save-and-back-buttons';
import ImageInput from '@/components/shared/inputs/image-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface FlashProps {
    success?: string;
    error?: string;
}

interface Banner {
    id: number;
    bg_image: string | null;
    title_en: string;
    subtitle_en: string | null;
    title_ar: string;
    subtitle_ar: string | null;
}

interface EditProps {
    banner: Banner;
    flash?: FlashProps;
}

export default function Edit({ banner, flash }: EditProps) {
    const { t } = useLocales();

    // Initialize form with new database fields
    const { data, setData, post, reset, processing, errors } = useForm({
        _method: 'PUT',
        title_en: banner.title_en || '',
        subtitle_en: banner.subtitle_en || '',

        title_ar: banner.title_ar || '',
        subtitle_ar: banner.subtitle_ar || '',

        bg_image: null as File | null,
    });

    // Update breadcrumbs key
    // const breadcrumbs: BreadcrumbItem[] = t(
    //     'dashboard.banner.edit.breadcrumbs',
    //     {
    //         returnObjects: true,
    //     },
    // ) as BreadcrumbItem[];

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('_method', 'PUT');

        // Append all text fields
        formData.append('title_en', data.title_en);
        formData.append('subtitle_en', data.subtitle_en);

        formData.append('title_ar', data.title_ar);
        formData.append('subtitle_ar', data.subtitle_ar);

        // Handle Background Image
        if (data.bg_image) {
            formData.append('bg_image', data.bg_image);
        }

        // Make sure route name matches your web.php (e.g., banner.update)
        post(route('banner.update'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        // <AppLayout breadcrumbs={breadcrumbs}>
        <AppLayout>
            <Head title="Edit Banner" />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-8 p-4"
                encType="multipart/form-data"
            >
                {/* --- Top Section: Image & Common Link --- */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="col-span-1">
                        <ImageInput
                            image={
                                data.bg_image
                                    ? data.bg_image
                                    : banner.bg_image
                                      ? `/storage/${banner.bg_image}`
                                      : null
                            }
                            setImage={(value) => setData('bg_image', value)}
                            wrapperClassName="w-full aspect-[16/9]"
                            iconClassName="w-[20%]"
                            error={errors.bg_image}
                            label={t('dashboard.banner.inputs.image.label')}
                            required={false}
                        />
                    </div>
                </div>

                <div className="my-4 border-t border-gray-200"></div>

                {/* --- Content Section: Split English / Arabic --- */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* English Column */}
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <h3 className="flex items-center gap-2 text-lg font-bold text-blue-600">
                            <span>🇬🇧</span> English Content
                        </h3>

                        <TextInput
                            id="title_en"
                            value={data.title_en}
                            setValue={(value) => setData('title_en', value)}
                            placeholder="Enter English Title"
                            error={errors.title_en}
                            label={t('dashboard.banner.inputs.title_en.label')}
                            required={true}
                        />

                        <TextAreaInput
                            id="subtitle_en"
                            value={data.subtitle_en}
                            onChange={(e) =>
                                setData('subtitle_en', e.target.value)
                            }
                            placeholder="Enter English Subtitle"
                            label={t(
                                'dashboard.banner.inputs.subtitle_en.label',
                            )}
                            required={false}
                            error={errors.subtitle_en}
                        />
                    </div>

                    <div
                        className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
                        dir="rtl"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-bold text-green-600">
                            <span>🇸🇦</span> المحتوى العربي
                        </h3>

                        <TextInput
                            id="title_ar"
                            value={data.title_ar}
                            setValue={(value) => setData('title_ar', value)}
                            placeholder="أدخل العنوان بالعربية"
                            error={errors.title_ar}
                            label={t('dashboard.banner.inputs.title_ar.label')}
                            required={true}
                        />

                        <TextAreaInput
                            id="subtitle_ar"
                            value={data.subtitle_ar}
                            onChange={(e) =>
                                setData('subtitle_ar', e.target.value)
                            }
                            placeholder="أدخل الوصف الفرعي بالعربية"
                            label={t(
                                'dashboard.banner.inputs.subtitle_ar.label',
                            )}
                            required={false}
                            error={errors.subtitle_ar}
                        />
                    </div>
                </div>

                {/* Save / Back Buttons */}
                <SaveAndBackButtons
                    processing={processing}
                    href={route('dashboard')}
                />
            </form>
        </AppLayout>
    );
}
