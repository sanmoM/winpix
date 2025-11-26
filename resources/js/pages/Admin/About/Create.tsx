import SaveAndBackButtons from '@/components/save-and-back-buttons';
import ImageInput from '@/components/shared/inputs/image-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';
import { useEffect, useRef } from 'react';
import RichTextEditor from '@/components/RichTextEditor';

interface FlashProps {
    success?: string;
    error?: string;
}

interface Props {
    flash?: FlashProps;
}

export default function Create({ flash }: Props) {
    const { t } = useLocales();

    const { data, setData, post, processing, progress, errors, reset } =
        useForm<{
            title: string;
            content: string;
            picture: File | null;
        }>({
            title: '',
            content: '',
            picture: null,
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
        if (data.picture) formData.append('picture', data.picture);

        post(route('admin.about.store'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = t(
        'dashboard.about.create.breadcrumbs',
        { returnObjects: true }
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.about.create.title')} />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-6 p-4"
                encType="multipart/form-data"
            >
                {/* IMAGE UPLOAD */}
                <ImageInput
                    image={data.picture}
                    setImage={(value) => setData('picture', value)}
                    wrapperClassName="w-full aspect-[2/1]"
                    iconClassName="w-[20%]"
                    error={errors.picture}
                    label={t('dashboard.about.inputs.image.label')}
                    required={true}
                    ref={fileInputRef}
                />

                {progress && (
                    <p className="mt-1 text-xs text-gray-500">
                        Uploading: {progress.percentage}%
                    </p>
                )}

                {/* TITLE */}
                <TextInput
                    id="title"
                    value={data.title}
                    setValue={(value) => setData('title', value)}
                    label={t('dashboard.about.inputs.title.label')}
                    placeholder={t('dashboard.about.inputs.title.placeholder')}
                    error={errors.title}
                    required={true}
                />

                {/* CONTENT (Rich Text) */}
                <div>
                    <label className="mb-1 block text-sm font-medium">
                        {t('dashboard.about.inputs.content.label')}
                    </label>

                    <RichTextEditor
                        modelValue={data.content}
                        onChange={(val) => setData('content', val)}
                    />

                    {errors.content && (
                        <p className="text-sm text-red-600">
                            {errors.content}
                        </p>
                    )}
                </div>

                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.about.index')}
                />
            </form>
        </AppLayout>
    );
}
