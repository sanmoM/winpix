import InputError from '@/components/input-error';
import DateInput from '@/components/shared/inputs/date-input';
import ImageInput from '@/components/shared/inputs/image-input';
import SelectInput from '@/components/shared/inputs/select-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface Prize {
    min: number | string;
    max: number | string;
    coin: number | string;
    title: string;
}

interface Quest {
    id: number;
    title: string;
    brief: string;
    category_id: string;
    startDate: string;
    endDate: string;
    prizes: Prize[];
    image: File | null | string;
    entry_coin: string;
}

// Utility to format ISO date string to YYYY-MM-DD
const formatDate = (date?: string | Date | null) => {
    if (!date) return '';
    if (typeof date === 'string') {
        // If it's already YYYY-MM-DD or ISO
        return date.includes('T') ? date.split('T')[0] : date;
    }
    if (date instanceof Date) {
        return date.toISOString().split('T')[0]; // convert Date to YYYY-MM-DD
    }
    return '';
};


export default function EditQuest() {
    const { quest, categories }: { quest: Quest; categories: { id: number; name: string }[] } = usePage().props;

    const { t } = useLocales();

    const { data, setData, put, processing, errors, recentlySuccessful, reset } =
        useForm<Quest>({
            id: quest.id,
            title: quest.title,
            brief: quest.brief,
            category_id: quest.category_id.toString(),
            startDate: formatDate(quest.startDate),
            endDate: formatDate(quest.endDate),
            prizes: quest.prizes,
            image: quest.image || null,
            entry_coin: quest.entry_coin,
        });

        console.log(data)


    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const addPrizeRow = () => {
        setData('prizes', [...data.prizes, { min: "", max: "", coin: "", title: "" }]);
    };

    const removePrizeRow = (index: number) => {
        if (data.prizes.length <= 1) return;
        setData('prizes', data.prizes.filter((_, i) => i !== index));
    };

    const setPrizeData = (index: number, field: keyof Prize, value: string | number) => {
        const newPrizes: Prize[] = [...data.prizes];
        newPrizes[index][field] = value as any;
        setData('prizes', newPrizes);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route('user-dashboard.quest.update', data.id), {
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t("dashboard.profile.heading"), href: dashboard().url },
        { title: t("dashboard.editQuest.heading"), href: "#" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t("dashboard.editQuest.heading")} />
            <div className='px-4 py-6'>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl" encType="multipart/form-data">
                    <ImageInput
                        image={typeof data.image === 'string' ? "/storage/" + data.image : data.image}
                        setImage={(value) => setData('image', value)}
                        wrapperClassName='w-full aspect-[2/1]'
                        iconClassName='w-[20%]'
                    />

                    {/* Title */}
                    <div className="grid gap-2">
                        <Label htmlFor="title">{t('dashboard.createQuest.inputs.title.label')}</Label>
                        <Input
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder={t('dashboard.createQuest.inputs.title.placeholder')}
                        />
                        <InputError message={errors.title} />
                    </div>

                    {/* Brief */}
                    <div className="grid gap-2">
                        <Label htmlFor="brief">{t('dashboard.createQuest.inputs.brief.label')}</Label>
                        <TextAreaInput
                            value={data.brief}
                            onChange={(e) => setData('brief', e.target.value)}
                            placeholder={t('dashboard.createQuest.inputs.brief.placeholder')}
                        />
                        <InputError message={errors.brief} />
                    </div>

                    {/* Category */}
                    <div className='grid grid-cols-2 gap-4'>
                        <SelectInput
                            id="category"
                            name="category"
                            label={t('dashboard.createQuest.inputs.category.label')}
                            options={categoryOptions}
                            value={data.category_id}
                            onChange={(value) => setData('category_id', value as string)}
                            className='w-full max-w-auto'
                        />
                        <div className="grid gap-2">
                            <Label htmlFor="title">{t('dashboard.createQuest.inputs.entryCoin.label')}</Label>
                            <Input
                                type='number'
                                id="start"
                                name="start"
                                value={data.entry_coin}
                                onChange={(e) => {
                                    setData("entry_coin", e.target.value)
                                }
                                }
                                placeholder={t('dashboard.createQuest.inputs.entryCoin.placeholder')}
                            />
                            <InputError message={errors.entry_coin} />
                        </div>
                    </div>
                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="startDate">{t('dashboard.createQuest.inputs.startDate.label')}</Label>
                            <DateInput
                                value={data.startDate}
                                onChange={(value) => setData('startDate', value)}
                            />
                            <InputError message={errors.startDate} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="endDate">{t('dashboard.createQuest.inputs.endDate.label')}</Label>
                            <DateInput
                                value={data.endDate}
                                onChange={(value) => setData('endDate', value)}
                            />
                            <InputError message={errors.endDate} />
                        </div>
                    </div>

                    {/* Prizes */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-lg font-medium text-white">{t('dashboard.createQuest.inputs.multiplePrizes.title')}</label>
                            <Button disabled={processing} onClick={addPrizeRow}>+ {t('dashboard.createQuest.inputs.multiplePrizes.addPrize.text')}</Button>
                        </div>

                        <div className="space-y-4">
                            {data.prizes.map((prize, index) => (
                                <div key={index} className="flex items-center gap-2 md:gap-4">
                                    <div className="grid grid-cols-[1fr_130px_130px_130px] items-center gap-2 md:gap-4 w-full">
                                        <Input
                                            value={prize.title}
                                            onChange={(e) => setPrizeData(index, 'title', e.target.value)}
                                            placeholder={t('dashboard.createQuest.inputs.multiplePrizes.titleInput.placeholder')}
                                        />
                                        <Input
                                            type='number'
                                            value={prize.min}
                                            onChange={(e) => setPrizeData(index, 'min', e.target.value)}
                                        />
                                        <Input
                                            type='number'
                                            value={prize.max}
                                            onChange={(e) => setPrizeData(index, 'max', e.target.value)}
                                        />
                                        <Input
                                            type='number'
                                            value={prize.coin}
                                            onChange={(e) => setPrizeData(index, 'coin', e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removePrizeRow(index)}
                                        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${data.prizes.length > 1 ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                                        disabled={data.prizes.length <= 1}
                                    >
                                        <MinusIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>{t('dashboard.createQuest.inputs.button.text')}</Button>
                        <Transition show={recentlySuccessful} enter="transition ease-in-out" enterFrom="opacity-0" leave="transition ease-in-out" leaveTo="opacity-0">
                            <p className="text-sm text-neutral-600">{t('dashboard.createQuest.inputs.save.text')}</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

const MinusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6"></path>
    </svg>
);
