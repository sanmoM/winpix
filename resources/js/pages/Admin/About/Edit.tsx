import SaveAndBackButtons from '@/components/save-and-back-buttons';
import ImageInput from '@/components/shared/inputs/image-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';
import RichTextEditor from '@/components/RichTextEditor';

interface FlashProps {
    success?: string;
    error?: string;
}

interface EditProps {
    item: {
        id: number;
        title: string;
        content: string;
        picture: string | null;
    };
    flash?: FlashProps;
}

export default function Edit({ item, flash }: EditProps) {
    const { t } = useLocales();

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: item.title,
        content: item.content,
        picture: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const breadcrumbs: BreadcrumbItem[] = t(
        'dashboard.about.edit.breadcrumbs',
        { returnObjects: true }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('_method', 'PUT');
        formData.append('title', data.title);
        formData.append('content', data.content);

        if (data.picture) {
            formData.append('picture', data.picture);
        }

        post(route('admin.about.update', item.id), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.about.edit.title')} />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-6 p-4"
                encType="multipart/form-data"
            >
                {/* IMAGE UPLOAD */}
                <ImageInput
                    image={
                        data.picture
                            ? data.picture
                            : item.picture
                                ? `/storage/${item.picture}`
                                : null
                    }
                    setImage={(value) => setData('picture', value)}
                    wrapperClassName="w-full aspect-[2/1]"
                    iconClassName="w-[20%]"
                    error={errors.picture}
                    label={t('dashboard.about.inputs.image.label')}
                    required={false}
                    ref={fileInputRef}
                />

                {/* TITLE */}
                <TextInput
                    id="title"
                    value={data.title}
                    setValue={(value) => setData('title', value)}
                    placeholder={t(
                        'dashboard.about.inputs.title.placeholder'
                    )}
                    error={errors.title}
                    label={t('dashboard.about.inputs.title.label')}
                    required={true}
                />

                {/* CONTENT */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        {t('dashboard.about.inputs.content.label')}
                    </label>

                    <RichTextEditor
                        modelValue={data.content}
                        onChange={(val) => setData('content', val)}
                    />

                    {errors.content && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.content}
                        </p>
                    )}
                </div>

                {/* SAVE + BACK */}
                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.about.index')}
                />
            </form>
        </AppLayout>
    );
}
