import SaveAndBackButtons from '@/components/save-and-back-buttons';
import ImageInput from '@/components/shared/inputs/image-input';
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

interface Props {
    flash?: FlashProps;
}

export default function Create({ flash }: Props) {
    const { t } = useLocales();
    const { data, setData, post, processing, reset, errors } = useForm({
        number_of_coin: '',
        price: '',
        icon_image: null as File | null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('number_of_coin', data.number_of_coin);
        formData.append('price', data.price);
        if (data.icon_image) formData.append('icon_image', data.icon_image);

        post(route('admin.store.store'), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                reset();
                if (fileInputRef.current) fileInputRef.current.value = '';
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = t('dashboard.store.create.breadcrumbs', { returnObjects: true });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.store.create.title')} />
            <ToastContainer />
            <form onSubmit={handleSubmit} className="max-w-6xl space-y-6 p-4" encType="multipart/form-data">
                {/* Icon Image */}
                <ImageInput
                    image={data.icon_image}
                    setImage={(value) => setData('icon_image', value)}
                    wrapperClassName="w-full aspect-[2/1]"
                    iconClassName="w-[20%]"
                    error={errors.icon_image}
                    label={t('dashboard.store.inputs.icon_image.label')}
                    required={true}
                    ref={fileInputRef}
                />

                {/* Number of Coin */}
                <TextInput
                    id="number_of_coin"
                    value={data.number_of_coin}
                    setValue={(value) => setData('number_of_coin', value)}
                    label={t('dashboard.store.inputs.number_of_coin.label')}
                    placeholder={t('dashboard.store.inputs.number_of_coin.placeholder')}
                    error={errors.number_of_coin}
                    required={true}
                />

                {/* Price */}
                <TextInput
                    id="price"
                    value={data.price}
                    setValue={(value) => setData('price', value)}
                    label={t('dashboard.store.inputs.price.label')}
                    placeholder={t('dashboard.store.inputs.price.placeholder')}
                    error={errors.price}
                    required={true}
                />

                <SaveAndBackButtons processing={processing} href={route('admin.store.index')} />
            </form>
        </AppLayout>
    );
}
