import SaveAndBackButtons from '@/components/save-and-back-buttons';
import SelectInput from '@/components/shared/inputs/select-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface FlashProps {
    success?: string;
    error?: string;
}

interface EditProps {
    item: {
        id: number;
        name: string;
        status: string;
    };
    flash?: FlashProps;
}

export default function Edit({ item, flash }: EditProps) {
    const { t } = useLocales();

    const { data, setData, put, processing, errors } = useForm({
        name: item.name,
        status: item.status,
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('dashboard.questType.index.title'), href: route('admin.questType.index') },
        { title: t('dashboard.questType.edit.title'), href: '' },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.questType.update', item.id), {
            onSuccess: () => {
                router.visit(route('admin.questType.index'));
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.questType.edit.title')} />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-6 p-4"
            >
                {/* NAME */}
                <TextInput
                    id="name"
                    value={data.name}
                    setValue={(value) => setData('name', value)}
                    label={t('dashboard.questType.inputs.name.label')}
                    placeholder={t('dashboard.questType.inputs.name.placeholder')}
                    error={errors.name}
                    required={true}
                />
                <SelectInput
                    id="status"
                    name="status"
                    label={t('dashboard.questType.inputs.status.label')}
                    options={t('dashboard.questType.inputs.status.options', { returnObjects: true }) as any}
                    value={data.status}
                    onChange={(value) => setData('status', value)}
                    className="max-w-auto w-full"
                />

                {/* Save & Back Buttons */}
                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.questType.index')}
                />
            </form>
        </AppLayout>
    );
}
