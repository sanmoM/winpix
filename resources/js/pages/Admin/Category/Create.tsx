import SaveAndBackButtons from '@/components/save-and-back-buttons';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
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

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const breadcrumbs: BreadcrumbItem[] = t(
        'dashboard.questCategory.create.breadcrumbs',
        { returnObjects: true }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.questCategory.store'), {
            onSuccess: () => {
                reset();
                router.visit(route('admin.questCategory.index'));
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.questCategory.create.title')} />
            <ToastContainer />

            <form onSubmit={handleSubmit} className="max-w-6xl space-y-6 p-6">
                {/* NAME */}
                <TextInput
                    id="name"
                    value={data.name}
                    setValue={(value) => setData('name', value)}
                    label={t('dashboard.questCategory.inputs.name.label')}
                    placeholder={t('dashboard.questCategory.inputs.name.placeholder')}
                    error={errors.name}
                    required
                />

                {/* DESCRIPTION */}
                <TextAreaInput
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    label={t('dashboard.questCategory.inputs.description.label')}
                    placeholder={t('dashboard.questCategory.inputs.description.placeholder')}
                    error={errors.description}
                    required
                />

                {/* SAVE + BACK */}
                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.questCategory.index')}
                />
            </form>
        </AppLayout>
    );
}
