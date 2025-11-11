import InputError from '@/components/input-error';
import DateInput from '@/components/shared/inputs/date-input';
import ImageInput from '@/components/shared/inputs/image-input';
import SelectInput from '@/components/shared/inputs/select-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PrizesInput from '@/components/user-dashboard/quest/create-quest/prizes-input';
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
    minEditable: boolean;
    maxEditable: boolean;
    coinType: string;
}

interface Quest {
    title: string;
    brief: string;
    category_id: string;
    startDate: string;
    endDate: string;
    prizes: Prize[];
    image: File | null | string;
    entry_coin: string;
    level_requirement: string;
    categories_requirement: string;
    copyright_requirement: string;
    quest_series_id: string;
}


export default function Dashboard() {
    const { categories, series }: { categories: { id: number, name: string }[] } = usePage<any>().props;
    const { t } = useLocales();

    const { data, setData, post, processing, errors, recentlySuccessful, reset } =
        useForm<Quest>({
            title: '',
            brief: '',
            category_id: '',
            startDate: '',
            endDate: '',
            prizes: [],
            image: null,
            entry_coin: "",
            level_requirement: "",
            categories_requirement: "",
            copyright_requirement: "",
            quest_series_id: "",
        });


    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const seriesOptions = series.map((series) => ({
        value: series.id,
        label: series.title,
    }));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl" encType="multipart/form-data">
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
                    <div className='grid grid-cols-2 gap-4'>
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
                        <SelectInput
                            id="series"
                            name="series"
                            label={t('dashboard.createQuest.inputs.series.label')}
                            options={seriesOptions}
                            value={data.quest_series_id}
                            onChange={(value) =>
                                setData('quest_series_id', value as string)
                            }
                            className='w-full max-w-auto'
                        />
                    </div>

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
                    <div className='grid grid-cols-3 gap-4'>
                        <div className="grid gap-2">
                            <Label htmlFor="title">{t('dashboard.createQuest.inputs.level_requirement.label')}</Label>
                            <Input
                                id="level_require"
                                name="level_require"
                                value={data.level_requirement}
                                onChange={(e) => {
                                    setData("level_requirement", e.target.value)
                                }
                                }
                                placeholder={t('dashboard.createQuest.inputs.level_requirement.placeholder')}
                            />
                            <InputError message={errors.level_requirement} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">{t('dashboard.createQuest.inputs.categories_requirement.label')}</Label>
                            <Input
                                id="categories_require"
                                name="categories_require"
                                value={data.categories_requirement}
                                onChange={(e) => {
                                    setData("categories_requirement", e.target.value)
                                }
                                }
                                placeholder={t('dashboard.createQuest.inputs.categories_requirement.placeholder')}
                            />
                            <InputError message={errors.categories_requirement} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">{t('dashboard.createQuest.inputs.copyright_requirement.label')}</Label>
                            <Input
                                id="copyright_require"
                                name="copyright_require"
                                value={data.copyright_requirement}
                                onChange={(e) => {
                                    setData("copyright_requirement", e.target.value)
                                }
                                }
                                placeholder={t('dashboard.createQuest.inputs.copyright_requirement.placeholder')}
                            />
                            <InputError message={errors.copyright_requirement} />
                        </div>
                    </div>

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
                    {/* <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-lg font-medium text-white">{t('dashboard.createQuest.inputs.multiplePrizes.title')}</label>
                            <Button disabled={processing} onClick={addPrizeRow} type='button'>  + {t('dashboard.createQuest.inputs.multiplePrizes.buttons.addSinglePrize')}</Button>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4 mb-2">
                            <div className="grid grid-cols-[1fr_100px_100px_120px_100px_100px] gap-2 md:gap-4 w-full">
                                <span className="flex-1 text-sm font-medium "><Label htmlFor="startDate">{t('dashboard.createQuest.inputs.multiplePrizes.titleInput.label')}</Label></span>
                                <span className="flex-1 text-sm font-medium "><Label htmlFor="startDate">{t('dashboard.createQuest.inputs.multiplePrizes.start.label')}</Label></span>
                                <span className="flex-1 text-sm font-medium "><Label htmlFor="endDate">{t('dashboard.createQuest.inputs.multiplePrizes.end.label')}</Label></span>
                                <span className="flex-1 text-sm font-medium "><Label htmlFor="endDate">{t('dashboard.createQuest.inputs.multiplePrizes.numOfPrizes.label')}</Label></span>
                                <span className="flex-1 text-sm font-medium "><Label htmlFor="amount">{t('dashboard.createQuest.inputs.multiplePrizes.amount.label')}</Label></span>
                            </div>
                            <span className="w-8"></span>
                        </div>

                        <div className="space-y-4">
                            {data?.prizes.map((prize, index) => (
                                <div key={index} className="flex items-center gap-2 md:gap-4">
                                    <div className="grid grid-cols-[1fr_100px_100px_120px_100px_100px] items-center gap-2 md:gap-4 w-full">
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
                                            placeholder={t('dashboard.createQuest.inputs.multiplePrizes.start.placeholder')}
                                        />
                                        <Input
                                            type='number'
                                            id="end"
                                            name="end"
                                            value={prize.max}
                                            onChange={(e) => {
                                                if (prize.maxEditable) {
                                                    setPrizeData(index, 'title', `${Number(prize.max)-Number(prize.min) + 1}`)
                                                    setPrizeData(index, 'max', e.target.value)
                                                }
                                            }
                                            }
                                            placeholder={t('dashboard.createQuest.inputs.multiplePrizes.end.placeholder')}
                                        />
                                        <Input
                                            type='number'
                                            id="amount"
                                            name="amount"
                                            value={Number(prize?.max) - Number(prize?.min) + 1}
                                            placeholder={t('dashboard.createQuest.inputs.multiplePrizes.amount.placeholder')}

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

                                    {
                                        (data?.prizes?.length <= (index + 1)) && (data?.prizes?.length > 5) ? (
                                            <button
                                                type="button"
                                                onClick={() => removePrizeRow(index)}
                                                className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${data?.prizes.length > 1 ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                                                aria-label="Remove prize row"
                                                disabled={data?.prizes.length <= 1}
                                            >
                                                <MinusIcon />
                                            </button>
                                        ) : (
                                            <span className='w-8 h-8'></span>
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    </div> */}
                    <PrizesInput prizes={data.prizes} setPrizes={(value) => setData('prizes', value)} />

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
