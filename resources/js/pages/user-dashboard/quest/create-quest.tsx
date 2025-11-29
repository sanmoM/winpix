// import InputError from '@/components/input-error';
// import DateInput from '@/components/shared/inputs/date-input';
// import ImageInput from '@/components/shared/inputs/image-input';
// import SelectInput from '@/components/shared/inputs/select-input';
// import TextAreaInput from '@/components/shared/inputs/text-area-input';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import PrizesInput from '@/components/user-dashboard/quest/create-quest/prizes-input';
// import useLocales from '@/hooks/useLocales';
// import AppLayout from '@/layouts/app-layout';
// import { dashboard } from '@/routes';
// import { type BreadcrumbItem } from '@/types';
// import { Transition } from '@headlessui/react';
// import { Head, useForm, usePage } from '@inertiajs/react';
// import { route } from 'ziggy-js';

// interface Prize {
//     min: number | string;
//     max: number | string;
//     coin: number | string;
//     title: string;
//     minEditable: boolean;
//     maxEditable: boolean;
//     coinType: string;
// }

// interface Quest {
//     title: string;
//     brief: string;
//     category_id: string;
//     startDate: string;
//     endDate: string;
//     prizes: Prize[];
//     image: File | null | string;
//     entry_coin: string;
//     level_requirement: string;
//     categories_requirement: string;
//     copyright_requirement: string;
//     quest_series_id: string;
//     quest_type_id: string;
// }

// export default function Dashboard() {
//     const {
//         categories,
//         series,
//         types,
//     }: { categories: { id: number; name: string }[] } = usePage<any>().props;
//     const { t } = useLocales();

//     const {
//         data,
//         setData,
//         post,
//         processing,
//         errors,
//         recentlySuccessful,
//         reset,
//     } = useForm<Quest>({
//         title: '',
//         brief: '',
//         category_id: '',
//         startDate: '',
//         endDate: '',
//         prizes: [],
//         image: null,
//         entry_coin: '',
//         level_requirement: '',
//         categories_requirement: '',
//         copyright_requirement: '',
//         quest_series_id: '',
//         quest_type_id: '',
//     });

//     const categoryOptions = categories.map((category) => ({
//         value: category.id,
//         label: category.name,
//     }));

//     const seriesOptions = series.map((series) => ({
//         value: series.id,
//         label: series.title,
//     }));

