import InputError from '@/components/input-error';
import SaveAndBackButtons from '@/components/save-and-back-buttons';
import DateInput from '@/components/shared/inputs/date-input';
import ImageInput from '@/components/shared/inputs/image-input';
import SelectInput from '@/components/shared/inputs/select-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import TextInput from '@/components/shared/inputs/text-input';
import { Label } from '@/components/ui/label';
import PrizesInput from '@/components/user-dashboard/quest/prize-input/prizes-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
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
    title_en: string;
    brief_en: string;
    title_ar: string;
    brief_ar: string;
    category_id: string;
    quest_type_id: string;
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
}

export default function Dashboard() {
    const {
        categories,
        series,
        types,
        rank_tiers,
        prizePools
    }: { categories: { id: number; name: string }[] } = usePage<any>().props;
    const { t } = useLocales();

    const prizePoolsOptions = prizePools.map((prizePool) => ({
        value: prizePool.id,
        label: prizePool.name,
    }));
    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm<Quest>({
        title_en: '',
        brief_en: '',
        title_ar: '',
        brief_ar: '',
        category_id: '',
        quest_type_id: '',
        startDate: '',
        endDate: '',
        prizes: [],
        image: null,
        entry_coin: '',
        level_requirement_en: '',
        categories_requirement_en: '',
        copyright_requirement_en: '',
        level_requirement_ar: '',
        categories_requirement_ar: '',
        copyright_requirement_ar: '',
        quest_series_id: '',
        rank_tier: 'all',
    });

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const seriesOptions = series.map((series) => ({
        value: series.id,
        label: series.title_en,
    }));

    const typesOptions = types.map((types) => ({
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
        post(route('user-dashboard.quest.store'), {
            onSuccess: () => reset(),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Create Contest',
            href: dashboard().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />
            <div className="px-4 py-6">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-6xl space-y-6"
                    encType="multipart/form-data"
                >
                    <ImageInput
                        label={t('dashboard.quest.inputs.image.label')}
                        required
                        image={data.image}
                        setImage={(value) => setData('image', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
                    />
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
                            label={t('dashboard.quest.inputs.type.label')}
                            options={typesOptions}
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
                    <TextInput
                        id="entry_coin"
                        type="number"
                        value={data.entry_coin}
                        setValue={(value) => setData('entry_coin', value)}
                        label={t('dashboard.quest.inputs.entryCoin.label')}
                        placeholder={t(
                            'dashboard.quest.inputs.entryCoin.placeholder',
                        )}
                        error={errors.entry_coin}
                        required={true}
                    />
                    <div className="grid grid-cols-3 gap-4">
                        <TextInput
                            id="copyright_requirement_en"
                            value={data.copyright_requirement_en}
                            setValue={(value) =>
                                setData('copyright_requirement_en', value)
                            }
                            label={t(
                                'dashboard.quest.inputs.copyright_requirement.label',
                            )}
                            placeholder={t(
                                'dashboard.quest.inputs.copyright_requirement.placeholder',
                            )}
                            error={errors.copyright_requirement_en}
                            required={true}
                        />
                        <TextInput
                            id="level_requirement_en"
                            value={data.level_requirement_en}
                            setValue={(value) =>
                                setData('level_requirement_en', value)
                            }
                            label={t(
                                'dashboard.quest.inputs.level_requirement.label',
                            )}
                            placeholder={t(
                                'dashboard.quest.inputs.level_requirement.placeholder',
                            )}
                            error={errors.level_requirement_en}
                            required={true}
                        />
                        <TextInput
                            id="categories_requirement_en"
                            value={data.categories_requirement_en}
                            setValue={(value) =>
                                setData('categories_requirement_en', value)
                            }
                            label={t(
                                'dashboard.quest.inputs.categories_requirement.label',
                            )}
                            placeholder={t(
                                'dashboard.quest.inputs.categories_requirement.placeholder',
                            )}
                            error={errors.categories_requirement_en}
                            required={true}
                        />
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

                    {/* Start Date & End Date Row */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Start Date */}
                        <div className="grid gap-2">
                            <Label htmlFor="startDate">
                                {t('dashboard.quest.inputs.startDate.label')}
                            </Label>
                            <DateInput
                                min={new Date().toISOString().slice(0, 10)}
                                value={data.startDate}
                                onChange={(value) =>
                                    setData('startDate', value)
                                }
                            />
                            <InputError message={errors.startDate} />
                        </div>

                        {/* End Date */}
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
                        prizePools={prizePoolsOptions}
                    />
                    <SaveAndBackButtons
                        processing={processing}
                        href={'/admin/contest'}
                    />
                </form>
            </div>
        </AppLayout>
    );
}
