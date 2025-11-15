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
                        <Label htmlFor="title">{t('dashboard.quest.inputs.title.label')}</Label>
                        <Input
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={(e) =>
                                setData('title', e.target.value)
                            }
                            placeholder={t('dashboard.quest.inputs.title.placeholder')}
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="title">{t('dashboard.quest.inputs.brief.label')}</Label>
                        <TextAreaInput
                            value={data.brief}
                            onChange={(e) =>
                                setData('brief', e.target.value)
                            }
                            placeholder={t('dashboard.quest.inputs.brief.placeholder')}
                        />
                        <InputError message={errors.brief} />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <SelectInput
                            id="tag"
                            name="tag"
                            label={t('dashboard.quest.inputs.category.label')}
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
                            label={t('dashboard.quest.inputs.series.label')}
                            options={seriesOptions}
                            value={data.quest_series_id}
                            onChange={(value) =>
                                setData('quest_series_id', value as string)
                            }
                            className='w-full max-w-auto'
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="title">{t('dashboard.quest.inputs.entryCoin.label')}</Label>
                        <Input
                            type='number'
                            id="start"
                            name="start"
                            value={data.entry_coin}
                            onChange={(e) => {
                                setData("entry_coin", e.target.value)
                            }
                            }
                            placeholder={t('dashboard.quest.inputs.entryCoin.placeholder')}
                        />
                        <InputError message={errors.entry_coin} />
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className="grid gap-2">
                            <Label htmlFor="title">{t('dashboard.quest.inputs.level_requirement.label')}</Label>
                            <Input
                                id="level_require"
                                name="level_require"
                                value={data.level_requirement}
                                onChange={(e) => {
                                    setData("level_requirement", e.target.value)
                                }
                                }
                                placeholder={t('dashboard.quest.inputs.level_requirement.placeholder')}
                            />
                            <InputError message={errors.level_requirement} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">{t('dashboard.quest.inputs.categories_requirement.label')}</Label>
                            <Input
                                id="categories_require"
                                name="categories_require"
                                value={data.categories_requirement}
                                onChange={(e) => {
                                    setData("categories_requirement", e.target.value)
                                }
                                }
                                placeholder={t('dashboard.quest.inputs.categories_requirement.placeholder')}
                            />
                            <InputError message={errors.categories_requirement} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">{t('dashboard.quest.inputs.copyright_requirement.label')}</Label>
                            <Input
                                id="copyright_require"
                                name="copyright_require"
                                value={data.copyright_requirement}
                                onChange={(e) => {
                                    setData("copyright_requirement", e.target.value)
                                }
                                }
                                placeholder={t('dashboard.quest.inputs.copyright_requirement.placeholder')}
                            />
                            <InputError message={errors.copyright_requirement} />
                        </div>
                    </div>

                    {/* Start Date & End Date Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Start Date */}
                        <div className="grid gap-2">
                            <Label htmlFor="startDate">{t('dashboard.quest.inputs.startDate.label')}</Label>
                            <DateInput
                                min={new Date().toISOString().slice(0, 10)}
                                value={data.startDate}
                                onChange={(value) =>
                                    setData('startDate', value)
                                } />
                            <InputError message={errors.startDate} />
                        </div>

                        {/* End Date */}
                        <div className="grid gap-2">
                            <Label htmlFor="endDate">{t('dashboard.quest.inputs.endDate.label')}</Label>
                            <DateInput
                                min={data.startDate}
                                value={data.endDate}
                                onChange={(value) =>
                                    setData('endDate', value)
                                } />
                            <InputError message={errors.endDate} />
                        </div>
                    </div>
                    <PrizesInput prizes={data.prizes} setPrizes={(value) => setData('prizes', value)} />

                    {/* Submit Button */}
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>  {t('dashboard.quest.button.createButton')}</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">{t('dashboard.quest.button.saveText')}</p>
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
