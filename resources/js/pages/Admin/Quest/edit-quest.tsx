import InputError from '@/components/input-error';
import DateInput from '@/components/shared/inputs/date-input';
import ImageInput from '@/components/shared/inputs/image-input';
import MultiSelectInput from '@/components/shared/inputs/multi-select-input';
import SelectInput from '@/components/shared/inputs/select-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import TextInput from '@/components/shared/inputs/text-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PrizesInput from '@/components/user-dashboard/quest/prize-input/prizes-input';
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
    vote_rights: string;
    status?: string;
    manual_override?: string;
    judges?: number[];
    lead_judge?: number | '';
    winner_declaration: string;
    manual_override_end_date?: string;
    reason?: string;
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
        prizePools,
        judges,
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
        manual_override: quest.manual_override,
        winner_declaration: quest.winner_declaration,
        manual_override_end_date: formatDate(quest.manual_override_end_date),
        vote_rights: quest.vote_rights,
        status: quest.status,
        lead_judge: quest.lead_judge,
        judges: quest.judges || [],
        reason: '',
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

    const prizePoolsOptions = prizePools.map((prizePool) => ({
        value: prizePool.id,
        label: prizePool.name,
    }));

    const manualOverrideOptions = [
        { value: 'None', label: 'None' },
        { value: 'Force_Open', label: 'Force Open' },
        { value: 'Force_Paused', label: 'Force Paused' },
        { value: 'Force_Closed', label: 'Force Closed' },
    ];

    const winnerDeclarationOptions = [
        { value: 'auto', label: 'Auto (System Calculated)' },
        { value: 'admin', label: 'Manual (Admin Only)' },
        { value: 'judges', label: 'Manual (Lead Judge Decides)' },
    ];

    const judgesOptions = judges.map((judge) => ({
        value: judge.id,
        label: judge.name,
    }));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
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
        formData.append('manual_override', data.manual_override || 'None');
        formData.append('winner_declaration', data.winner_declaration);
        if (data.reason) {
            formData.append('reason', data.reason);
        }
        formData.append(
            'manual_override_end_date',
            data.manual_override_end_date || '',
        );
        formData.append('vote_rights', data.vote_rights);

        if (Array.isArray(data.judges)) {
            data.judges.forEach((judgeId) => {
                formData.append('judges[]', judgeId.toString());
            });
        }

        // Append prizes (array of objects)
        data.prizes.forEach((prize, index) => {
            if ('id' in prize && prize.id) {
                formData.append(`prizes[${index}][id]`, (prize as any).id);
            }
            formData.append(`prizes[${index}][min]`, prize.min.toString());
            formData.append(`prizes[${index}][max]`, prize.max.toString());
            formData.append(`prizes[${index}][coin]`, prize.coin.toString());
            formData.append(`prizes[${index}][title]`, prize.title);
            formData.append(
                'prizes[' + index + '][prize_pool]',
                prize.prize_pool,
            );
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
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {},
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
                            label={t('dashboard.quest.inputs.type.label')}
                            options={questTypeOptions}
                            value={data.quest_type_id}
                            onChange={(value) =>
                                setData('quest_type_id', value as string)
                            }
                            className="max-w-auto w-full"
                        />
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
                                disabled={
                                    new Date(
                                        new Date().toISOString().slice(0, 10),
                                    ) > new Date(data.startDate)
                                }
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
                    {data.manual_override !== 'None' && (
                        <div className="space-y-6 rounded-lg border bg-gray-50 p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {data.manual_override === 'Force_Open' && (
                                    <div className="grid gap-2">
                                        <Label htmlFor="manual_override_end_date">
                                            Manual Override End Date{' '}
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </Label>
                                        <DateInput
                                            min={data.startDate}
                                            value={
                                                data.manual_override_end_date
                                            }
                                            onChange={(value) =>
                                                setData(
                                                    'manual_override_end_date',
                                                    value,
                                                )
                                            }
                                            required={true}
                                        />
                                        <InputError
                                            message={
                                                errors.manual_override_end_date
                                            }
                                        />
                                    </div>
                                )}
                                {data.manual_override !== 'None' && (
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="reason"
                                            className="text-red-600"
                                        ></Label>
                                        <TextInput
                                            id="reason"
                                            value={data.reason}
                                            setValue={(value) =>
                                                setData('reason', value)
                                            }
                                            label=" Reason for Status Change"
                                            placeholder="Why are you changing the status?"
                                            error={errors.reason}
                                            required={true}
                                        />
                                        <InputError message={errors.reason} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {/* --- JUDGING SECTION --- */}
                    <div className="space-y-6 rounded-lg border bg-gray-50 p-6">
                        <h3 className="mb-4 border-b pb-2 text-lg font-medium text-gray-800">
                            Judging & Winner Rules
                        </h3>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* 1. Vote Rights */}
                            <SelectInput
                                id="vote_rights"
                                label="Judging Type"
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
                                onChange={(val) => {
                                    setData((prevData) => ({
                                        ...prevData,
                                        vote_rights: val as string,

                                        judges: [],
                                        lead_judge: '',
                                        winner_declaration: 'auto',
                                    }));
                                }}
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
                                    onChange={(val) =>
                                        setData(
                                            'winner_declaration',
                                            val as string,
                                        )
                                    }
                                    hasOption={false}
                                    error={errors.winner_declaration}
                                    className="max-w-auto w-full"
                                />
                            )}
                        </div>

                        {/* 3. Judge Assignment (Hidden if Public) */}
                        {data.vote_rights !== 'Public' && (
                            <div className="space-y-6">
                                <MultiSelectInput
                                    id="judges"
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
                                />

                                {/* 4. LEAD JUDGE SELECTOR */}
                                {data.winner_declaration === 'judges' && (
                                    <div className="rounded-md border border-blue-200 bg-white p-4">
                                        <div className="mb-2 text-sm text-blue-800">
                                            <strong>Option Selected:</strong>{' '}
                                            You must assign a Lead Judge to
                                            finalize the winners.
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
                                                setData(
                                                    'lead_judge',
                                                    val as number,
                                                )
                                            }
                                            hasOption={false}
                                            error={errors.lead_judge}
                                            placeholder="-- Choose Lead Judge --"
                                            className="max-w-auto w-full"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <PrizesInput
                        prizePools={prizePoolsOptions}
                        prizes={data.prizes}
                        setPrizes={(value) => setData('prizes', value)}
                    />

                    {/* Submit */}
                    <div className="flex items-center justify-end gap-4">
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