//     const typesOptions = types.map((types) => ({
//         value: types.id,
//         label: types.name,
//     }));

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         post(route('user-dashboard.quest.store'), {
//             onSuccess: () => reset(),
//             // onError: (errors) => console.log(errors),
//         });
//     };

//     const breadcrumbs: BreadcrumbItem[] = [
//         {
//             title: "Contest",
//             href: dashboard().url,
//         },
//     ];

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head />
//             <div className="px-4 py-6">
//                 <form
//                     onSubmit={handleSubmit}
//                     className="max-w-6xl space-y-6"
//                     encType="multipart/form-data"
//                 >
//                     <ImageInput
//                         image={data.image}
//                         setImage={(value) => setData('image', value)}
//                         wrapperClassName="w-full aspect-[2/1]"
//                         iconClassName="w-[20%]"
//                     />

//                     {/* Title */}
//                     <div className="grid gap-2">
//                         <Label htmlFor="title">
//                             {t('dashboard.quest.inputs.title.label')}
//                         </Label>
//                         <Input
//                             id="title"
//                             name="title"
//                             value={data.title}
//                             onChange={(e) => setData('title', e.target.value)}
//                             placeholder={t(
//                                 'dashboard.quest.inputs.title.placeholder',
//                             )}
//                         />
//                         <InputError message={errors.title} />
//                     </div>

//                     <div className="grid gap-2">
//                         <Label htmlFor="title">
//                             {t('dashboard.quest.inputs.brief.label')}
//                         </Label>
//                         <TextAreaInput
//                             value={data.brief}
//                             onChange={(e) => setData('brief', e.target.value)}
//                             placeholder={t(
//                                 'dashboard.quest.inputs.brief.placeholder',
//                             )}
//                         />
//                         <InputError message={errors.brief} />
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                         <SelectInput
//                             id="tag"
//                             name="tag"
//                             label={t('dashboard.quest.inputs.category.label')}
//                             options={categoryOptions}
//                             value={data.category_id}
//                             onChange={(value) =>
//                                 setData('category_id', value as string)
//                             }
//                             className="max-w-auto w-full"
//                         />
//                         <SelectInput
//                             id="series"
//                             name="series"
//                             label={t('dashboard.quest.inputs.series.label')}
//                             options={seriesOptions}
//                             value={data.quest_series_id}
//                             onChange={(value) =>
//                                 setData('quest_series_id', value as string)
//                             }
//                             className="max-w-auto w-full"
//                         />
//                     </div>

//                     <div className="grid gap-4">
//                         <SelectInput
//                             id="quest_type_id"
//                             name="quest_type_id"
//                             label={t(
//                                 'dashboard.quest.inputs.quest_type_id.label',
//                             )}
//                             options={typesOptions}
//                             value={data.quest_type_id}
//                             onChange={(value) =>
//                                 setData('quest_type_id', value as string)
//                             }
//                             className="max-w-auto w-full"
//                         />
//                     </div>

//                     <div className="grid gap-2">
//                         <Label htmlFor="title">
//                             {t('dashboard.quest.inputs.entryCoin.label')}
//                         </Label>
//                         <Input
//                             type="number"
//                             id="start"
//                             name="start"
//                             value={data.entry_coin}
//                             onChange={(e) => {
//                                 setData('entry_coin', e.target.value);
//                             }}
//                             placeholder={t(
//                                 'dashboard.quest.inputs.entryCoin.placeholder',
//                             )}
//                         />
//                         <InputError message={errors.entry_coin} />
//                     </div>
//                     <div className="grid grid-cols-3 gap-4">
//                         <div className="grid gap-2">
//                             <Label htmlFor="title">
//                                 {t(
//                                     'dashboard.quest.inputs.level_requirement.label',
//                                 )}
//                             </Label>
//                             <Input
//                                 id="level_require"
//                                 name="level_require"
//                                 value={data.level_requirement}
//                                 onChange={(e) => {
//                                     setData(
//                                         'level_requirement',
//                                         e.target.value,
//                                     );
//                                 }}
//                                 placeholder={t(
//                                     'dashboard.quest.inputs.level_requirement.placeholder',
//                                 )}
//                             />
//                             <InputError message={errors.level_requirement} />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="title">
//                                 {t(
//                                     'dashboard.quest.inputs.categories_requirement.label',
//                                 )}
//                             </Label>
//                             <Input
//                                 id="categories_require"
//                                 name="categories_require"
//                                 value={data.categories_requirement}
//                                 onChange={(e) => {
//                                     setData(
//                                         'categories_requirement',
//                                         e.target.value,
//                                     );
//                                 }}
//                                 placeholder={t(
//                                     'dashboard.quest.inputs.categories_requirement.placeholder',
//                                 )}
//                             />
//                             <InputError
//                                 message={errors.categories_requirement}
//                             />
//                         </div>
//                         <div className="grid gap-2">
//                             <Label htmlFor="title">
//                                 {t(
//                                     'dashboard.quest.inputs.copyright_requirement.label',
//                                 )}
//                             </Label>
//                             <Input
//                                 id="copyright_require"
//                                 name="copyright_require"
//                                 value={data.copyright_requirement}
//                                 onChange={(e) => {
//                                     setData(
//                                         'copyright_requirement',
//                                         e.target.value,
//                                     );
//                                 }}
//                                 placeholder={t(
//                                     'dashboard.quest.inputs.copyright_requirement.placeholder',
//                                 )}
//                             />
//                             <InputError
//                                 message={errors.copyright_requirement}
//                             />
//                         </div>
//                     </div>

//                     {/* Start Date & End Date Row */}
//                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                         {/* Start Date */}
//                         <div className="grid gap-2">
//                             <Label htmlFor="startDate">
//                                 {t('dashboard.quest.inputs.startDate.label')}
//                             </Label>
//                             <DateInput
//                                 min={new Date().toISOString().slice(0, 10)}
//                                 value={data.startDate}
//                                 onChange={(value) =>
//                                     setData('startDate', value)
//                                 }
//                             />
//                             <InputError message={errors.startDate} />
//                         </div>

//                         {/* End Date */}
//                         <div className="grid gap-2">
//                             <Label htmlFor="endDate">
//                                 {t('dashboard.quest.inputs.endDate.label')}
//                             </Label>
//                             <DateInput
//                                 min={data.startDate}
//                                 value={data.endDate}
//                                 onChange={(value) => setData('endDate', value)}
//                             />
//                             <InputError message={errors.endDate} />
//                         </div>
//                     </div>
//                     <PrizesInput
//                         prizes={data.prizes}
//                         setPrizes={(value) => setData('prizes', value)}
//                     />

//                     {/* Submit Button */}
//                     <div className="flex items-center gap-4">
//                         <Button disabled={processing}>
//                             {' '}
//                             {t('dashboard.quest.button.createButton')}
//                         </Button>

//                         <Transition
//                             show={recentlySuccessful}
//                             enter="transition ease-in-out"
//                             enterFrom="opacity-0"
//                             leave="transition ease-in-out"
//                             leaveTo="opacity-0"
//                         >
//                             <p className="text-sm text-neutral-600">
//                                 {t('dashboard.quest.button.saveText')}
//                             </p>
//                         </Transition>
//                     </div>
//                 </form>
//             </div>
//         </AppLayout>
//     );
// }

// // Minus Icon
// const MinusIcon = () => (
//     <svg
//         className="h-5 w-5"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//         xmlns="http://www.w3.org/2000/svg"
//     >
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M18 12H6"
//         ></path>
//     </svg>
// );


import InputError from '@/components/input-error';
import SaveAndBackButtons from '@/components/save-and-back-buttons';
import DateInput from '@/components/shared/inputs/date-input';
import ImageInput from '@/components/shared/inputs/image-input';
import SelectInput from '@/components/shared/inputs/select-input';
import TextAreaInput from '@/components/shared/inputs/text-area-input';
import TextInput from '@/components/shared/inputs/text-input';
import { Label } from '@/components/ui/label';
import PrizesInput from '@/components/user-dashboard/quest/create-quest/prizes-input';
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
    title: string;
    brief: string;
    category_id: string;
    quest_type_id: string;
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
    const {
        categories,
        series,
        types,
        rank_tiers,
    }: { categories: { id: number; name: string }[] } = usePage<any>().props;
    const { t } = useLocales();



    const {
        data,
        setData,
        post,
        processing,
        errors,
        recentlySuccessful,
        reset,
    } = useForm<Quest>({
        title: '',
        brief: '',
        category_id: '',
        quest_type_id: '',
        startDate: '',
        endDate: '',
        prizes: [],
        image: null,
        entry_coin: '',
        level_requirement: '',
        categories_requirement: '',
        copyright_requirement: '',
        quest_series_id: '',
        rank_tier: '',
    });

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const seriesOptions = series.map((series) => ({
        value: series.id,
        label: series.title,
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
            // onError: (errors) => console.log(errors),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: "Create Contest",
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
                        required={true}
                        image={data.image}
                        setImage={(value) => setData('image', value)}
                        wrapperClassName="w-full aspect-[2/1]"
                        iconClassName="w-[20%]"
                    />


                    <TextInput
                        id="title"
                        value={data.title}
                        setValue={(value) => setData('title', value)}
                        label={t('dashboard.quest.inputs.title.label')}
                        placeholder={t('dashboard.quest.inputs.title.placeholder')}
                        error={errors.title}
                        required={true}
                    />
                    <TextAreaInput
                        id="brief"
                        value={data.brief}
                        onChange={(e) => setData('brief', e.target.value)}
                        label={t('dashboard.quest.inputs.brief.label')}
                        placeholder={t('dashboard.quest.inputs.brief.placeholder')}
                        error={errors.brief}
                        required={true}
                    />
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

                    <div className="grid gap-4 grid-cols-2">
                        <SelectInput
                            id="quest_type_id"
                            name="quest_type_id"
                            label={t(
                                'dashboard.quest.inputs.type.label',
                            )}
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
                            label={t(
                                'dashboard.quest.inputs.rank_tier.label',
                            )}
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
                        type='number'
                        value={data.entry_coin}
                        setValue={(value) => setData('entry_coin', value)}
                        label={t('dashboard.quest.inputs.entryCoin.label')}
                        placeholder={t('dashboard.quest.inputs.entryCoin.placeholder')}
                        error={errors.entry_coin}
                        required={true}
                    />
                    <div className="grid grid-cols-3 gap-4">
                        <TextInput
                            id="copyright_require"
                            value={data.copyright_requirement}
                            setValue={(value) => setData('copyright_requirement', value)}
                            label={t('dashboard.quest.inputs.copyright_requirement.label')}
                            placeholder={t('dashboard.quest.inputs.copyright_requirement.placeholder')}
                            error={errors.copyright_requirement}
                            required={true}
                        />
                        <TextInput
                            id="level_require"
                            value={data.level_requirement}
                            setValue={(value) => setData('level_requirement', value)}
                            label={t('dashboard.quest.inputs.level_requirement.label')}
                            placeholder={t('dashboard.quest.inputs.level_requirement.placeholder')}
                            error={errors.level_requirement}
                            required={true}
                        />
                        <TextInput
                            id="categories_require"
                            value={data.categories_requirement}
                            setValue={(value) => setData('categories_requirement', value)}
                            label={t('dashboard.quest.inputs.categories_requirement.label')}
                            placeholder={t('dashboard.quest.inputs.categories_requirement.placeholder')}
                            error={errors.categories_requirement}
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
                    />
                    <SaveAndBackButtons processing={processing} href={"/admin/quest"} />
                </form>
            </div>
        </AppLayout>
    );
}
