import SaveAndBackButtons from '@/components/save-and-back-buttons';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';
import { useEffect } from 'react';

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
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.prize_pools.store'), {
            onSuccess: () => reset(),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('dashboard.prizePool.index.title'), href: route('admin.prize_pools.index') },
        { title: t('dashboard.prizePool.create.title'), href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.prizePool.create.title')} />
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
                    label={t('dashboard.prizePool.inputs.name.label')}
                    placeholder={t('dashboard.prizePool.inputs.name.placeholder')}
                    error={errors.name}
                    required={true}
                />

                {/* Save & Back Buttons */}
                <SaveAndBackButtons
                    processing={processing}
                    href={route('admin.prize_pools.index')}
                />
            </form>
        </AppLayout>
    );
}
