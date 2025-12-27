import InputError from '@/components/input-error';
import SaveAndBackButtons from '@/components/save-and-back-buttons';
import DateInput from '@/components/shared/inputs/date-input';
import ImageInput from '@/components/shared/inputs/image-input';
import MultiSelectInput from '@/components/shared/inputs/multi-select-input';
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
    vote_rights: string;
    status?: string;
    manual_override?: string;
    judges?: number[];
    lead_judge?: number | '';
    winner_declaration: string;
    manual_override_end_date?: string;
}

export default function Dashboard() {
    const {
        categories,
        series,
        types,
        judges,
        prizePools,
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
        vote_rights: 'Public',
        manual_override: 'None',
        judges: [],
        lead_judge: '',
        winner_declaration: 'auto',
        manual_override_end_date: '',
        status: 'Scheduled',
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

    const judgesOptions = judges.map((judge) => ({
        value: judge.id,
        label: judge.name,
    }));

    const manualOverrideOptions = [{ value: 'None', label: 'None' }];

    const winnerDeclarationOptions = [
        { value: 'auto', label: 'Auto (System Calculated)' },
        { value: 'admin', label: 'Manual (Admin Only)' },
        { value: 'judges', label: 'Manual (Lead Judge Decides)' },
    ];

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
                        error={errors.image}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-6">
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
                        <div className="space-y-6">
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
                    </div>

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

                    <div className="grid grid-cols-1 gap-4">
                        <SelectInput
                            id="manual_override"
                            name="manual_override"
                            label={t(
                                'dashboard.quest.inputs.manual_override.label',
                            )}
                            options={manualOverrideOptions}
                            value={data.manual_override}
                            onChange={(value) =>
                                setData('manual_override', value as string)
                            }
                            className="max-w-auto w-full"
                            hasOption={false}
                        />
                    </div>

                    {/* --- JUDGING SECTION --- */}
                    <div className="space-y-6 rounded-lg border bg-gray-50 p-6">
                        <h3 className="mb-4 border-b pb-2 text-lg font-medium text-gray-800">
                            Judging & Winner Rules
                        </h3>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* 1. Vote Rights */}
                            <SelectInput
                                id="vote_rights"
                                label="Voting Type"
                                options={[
                                    {
                                        value: 'Public',
                                        label: 'Public Voting Only',
                                    },
                                    { value: 'Judges', label: 'Judges Only' },
                                    {
                                        value: 'Hybrid',
                                        label: 'Hybrid (Public + Judges)',
                                    },
                                ]}
                                value={data.vote_rights}
                                onChange={(val) =>
                                    setData('vote_rights', val as string)
                                }
                                hasOption={false}
                                error={errors.vote_rights}
                                className="max-w-auto w-full"
                            />

                            {/* 2. Winner Declaration (Hidden if Public) */}
                            {data.vote_rights !== 'Public' && (
                                <SelectInput
                                    id="winner_declaration"
                                    label="Winner Declaration Mode"
                                    options={winnerDeclarationOptions}
                                    value={data.winner_declaration}
                                    onChange={(val) => {
                                        setData((prevData) => ({
                                            ...prevData,
                                            winner_declaration: val as string,

                                            judges: [],
                                            lead_judge: '',
                                        }));
                                    }}
                                    hasOption={false}
                                    error={errors.winner_declaration}
                                    className="max-w-auto w-full"
                                />
                            )}
                        </div>

                        {/* 3. Judge Assignment (Hidden if Public) */}
                        {data.winner_declaration === 'judges' && (
                            <div className="space-y-6">
                                <MultiSelectInput
                                    label="Assign Judge Panel"
                                    options={judgesOptions}
                                    value={data.judges}
                                    onChange={(val) => {
                                        const newJudges = val as number[];
                                        const currentLead = data.lead_judge;
                                        const newLead =
                                            currentLead &&
                                            newJudges.includes(
                                                Number(currentLead),
                                            )
                                                ? currentLead
                                                : '';

                                        setData((data) => ({
                                            ...data,
                                            judges: newJudges,
                                            lead_judge: newLead,
                                        }));
                                    }}
                                    className="max-w-auto w-full"
                                    required={true}
                                />

                                {/* 4. LEAD JUDGE SELECTOR */}

                                <div className="rounded-md border border-blue-200 bg-white p-4">
                                    <div className="mb-2 text-sm text-blue-800">
                                        <strong>Option Selected:</strong> You
                                        must assign a Lead Judge to finalize the
                                        winners.
                                    </div>
                                    <SelectInput
                                        id="lead_judge"
                                        label="Select Lead Judge"
                                        options={judgesOptions.filter((j) =>
                                            data.judges
                                                .map((id) => Number(id))
                                                .includes(Number(j.value)),
                                        )}
                                        value={data.lead_judge}
                                        onChange={(val) =>
                                            setData('lead_judge', val as number)
                                        }
                                        hasOption={false}
                                        error={errors.lead_judge}
                                        placeholder="-- Choose Lead Judge --"
                                        className="max-w-auto w-full"
                                        required={true}
                                    />
                                </div>
                            </div>
                        )}
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
