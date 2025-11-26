import ImageInput from '@/components/shared/inputs/image-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';
import SaveAndBackButtons from '@/components/save-and-back-buttons';
import SelectInput from '@/components/shared/inputs/select-input';

interface FlashProps {
    success?: string;
    error?: string;
}

interface Props {
    flash?: FlashProps;
}

export default function Create({ flash }: Props) {
    const { t } = useLocales();
    const { data, setData, post, processing, reset, errors } = useForm({
        number_of_coin: '',
        price: '',
        prize_type: 'app_prize',
        icon_image: null as File | null,
        status: 'Active',
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.redeem.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = t('dashboard.redeem.create.breadcrumbs', { returnObjects: true });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.redeem.create.title')} />
            <ToastContainer />

            <form onSubmit={handleSubmit} className="max-w-6xl space-y-6 p-4" encType="multipart/form-data">
                <ImageInput
                    image={data.icon_image}
                    setImage={(value) => setData('icon_image', value)}
                    wrapperClassName="w-full aspect-[2/1]"
                    iconClassName="w-[20%]"
                    error={errors.icon_image}
                    label={t('dashboard.redeem.inputs.icon_image.label')}
                    required
                    ref={fileInputRef}
                />

                <TextInput
                    id="number_of_coin"
                    value={data.number_of_coin}
                    setValue={(value) => setData('number_of_coin', value)}
                    label={t('dashboard.redeem.inputs.number_of_coin.label')}
                    placeholder={t('dashboard.redeem.inputs.number_of_coin.placeholder')}
                    error={errors.number_of_coin}
                    required
                />

                <TextInput
                    id="price"
                    value={data.price}
                    setValue={(value) => setData('price', value)}
                    label={t('dashboard.redeem.inputs.price.label')}
                    placeholder={t('dashboard.redeem.inputs.price.placeholder')}
                    error={errors.price}
                    required
                />

                <SelectInput
                    id="prize_type"
                    value={data.prize_type}
                    setValue={(value) => setData('prize_type', value)}
                    label={t('dashboard.redeem.inputs.prize_type.label')}
                    options={t('dashboard.redeem.inputs.prize_type.options', { returnObjects: true })}
                    error={errors.prize_type}
                    required
                    className="max-w-auto w-full"
                />

                <SaveAndBackButtons processing={processing} href={route('admin.redeem.index')} />
            </form>
        </AppLayout>
    );
}
