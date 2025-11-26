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
    slider: {
        id: number;
        title: string;
        content: string;
        status: string;
        bg_image: string | null;
    };
    flash?: FlashProps;
}

export default function Edit({ slider, flash }: EditProps) {
    const { t } = useLocales();
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        title: slider.title,
        content: slider.content,
        status: slider.status,
        bg_image: null as File | null,
    });

    const breadcrumbs: BreadcrumbItem[] = t('dashboard.slider.edit.breadcrumbs', {
        returnObjects: true,
    }) as BreadcrumbItem[];

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

        if (data.bg_image) {
            formData.append('bg_image', data.bg_image);
        }

        post(route('admin.slider.update', slider.id), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Slider" />
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
                            : slider.bg_image
                                ? `/storage/${slider.bg_image}`
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
                    placeholder={t('dashboard.slider.inputs.content.placeholder')}
                    label={t('dashboard.slider.inputs.content.label')}
                    required={true}
                    error={errors.content}
                />

                <SelectInput
                    label={t('dashboard.slider.inputs.status.label')}
                    placeholder={t('dashboard.slider.inputs.status.placeholder')}
                    className='max-w-full'
                    value={data?.status}
                    options={t('dashboard.slider.inputs.status.options', { returnObjects: true }) as any}
                    onChange={(value) => setData('status', value)}
                    className="max-w-auto w-full"
                />


                {/* Save / Back Buttons */}
                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.slider.index')}
                />
            </form>
        </AppLayout>
    );
}
