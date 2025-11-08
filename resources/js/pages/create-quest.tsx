import InputError from '@/components/input-error';
import DateInput from '@/components/shared/inputs/date-input';
import SelectInput from '@/components/shared/inputs/select-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';


export default function Dashboard() {
    const { t } = useLocales();
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            title: '',
            city: '',
            full_address: '',
        });


    // --- Form State ---
    const [formData, setFormData] = useState({
        title: '',
        brief: '',
        tag: 'trading',
        startDate: '',
        endDate: '',
        singlePrize: [],
    });

    const [prizes, setPrizes] = useState([
        { rankStart: '1', rankEnd: '', amount: 0 },
    ]);

    // --- Prize Checker State ---
    const [checkPosition, setCheckPosition] = useState('');
    const [foundPrize, setFoundPrize] = useState(null);

    // --- Form Handlers ---

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePrizeChange = (index, field, value) => {
        const newPrizes = [...prizes];
        newPrizes[index][field] = value;
        setPrizes(newPrizes);
    };

    const addPrizeRow = () => {
        setPrizes([...prizes, { rankStart: '', rankEnd: '', amount: 0 }]);
    };

    const removePrizeRow = (index) => {
        // Don't remove the last row
        if (prizes.length <= 1) return;
        const newPrizes = prizes.filter((_, i) => i !== index);
        setPrizes(newPrizes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullEventData = {
            ...formData,
            prizes,
        };
        // You can now send this data to your backend
        console.log('Event Data:', fullEventData);
        // Show a message to the user (instead of alert)
        setFoundPrize({ amount: 'Event Submitted! Check the console.' });
    };

    // --- Prize Check Logic ---

    /**
     * Parses a rank string (e.g., "1", "2-5", "11-20") and
     * checks if the position fits within that rank.
     */
    const checkRank = (prize, position) => {
        const posNum = parseInt(position, 10);
        if (isNaN(posNum)) return false;

        const start = parseInt(prize.rankStart, 10);
        const end = parseInt(prize.rankEnd, 10);

        // Case 1: Single Rank (e.g., Start: 1, End: "" or NaN)
        if (!isNaN(start) && (isNaN(end) || prize.rankEnd === '')) {
            return posNum === start;
        }

        // Case 2: Range (e.g., Start: 2, End: 5)
        if (!isNaN(start) && !isNaN(end)) {
            // Ensure start <= end
            const min = Math.min(start, end);
            const max = Math.max(start, end);
            return posNum >= min && posNum <= max;
        }

        return false;
    };

    const handleCheckPrize = () => {
        const positionToFind = parseInt(checkPosition, 10);
        if (isNaN(positionToFind)) {
            setFoundPrize({ error: 'Please enter a valid position number.' });
            return;
        }

        let prizeForPosition = null;

        for (const prize of prizes) {
            if (checkRank(prize, positionToFind)) {
                prizeForPosition = prize;
                break; // Found the matching prize
            }
        }

        if (prizeForPosition) {
            const rankDisplay = prizeForPosition.rankEnd
                ? `${prizeForPosition.rankStart}-${prizeForPosition.rankEnd}`
                : prizeForPosition.rankStart;
            setFoundPrize({ amount: prizeForPosition.amount, rank: rankDisplay });
        } else {
            setFoundPrize({ error: `No prize found for position ${positionToFind}.` });
        }
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
                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

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
                        <InputError message={errors.city} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="title">{t('dashboard.createQuest.inputs.brief.label')}</Label>
                        
                        <textarea
                            id="brief"
                            name="brief"
                            value={data.brief}
                            onChange={(e) =>
                                setData('brief', e.target.value)
                            }
                            placeholder={t('dashboard.createQuest.inputs.brief.placeholder')}
                            className='resize-none border focus:outline-0 h-32 bg-bg-primary rounded-sm p-4'
                        />
                        <InputError message={errors.city} />
                    </div>
                    <SelectInput
                        id="tag"
                        name="tag"
                        label={t('dashboard.createQuest.inputs.category.label')}
                        options={[
                            { value: 'trading', label: 'Trading Competition' },
                            { value: 'staking', label: 'Staking Event' },
                            { value: 'airdrop', label: 'Airdrop' },
                            { value: 'gleam', label: 'Gleam Giveaway' },
                        ]}
                        value={data.tag}
                        onChange={(value) =>
                            setData('tag', value)
                        }
                        className='w-full max-w-auto'
                    />

                    {/* Start Date & End Date Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Start Date */}
                        <div className="grid gap-2">
                            <Label htmlFor="startDate">{t('dashboard.createQuest.inputs.startDate.label')}</Label>
                            <DateInput />
                            <InputError message={errors.city} />
                        </div>

                        {/* End Date */}
                        <div className="grid gap-2">
                            <Label htmlFor="endDate">{t('dashboard.createQuest.inputs.endDate.label')}</Label>
                            <DateInput />
                            <InputError message={errors.city} />
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
                            <div className="flex-[2] flex gap-2 md:gap-4">
                                <span className="flex-1 text-sm font-medium "><Label htmlFor="startDate">{t('dashboard.createQuest.inputs.multiplePrizes.start.label')}</Label></span>
                                <span className="flex-1 text-sm font-medium  ml-3"><Label htmlFor="endDate">{t('dashboard.createQuest.inputs.multiplePrizes.end.label')}</Label></span>
                                <span className="flex-1 text-sm font-medium  ml-3"><Label htmlFor="amount">{t('dashboard.createQuest.inputs.multiplePrizes.amount.label')}</Label></span>
                            </div>
                            <span className="w-8"></span>
                        </div>

                        {/* Dynamic Prize Rows Container */}
                        <div className="space-y-4">
                            {prizes.map((prize, index) => (
                                <div key={index} className="flex items-center gap-2 md:gap-4">
                                    <div className="flex-[2] flex items-center gap-2 md:gap-4">
                                        <Input
                                            id="start"
                                            name="start"
                                            value={data.start}
                                            onChange={(e) =>
                                                setData('start', e.target.value)
                                            }
                                            placeholder={t('dashboard.createQuest.inputs.multiplePrizes.start.placeholder')}
                                        />
                                        <span className="text-gray-400 text-center">-</span>
                                        <Input
                                            id="end"
                                            name="end"
                                            value={data.end}
                                            onChange={(e) =>
                                                setData('end', e.target.value)
                                            }
                                            placeholder={t('dashboard.createQuest.inputs.multiplePrizes.end.placeholder')}
                                        />
                                    </div>
                                    <Input
                                        id="amount"
                                        name="amount"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData('amount', e.target.value)
                                        }
                                        placeholder={t('dashboard.createQuest.inputs.multiplePrizes.amount.placeholder')}
                                        className='w-fit'
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removePrizeRow(index)}
                                        className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${prizes.length > 1 ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                                        aria-label="Remove prize row"
                                        disabled={prizes.length <= 1}
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
