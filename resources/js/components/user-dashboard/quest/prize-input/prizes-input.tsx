import Button from '@/components/shared/buttons/button';
import SelectInput from '@/components/shared/inputs/select-input';
import { AlertTriangle, Award, Save, Trash2, X } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import SinglePrize from './single-prize';

// --- Utility: Generate Display Title ---
const generatePrizeTitle = (min, max) => {
    const getOrdinalSuffix = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    };
    if (min === max) return `${min}${getOrdinalSuffix(min)} Prize`;
    return `#No. ${min}-${max}`;
};

const PrizesInput = ({ prizes, setPrizes, prizePools }: any) => {
    // --- Shared State ---
    const [error, setError] = useState('');
    // const [coinType, setCoinType] = useState('coin');
    const [prizePool, setPrizePool] = useState(prizePools[0]?.id);

    // --- Add Form State ---
    const [newMin, setNewMin] = useState('');
    const [newMax, setNewMax] = useState('');
    const [newCoin, setNewCoin] = useState('');
    const [isRange, setIsRange] = useState(false);

    // --- Edit State ---
    const [editingPrizeId, setEditingPrizeId] = useState<number | null>(null);
    const [editData, setEditData] = useState<any>({
        min: '',
        max: '',
        coin: '',
        coinType: 'coin',
    });
    const [editError, setEditError] = useState('');

    // --- Derived ---
    const sortedPrizes = useMemo(() => [...prizes].sort((a, b) => a.min - b.min), [prizes]);

    const nextRequiredMin = useMemo(() => {
        if (sortedPrizes.length === 0) return 1;
        const maxCovered = sortedPrizes.reduce((max, current) => {
            if (current.min <= max + 1) return Math.max(max, current.max);
            return max;
        }, 0);
        return maxCovered + 1;
    }, [sortedPrizes]);


    // --- Add Prize ---
    const validateAndAddPrize = useCallback(() => {
        setError('');
        const min = parseInt(newMin, 10);
        const max = newMax ? parseInt(newMax, 10) : min;
        const coin = parseInt(newCoin, 10);

        if (!prizePool) {
            return setError('Please select a prize pool.');
        }

        if (isNaN(min) || isNaN(max) || isNaN(coin) || min < 1 || coin <= 0)
            return setError('Please enter valid, positive numbers for all fields.');

        if (min > max)
            return setError('Min position cannot be greater than the max position.');

        if (min !== nextRequiredMin)
            return setError(`Prize allocation must start exactly at position ${nextRequiredMin}.`);

        const hasOverlap = prizes.some(p => (
            (min >= p.min && min <= p.max) ||
            (max >= p.min && max <= p.max) ||
            (p.min >= min && p.min <= max)
        ));
        if (hasOverlap) return setError('This position/range overlaps with an existing prize.');

        const title = generatePrizeTitle(min, max);

        const newPrize = {
            prizeId: Date.now(),
            min,
            max,
            coin,
            title,
            prize_pool: prizePool,
        };


        setPrizes([...prizes, newPrize]);
        setNewMin('');
        setNewMax('');
        setNewCoin('');
    }, [newMin, newMax, newCoin, prizes, nextRequiredMin, prizePool, setPrizes]);

    // --- Remove Prize ---
    const removePrize = useCallback((prizeId) => {
        setPrizes([...prizes.filter(p => p.prizeId !== prizeId)]);
    }, [setPrizes, prizes]);

    // --- Editing Logic ---
    const startEditing = (prize) => {
        setEditingPrizeId(prize.prizeId);
        setEditData({
            min: prize.min,
            max: prize.max,
            coin: prize.coin,
            prizePool: prize.prizePool,
        });
        setEditError('');
    };

    const cancelEditing = () => {
        setEditingPrizeId(null);
        setEditData({ min: '', max: '', coin: '', coinType: 'coin' });
        setEditError('');
    };

    const saveEditedPrize = useCallback(() => {
        setEditError('');
        const min = parseInt(editData.min, 10);
        const max = editData.max ? parseInt(editData.max, 10) : min;
        const coin = parseInt(editData.coin, 10);

        if (isNaN(min) || isNaN(max) || isNaN(coin) || min < 1 || coin <= 0)
            return setEditError('Please enter valid, positive numbers for all fields.');

        if (min > max)
            return setEditError('Min position cannot be greater than the max position.');

        const others = prizes.filter(p => p.prizeId !== editingPrizeId);
        const overlap = others.some(p => (
            (min >= p.min && min <= p.max) ||
            (max >= p.min && max <= p.max) ||
            (p.min >= min && p.min <= max)
        ));
        if (overlap) return setEditError('This position range overlaps with another prize.');

        const sorted = [...others, { min, max }].sort((a, b) => a.min - b.min);
        for (let i = 0; i < sorted.length - 1; i++) {
            if (sorted[i].max + 1 < sorted[i + 1].min) {
                return setEditError(`Prize positions must remain continuous (gap after #${sorted[i].max}).`);
            }
        }

        const title = generatePrizeTitle(min, max);
        const updatedPrizes = prizes.map(p =>
            p.prizeId === editingPrizeId
                ? { ...p, min, max, coin, title, coinType: editData.coinType }
                : p
        );

        setPrizes(updatedPrizes.sort((a, b) => a.min - b.min));
        cancelEditing();
    }, [editData, prizes, editingPrizeId, setPrizes]);
    // --- Render ---
    return (
        <div className="font-inter">
            {/* Existing Prizes Display */}
            <h2 className="text-lg font-bold mb-4">Allocated Prizes ({prizes.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                {sortedPrizes.length > 0 ? (
                    sortedPrizes.map((prize) => (
                        <SinglePrize prize={prize} prizePools={prizePools} removePrize={removePrize} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8 rounded-lg border border-dashed border-gray-700">
                        <p className="text-gray-500 !text-center">No prizes allocated yet. Start adding from position 1.</p>
                    </div>
                )}
            </div>

            {editError && (
                <div className="mb-6 p-2 bg-red-500/40 border border-red-900 rounded-lg flex items-start">
                    <AlertTriangle className="w-4 h-4 text-red-900 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-red-900 font-medium text-xs">{editError}</span>
                </div>
            )}

            {/* Add New Prize Form */}
            <div className="p-6 rounded-xl border border-purple-600/50">
                <div className="flex justify-between items-center mb-4">
                    <SelectInput
                        placeholder='Select prize pool'
                        hasOption={false}
                        value={prizePool}
                        id="coin-type"
                        options={prizePools}
                        onChange={(value) => setPrizePool(parseInt(value))}
                    />
                    <div>
                        <div className="flex items-center space-x-4 mb-3 p-4 bg-bg-primary rounded-lg border border-gray-600 w-fit">
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 cursor-pointer">
                                <input
                                    type="radio"
                                    name="prizeType"
                                    checked={!isRange}
                                    onChange={() => {
                                        setIsRange(false);
                                        setNewMax('');
                                        if (newMin) setNewMax(newMin);
                                    }}
                                    className="form-radio text-purple-600 h-4 w-4 bg-gray-900 border-gray-500 focus:ring-purple-500"
                                />
                                <span>Single Position</span>
                            </label>
                            <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 cursor-pointer">
                                <input
                                    type="radio"
                                    name="prizeType"
                                    checked={isRange}
                                    onChange={() => setIsRange(true)}
                                    className="form-radio text-purple-600 h-4 w-4 bg-gray-900 border-gray-500 focus:ring-purple-500"
                                />
                                <span>Range Prize</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-2 flex flex-col">
                        {isRange ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="min-pos">Min Position</label>
                                    <input
                                        id="min-pos"
                                        type="number"
                                        placeholder={nextRequiredMin.toString()}
                                        value={newMin}
                                        onChange={(e) => setNewMin(e.target.value)}
                                        className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
                                        min="1"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="max-pos">Max Position</label>
                                    <input
                                        id="max-pos"
                                        type="number"
                                        placeholder={newMin || nextRequiredMin.toString()}
                                        value={newMax}
                                        onChange={(e) => setNewMax(e.target.value)}
                                        className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
                                        min={newMin || '1'}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="min-single">Position (Serial Number)</label>
                                <input
                                    id="min-single"
                                    type="number"
                                    placeholder={nextRequiredMin.toString()}
                                    value={newMin}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setNewMin(value);
                                        setNewMax(value);
                                    }}
                                    className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
                                    min="1"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="coin">Quantity</label>
                        <input
                            id="coin"
                            type="number"
                            placeholder="e.g., 100"
                            value={newCoin}
                            onChange={(e) => setNewCoin(e.target.value)}
                            className="w-full bg-bg-primary p-3 rounded-lg border focus:outline-none focus:ring-0 transition"
                            min="1"
                        />
                    </div>
                    <Button text="Add Prize" onClick={validateAndAddPrize} className="w-full py-4" type="button" />
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-500/40 border border-red-900 rounded-lg flex items-start">
                        <AlertTriangle className="w-5 h-5 text-red-900 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-red-900 font-medium text-sm">{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrizesInput;



