import SaveAndBackButtons from '@/components/save-and-back-buttons';
import ImageInput from '@/components/shared/inputs/image-input';
import Select from '@/components/shared/inputs/select';
import SelectInput from '@/components/shared/inputs/select-input';
import TextInput from '@/components/shared/inputs/text-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { route } from 'ziggy-js';

interface EditProps {
    redeem: {
        id: number;
        number_of_coin: string;
        price: string;
        prize_type: string;
        icon_image: string;
        status: string;
    };
}

export default function Edit({ redeem }: EditProps) {
    const { t } = useLocales();
    const { data, setData, post, processing, errors, reset } = useForm({
        _method: 'PUT',
        number_of_coin: redeem.number_of_coin,
        price: redeem.price,
        prize_type: redeem.prize_type,
        icon_image: null as File | null,
        status: redeem.status,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.redeem.update', redeem.id), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = t('dashboard.redeem.edit.breadcrumbs', { returnObjects: true });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.redeem.edit.title')} />

            <form onSubmit={handleSubmit} className="max-w-6xl space-y-6 p-4" encType="multipart/form-data">
                <ImageInput
                    image={data.icon_image ? URL.createObjectURL(data.icon_image as File) : redeem.icon_image ? `/storage/${redeem.icon_image}` : null}
                    setImage={(value) => setData('icon_image', value)}
                    wrapperClassName="w-full aspect-[2/1]"
                    iconClassName="w-[20%]"
                    error={errors.icon_image}
                    label={t('dashboard.redeem.inputs.icon_image.label')}
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
                    onChange={(value) => setData('prize_type', value)}
                    label={t('dashboard.redeem.inputs.prize_type.label')}
                    options={t('dashboard.redeem.inputs.prize_type.options', { returnObjects: true })}
                    error={errors.prize_type}
                    required
                    className="max-w-auto w-full"
                />

                <SelectInput
                    id="status"
                    value={data.status}
                    onChange={(value) => setData('status', value)}
                    label={t('dashboard.redeem.inputs.status.label')}
                    options={t('dashboard.redeem.inputs.status.options', { returnObjects: true })}
                    error={errors.status}
                    required
                    className="max-w-auto w-full"
                    hasOption={false}
                />

                <SaveAndBackButtons processing={processing} href={route('admin.redeem.index')} />
            </form>
        </AppLayout>
    );
}
