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
    title: string;
    brief: string;
    category_id: string;
    startDate: string;
    endDate: string;
    prizes: Prize[];
    image: File | null | string;
}


export default function Dashboard() {
    const { categories }: { categories: { id: number, name: string }[] } = usePage<any>().props;
    const { t } = useLocales();

    const { data, setData, post, processing, errors, recentlySuccessful, reset } =
        useForm<Quest>({
            title: '',
            brief: '',
            category_id: '',
            startDate: '',
            endDate: '',
            prizes: [{ min: "", max: "", coin: "", title: "" }],
            image: null,
        });


    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const addPrizeRow = () => {
        // setPrizes([...prizes, { min: '', max: '', coin: 0, title: "" }]);
        setData('prizes', [...data.prizes, { min: "", max: "", coin: "", title: "" }]);
    };

    const removePrizeRow = (index: number) => {
        // Don't remove the last row
        if (data.prizes.length <= 1) return;
        const newPrizes = data.prizes.filter((_, i) => i !== index);
        setData('prizes', newPrizes);
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!data.title) newErrors.title = "Title is required";
        if (!data.brief) newErrors.brief = "Brief is required";
        if (!data.category_id) newErrors.category_id = "Category is required";
        if (!data.startDate) newErrors.startDate = "Start date is required";
        if (!data.endDate) newErrors.endDate = "End date is required";

        data.prizes.forEach((prize, index) => {
            if (prize.min === '' || Number(prize.min) < 0)
                newErrors[`prizes.${index}.min`] = "Min must be >= 0";
            if (prize.max === '' || Number(prize.max) < Number(prize.min))
                newErrors[`prizes.${index}.max`] = "Max must be >= Min";
            if (prize.coin === '' || Number(prize.coin) < 0)
                newErrors[`prizes.${index}.coin`] = "Coin must be >= 0";
            if (!prize.title)
                newErrors[`prizes.${index}.title`] = "Title is required";
        });

        return newErrors;
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data)
        // const clientErrors = validateForm();

        // if (Object.keys(clientErrors).length > 0) {
        //     // Show errors in the frontend
        //     console.log(clientErrors);
        //     // Optionally set them in your state to display
        //     return;
        // }

        post(route('user-dashboard.quest.store'), {
            onSuccess: () => reset(),
            onError: (errors) => console.log(errors),
        });
    };


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t("dashboard.profile.heading"),
            href: dashboard().url,
        },
    ];

    const setPrizeData = (
        index: number,
        field: keyof Prize,
        value: string | number
    ) => {
        const newPrizes: Prize[] = [...data.prizes];
        newPrizes[index][field] = value as any;

        setData('prizes', newPrizes);
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />
            <div className='px-4 py-6'>
                <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl" encType="multipart/form-data">
                    <ImageInput
                        image={data.image}
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
                            onChange={(e) =>
                                setData('title', e.target.value)
                            }
                            placeholder={t('dashboard.createQuest.inputs.title.placeholder')}
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="title">{t('dashboard.createQuest.inputs.brief.label')}</Label>
                        <TextAreaInput
                            value={data.brief}
                            onChange={(e) =>
                                setData('brief', e.target.value)
                            }
                            placeholder={t('dashboard.createQuest.inputs.brief.placeholder')}
                        />
                        <InputError message={errors.brief} />
                    </div>
                    <SelectInput
                        id="tag"
                        name="tag"
                        label={t('dashboard.createQuest.inputs.category.label')}
                        options={categoryOptions}
                        value={data.category_id}
                        onChange={(value) =>
                            setData('category_id', value as string)
                        }
                        className='w-full max-w-auto'
                    />

                    {/* Start Date & End Date Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Start Date */}
                        <div className="grid gap-2">
                            <Label htmlFor="startDate">{t('dashboard.createQuest.inputs.startDate.label')}</Label>
                            <DateInput
                            value={data.startDate}
                                onChange={(value) =>
                                    setData('startDate', value)
                                } />
                            <InputError message={errors.startDate} />
                        </div>

                        {/* End Date */}
                        <div className="grid gap-2">
                            <Label htmlFor="endDate">{t('dashboard.createQuest.inputs.endDate.label')}</Label>
                            <DateInput
                                value={data.endDate}
                                onChange={(value) =>
                                    setData('endDate', value)
                                } />
                            <InputError message={errors.endDate} />
                        </div>
                    </div>

                    {/* --- Prizes Section --- */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-lg font-medium text-white">{t('dashboard.createQuest.inputs.multiplePrizes.title')}</label>
                            <Button disabled={processing} onClick={addPrizeRow}>  + {t('dashboard.createQuest.inputs.multiplePrizes.addPrize.text')}</Button>
                        </div>

                        {/* Labels for Prize Rows */}
                        <div className="flex items-center gap-2 md:gap-4 mb-2">
                            <div className="grid grid-cols-[1fr_130px_130px_130px] gap-2 md:gap-4 w-full">
                                <span className="flex-1 text-sm font-medium "><Label htmlFor="startDate">{t('dashboard.createQuest.inputs.multiplePrizes.titleInput.label')}</Label></span>
                                <span className="flex-1 text-sm font-medium "><Label htmlFor="startDate">{t('dashboard.createQuest.inputs.multiplePrizes.start.label')}</Label></span>
                                <span className="flex-1 text-sm font-medium "><Label htmlFor="endDate">{t('dashboard.createQuest.inputs.multiplePrizes.end.label')}</Label></span>
                                <span className="flex-1 text-sm font-medium "><Label htmlFor="amount">{t('dashboard.createQuest.inputs.multiplePrizes.amount.label')}</Label></span>
                            </div>
                            <span className="w-8"></span>
                        </div>

                        {/* Dynamic Prize Rows Container */}
                        <div className="space-y-4">
                            {data?.prizes.map((prize, index) => (
                                <div key={index} className="flex items-center gap-2 md:gap-4">
                                    <div className="grid grid-cols-[1fr_130px_130px_130px] items-center gap-2 md:gap-4 w-full">
                                        <Input
                                            id="title"
                                            name="title"
                                            value={prize.title}
                                            onChange={(e) =>
                                                setPrizeData(index, 'title', e.target.value)
                                            }
                                            placeholder={t('dashboard.createQuest.inputs.multiplePrizes.titleInput.placeholder')}
                                        />
                                        <Input
                                            type='number'
                                            id="start"
                                            name="start"
                                            value={prize.min}
                                            onChange={(e) => {
                                                setPrizeData(index, 'min', e.target.value)
                                                setPrizeData(index, 'max', e.target.value)
                                            }
                                            }
                                            placeholder={t('dashboard.createQuest.inputs.multiplePrizes.start.placeholder')}
                                        />
                                        <Input

                                            type='number'
                                            id="end"
                                            name="end"
                                            value={prize.max}
                                            onChange={(e) =>
                                                setPrizeData(index, 'max', e.target.value)
                                            }
                                            placeholder={t('dashboard.createQuest.inputs.multiplePrizes.end.placeholder')}
                                        />
                                        <Input
                                            type='number'
                                            id="amount"
                                            name="amount"
                                            value={prize.coin}
                                            onChange={(e) =>
                                                setPrizeData(index, 'coin', e.target.value)
                                            }
                                            placeholder={t('dashboard.createQuest.inputs.multiplePrizes.amount.placeholder')}

                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removePrizeRow(index)}
                                        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${data?.prizes.length > 1 ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                                        aria-label="Remove prize row"
                                        disabled={data?.prizes.length <= 1}
                                    >
                                        <MinusIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>  {t('dashboard.createQuest.inputs.button.text')}</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">{t('dashboard.createQuest.inputs.save.text')}</p>
                        </Transition>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}

// Minus Icon
const MinusIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6"></path>
    </svg>
);
