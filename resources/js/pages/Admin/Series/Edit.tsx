import SaveAndBackButtons from '@/components/save-and-back-buttons';
import ImageInput from '@/components/shared/inputs/image-input';
import TextInput from '@/components/shared/inputs/text-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import AppLayout from '@/layouts/app-layout';
import useLocales from '@/hooks/useLocales';
import { Head, useForm } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';
import { useEffect, useRef } from 'react';
import type { BreadcrumbItem } from '@/types';
import SelectInput from '@/components/shared/inputs/select-input';

interface FlashProps {
    success?: string;
    error?: string;
}

interface EditProps {
    series: {
        id: number;
        title: string;
        description: string;
        image: string;
        status: string;
    };
    flash?: FlashProps;
}

export default function EditSeries({ series, flash }: EditProps) {
    const { t } = useLocales();

    const { data, setData, post, processing, errors, reset } = useForm<{
        title: string;
        description: string;
        image: File | null;
        status: string;
        _method: 'PUT';
    }>({
        _method: 'PUT',
        title: series.title,
        description: series.description,
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
        formData.append('title', data.title);
        formData.append('description', data.description);
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
        { title: t('dashboard.series.index.title'), href: route('admin.series.index') },
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

                {/* TITLE */}
                <TextInput
                    id="title"
                    value={data.title}
                    setValue={(value) => setData('title', value)}
                    label={t('dashboard.series.inputs.title.label')}
                    placeholder={t('dashboard.series.inputs.title.placeholder')}
                    error={errors.title}
                    required
                />

                {/* DESCRIPTION */}
                <TextAreaInput
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    label={t('dashboard.series.inputs.description.label')}
                    placeholder={t('dashboard.series.inputs.description.placeholder')}
                    error={errors.description}
                    required
                />
                <SelectInput
                    id="status"
                    name="status"
                    label={t('dashboard.series.inputs.status.label')}
                    options={t('dashboard.series.inputs.status.options', { returnObjects: true }) as any}
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
