import InputError from '@/components/input-error';
import DateInput from '@/components/shared/inputs/date-input';
import ImageInput from '@/components/shared/inputs/image-input';
import SelectInput from '@/components/shared/inputs/select-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import TextInput from '@/components/shared/inputs/text-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PrizesInput from '@/components/user-dashboard/quest/create-quest/prizes-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface Prize {
    min: number | string;
    max: number | string;
    coin: number | string;
    title: string;
}

interface Quest {
    id: number;
    title_en: string;
    brief_en: string;
    title_ar: string;
    brief_ar: string;
    category_id: string;
    startDate: string;
    endDate: string;
    prizes: Prize[];
    image: File | null | string;
    entry_coin: string;
    level_requirement_en: string;
    categories_requirement_en: string;
    copyright_requirement_en: string;
    level_requirement_ar: string;
    categories_requirement_ar: string;
    copyright_requirement_ar: string;
    quest_series_id: string;
    quest_type_id: string;
    rank_tier: string;
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
    const {
        quest,
        categories,
        series,
        types,
        rank_tiers,
    }: {
        quest: Quest;
        categories: { id: number; name: string }[];
        series: { id: number; title_en: string }[];
        types: { id: number; name: string }[];
    } = usePage().props;

    const { t } = useLocales();

    const {
        data,
        setData,
        put,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm<Quest>({
        id: quest.id,
        title_en: quest.title_en,
        brief_en: quest.brief_en,
        title_ar: quest.title_ar,
        brief_ar: quest.brief_ar,
        category_id: quest.category_id.toString(),
        startDate: formatDate(quest.startDate),
        endDate: formatDate(quest.endDate),
        prizes: quest.prizes?.map((prize, i) => ({
            ...prize,
            prizeId: i,
        })),
        image: quest.image || null,
        entry_coin: quest.entry_coin,
        level_requirement_en: quest.level_requirement_en,
        categories_requirement_en: quest.categories_requirement_en,
        copyright_requirement_en: quest.copyright_requirement_en,
        level_requirement_ar: quest.level_requirement_ar,
        categories_requirement_ar: quest.categories_requirement_ar,
        copyright_requirement_ar: quest.copyright_requirement_ar,
        quest_series_id: quest.quest_series_id,
        quest_type_id: quest.quest_type_id,
        rank_tier: (quest as any).rank_tier || 'all',
    });

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const seriesOptions = series.map((series) => ({
        value: series.id,
        label: series.title_en,
    }));

    const questTypeOptions = types.map((types) => ({
        value: types.id,
        label: types.name,
    }));

    const rankTierOptions = rank_tiers.map((tier: any) => ({
        value: tier.tier,
        label: tier.tier,
    }));

    rankTierOptions.unshift({
        value: 'all',
        label: 'All',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create FormData object (required for file upload)
        const formData = new FormData();

        // Laravel expects a PUT, but browsers only support POST in multipart/form-data
        // So we spoof the method:
        formData.append('_method', 'PUT');

        // Append all quest fields
        formData.append('title_en', data.title_en);
        formData.append('brief_en', data.brief_en);
        formData.append('title_ar', data.title_ar);
        formData.append('brief_ar', data.brief_ar);
        formData.append('category_id', data.category_id);
        formData.append('startDate', data.startDate);
        formData.append('endDate', data.endDate);
        formData.append('entry_coin', data.entry_coin);
        formData.append(
            'level_requirement_en',
            data.level_requirement_en || '',
        );
        formData.append(
            'categories_requirement_en',
            data.categories_requirement_en || '',
        );
        formData.append(
            'copyright_requirement_en',
            data.copyright_requirement_en || '',
        );

        formData.append(
            'level_requirement_ar',
            data.level_requirement_ar || '',
        );
        formData.append(
            'categories_requirement_ar',
            data.categories_requirement_ar || '',
        );
        formData.append(
            'copyright_requirement_ar',
            data.copyright_requirement_ar || '',
        );

        formData.append('quest_series_id', data.quest_series_id);
        formData.append('quest_type_id', data.quest_type_id);
        // Append prizes (array of objects)
        data.prizes.forEach((prize, index) => {
            if ('id' in prize && prize.id) {
                formData.append(`prizes[${index}][id]`, (prize as any).id);
            }
            formData.append(`prizes[${index}][min]`, prize.min.toString());
            formData.append(`prizes[${index}][max]`, prize.max.toString());
            formData.append(`prizes[${index}][coin]`, prize.coin.toString());
            formData.append(`prizes[${index}][title]`, prize.title);
            formData.append('rank_tier', data.rank_tier || '');
            if ('coinType' in prize) {
                formData.append(
                    `prizes[${index}][coinType]`,
                    (prize as any).coinType || '',
                );
            }
        });

        // Append image — only if a new file is selected
        if (data.image instanceof File) {
            formData.append('image', data.image);
        } else if (typeof data.image === 'string') {
            // Keep the same image path if not updated
            formData.append('image', data.image);
        }

        // Send FormData to Laravel via Inertia
        router.post(route('user-dashboard.quest.update', data.id), formData, {
            forceFormData: true, // ensures multipart/form-data encoding
            preserveScroll: true, // keeps scroll position after submit
            onSuccess: () => {
                // console.log('Quest updated successfully');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Edit Contest', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.editQuest.heading')} />
            <div className="px-4 py-6">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-4xl space-y-6"
                    encType="multipart/form-data"
                >
                    <ImageInput
                        image={
                            typeof data.image === 'string'
                                ? '/storage/' + data.image
                                : data.image
                        }
                        setImage={(value) => setData('image', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
                    />

                    {/* Title */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className='space-y-6'>
                            <TextInput
                                id="title_en"
                                value={data.title_en}
                                setValue={(value) => setData('title_en', value)}
                                label={t('dashboard.quest.inputs.title.label')}
                                placeholder={t(
                                    'dashboard.quest.inputs.title.placeholder',
                                )}
                                error={errors.title_en}
                                required={true}
                            />
                            <TextAreaInput
                                id="brief_en"
                                value={data.brief_en}
                                onChange={(e) =>
                                    setData('brief_en', e.target.value)
                                }
                                label={t('dashboard.quest.inputs.brief.label')}
                                placeholder={t(
                                    'dashboard.quest.inputs.brief.placeholder',
                                )}
                                error={errors.brief_en}
                                required={true}
                            />
                        </div>
                        <div className='space-y-6'>
                            <TextInput
                                id="title_ar"
                                value={data.title_ar}
                                setValue={(value) => setData('title_ar', value)}
                                label="ملخص"
                                placeholder="ملخص"
                                error={errors.title_ar}
                                required={true}
                                dir="rtl"
                            />
                            <TextAreaInput
                                id="brief_ar"
                                value={data.brief_ar}
                                onChange={(e) =>
                                    setData('brief_ar', e.target.value)
                                }
                                label="وصف"
                                placeholder="وصف"
                                dir="rtl"
                                error={errors.brief_ar}
                                required={true}
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <SelectInput
                            id="tag"
                            name="tag"
                            label={t('dashboard.quest.inputs.category.label')}
                            options={categoryOptions}
                            value={data.category_id}
                            onChange={(value) =>
                                setData('category_id', value as string)
                            }
                            className="max-w-auto w-full"
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
                            className="max-w-auto w-full"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <SelectInput
                            id="quest_type_id"
                            name="quest_type_id"
                            label={t('dashboard.quest.inputs.questType.label')}
                            options={questTypeOptions}
                            value={data.quest_type_id}
                            onChange={(value) =>
                                setData('quest_type_id', value as string)
                            }
                            className="max-w-auto w-full"
                        />
                        <SelectInput
                            id="rank_tier"
                            name="rank_tier"
                            label={t('dashboard.quest.inputs.rank_tier.label')}
                            options={rankTierOptions}
                            value={data.rank_tier}
                            onChange={(value) =>
                                setData('rank_tier', value as string)
                            }
                            className="max-w-auto w-full"
                            hasOption={false}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="title">
                            {t('dashboard.quest.inputs.entryCoin.label')}
                        </Label>
                        <Input
                            type="number"
                            id="start"
                            name="start"
                            value={data.entry_coin}
                            onChange={(e) => {
                                setData('entry_coin', e.target.value);
                            }}
                            placeholder={t(
                                'dashboard.quest.inputs.entryCoin.placeholder',
                            )}
                        />
                        <InputError message={errors.entry_coin} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">
                                {t(
                                    'dashboard.quest.inputs.level_requirement.label',
                                )}
                            </Label>
                            <Input
                                id="level_requirement_en"
                                name="level_requirement_en"
                                value={data.level_requirement_en}
                                onChange={(e) => {
                                    setData(
                                        'level_requirement_en',
                                        e.target.value,
                                    );
                                }}
                                placeholder={t(
                                    'dashboard.quest.inputs.level_requirement.placeholder',
                                )}
                            />
                            <InputError message={errors.level_requirement_en} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">
                                {t(
                                    'dashboard.quest.inputs.categories_requirement.label',
                                )}
                            </Label>
                            <Input
                                id="categories_requirement_en"
                                name="categories_requirement_en"
                                value={data.categories_requirement_en}
                                onChange={(e) => {
                                    setData(
                                        'categories_requirement_en',
                                        e.target.value,
                                    );
                                }}
                                placeholder={t(
                                    'dashboard.quest.inputs.categories_requirement.placeholder',
                                )}
                            />
                            <InputError
                                message={errors.categories_requirement_en}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">
                                {t(
                                    'dashboard.quest.inputs.copyright_requirement.label',
                                )}
                            </Label>
                            <Input
                                id="copyright_requirement_en"
                                name="copyright_requirement_en"
                                value={data.copyright_requirement_en}
                                onChange={(e) => {
                                    setData(
                                        'copyright_requirement_en',
                                        e.target.value,
                                    );
                                }}
                                placeholder={t(
                                    'dashboard.quest.inputs.copyright_requirement.placeholder',
                                )}
                            />
                            <InputError
                                message={errors.copyright_requirement_en}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <TextInput
                            id="copyright_requirement_ar"
                            value={data.copyright_requirement_ar}
                            setValue={(value) =>
                                setData('copyright_requirement_ar', value)
                            }
                            label="متطلبات حقوق النشر"
                            placeholder="أدخل متطلبات حقوق النشر"
                            error={errors.copyright_requirement_ar}
                            dir="rtl"
                            required={true}
                        />
                        <TextInput
                            id="level_requirement_ar"
                            value={data.level_requirement_ar}
                            setValue={(value) =>
                                setData('level_requirement_ar', value)
                            }
                            label="متطلبات المستوى"
                            placeholder="أدخل متطلبات المستوى"
                            error={errors.level_requirement_ar}
                            required={true}
                            dir="rtl"
                        />
                        <TextInput
                            id="categories_requirement_ar"
                            value={data.categories_requirement_ar}
                            setValue={(value) =>
                                setData('categories_requirement_ar', value)
                            }
                            label="متطلبات الفئات"
                            placeholder="أدخل متطلبات الفئات"
                            error={errors.categories_requirement_ar}
                            dir="rtl"
                            required={true}
                        />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="startDate">
                                {t('dashboard.quest.inputs.startDate.label')}
                            </Label>
                            <DateInput
                                disabled={new Date(new Date().toISOString().slice(0, 10)) > new Date(data.startDate)}
                                min={new Date().toISOString().slice(0, 10)}
                                value={data.startDate}
                                onChange={(value) =>
                                    setData('startDate', value)
                                }
                            />
                            <InputError message={errors.startDate} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="endDate">
                                {t('dashboard.quest.inputs.endDate.label')}
                            </Label>
                            <DateInput
                                min={data.startDate}
                                value={data.endDate}
                                onChange={(value) => setData('endDate', value)}
                            />
                            <InputError message={errors.endDate} />
                        </div>
                    </div>
                    <PrizesInput
                        prizes={data.prizes}
                        setPrizes={(value) => setData('prizes', value)}
                    />

                    {/* Submit */}
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>
                            {t('dashboard.shared.update')}
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">
                                {t('dashboard.shared.update')}
                            </p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
