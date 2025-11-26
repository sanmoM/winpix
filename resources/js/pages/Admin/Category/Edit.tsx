import SaveAndBackButtons from '@/components/save-and-back-buttons';
import SelectInput from '@/components/shared/inputs/select-input';
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

interface EditProps {
    item: {
        id: number;
        name: string;
        description: string;
        status: string;
    };
    flash?: FlashProps;
}

export default function Edit({ item, flash }: EditProps) {
    const { t } = useLocales();

    const { data, setData, put, errors, processing } = useForm({
        name: item.name,
        description: item.description,
        status: item.status,
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const breadcrumbs = t('dashboard.questCategory.edit.breadcrumbs', {
        returnObjects: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.questCategory.update', item.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <Head title={t('dashboard.questCategory.edit.title')} />
            <ToastContainer />

            <form
                onSubmit={handleSubmit}
                className="max-w-6xl space-y-6 p-6"
            >
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

                {/* STATUS */}
                {/* <div className="grid w-full items-center gap-2">
                    <label className="font-semibold">
                        {t('dashboard.questCategory.inputs.status.label')} <span className="text-red-600">*</span>
                    </label>
                    <select
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        className="rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-amber-600 focus:outline-none"
                    >
                        <option value="Active">{t('dashboard.questCategory.status.Active')}</option>
                        <option value="InActive">{t('dashboard.questCategory.status.InActive')}</option>
                    </select>
                    {errors.status && (
                        <p className="text-sm text-red-600">{errors.status}</p>
                    )}
                </div> */}

                <SelectInput
                    id="status"
                    name="status"
                    label={t('dashboard.questCategory.inputs.status.label')}
                    options={t('dashboard.questCategory.inputs.status.options', { returnObjects: true }) as any}
                    value={data.status}
                    onChange={(value) => setData('status', value)}
                    className="max-w-auto w-full"
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
