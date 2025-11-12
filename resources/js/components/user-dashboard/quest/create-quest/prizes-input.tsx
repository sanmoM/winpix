// import React, { useState, useMemo, useCallback } from 'react';
// import { Award, Trash2, ArrowUpRight, ChevronRight, AlertTriangle } from 'lucide-react';
// import Button from '@/components/shared/buttons/button';
// import SelectInput from '@/components/shared/inputs/select-input';

// /**
//  * Utility function to generate the display title for a prize entry.
//  * This logic is used for initializing state and for validating/adding new prizes.
//  */
// const generatePrizeTitle = (start, end) => {
//     // Helper to get ordinal suffix (st, nd, rd, th)
//     const getOrdinalSuffix = (n) => {
//         const s = ["th", "st", "nd", "rd"];
//         const v = n % 100;
//         // Standard logic for determining suffix
//         return s[(v - 20) % 10] || s[v] || s[0];
//     };

//     if (start === end) {
//         // Single position: Use the "nth Prize" format for ALL single positions (e.g., 1st Prize, 6th Prize)
//         return `${start}${getOrdinalSuffix(start)} Prize`;
//     }

//     // Range position (X-Y). Use the standard #No. X-Y format.
//     return `#No. ${start}-${end}`;
// };


// // Main App Component
// const PrizesInput = ({ prizes, setPrizes }: { prizes: any[], setPrizes: any }) => {

//     // State for the new prize input form
//     const [newStart, setNewStart] = useState('');
//     const [newEnd, setNewEnd] = useState('');
//     const [newAmount, setNewAmount] = useState('');
//     const [error, setError] = useState('');
//     const [coinType, setCoinType] = useState('coin');

//     // New state to toggle between single position and range input
//     const [isRange, setIsRange] = useState(false);

//     // --- Core Logic: Calculating the Next Required Position ---

//     const nextRequiredStart = useMemo(() => {
//         if (prizes.length === 0) return 1;

//         // 1. Sort prizes by starting position to ensure consistency
//         const sortedPrizes = [...prizes].sort((a, b) => a.start - b.start);

//         // 2. Find the highest covered position.
//         // We use reduce to process the sorted list and track the maximum 'end' found so far.
//         const maxCovered = sortedPrizes.reduce((max, current) => {
//             if (current.start <= max + 1) {
//                 // If the current entry is contiguous with or overlaps the current max covered range,
//                 // update the max covered position.
//                 return Math.max(max, current.end);
//             }
//             // If there's a gap (current.start > max + 1), we return the max to stop the reduction.
//             return max;
//         }, 0);

//         return maxCovered + 1;
//     }, [prizes]);

//     // --- Validation and Submission ---

//     const validateAndAddPrize = useCallback(() => {
//         setError('');

//         const start = parseInt(newStart, 10);
//         // If not in range mode, newEnd should have been set to newStart by the input handler.
//         // If in range mode, use newEnd, falling back to newStart if empty (for single position submission in range mode)
//         const end = newEnd ? parseInt(newEnd, 10) : start;
//         const amount = parseInt(newAmount, 10);

//         // 1. Basic numeric and range validation
//         if (isNaN(start) || isNaN(end) || isNaN(amount) || start < 1 || amount <= 0) {
//             return setError('Please enter valid, positive numbers for all fields.');
//         }

//         if (start > end) {
//             return setError('Start position cannot be greater than the end position.');
//         }

//         // 2. Linearity/Gap Validation (STRICT REQUIREMENT)
//         if (start !== nextRequiredStart) {
//             return setError(`Prize allocation must start exactly at position ${nextRequiredStart}. You cannot skip positions.`);
//         }

//         // 3. Overlap Check (Although linearity check handles most of it, this is a final guard)
//         const hasOverlap = prizes.some(p => (
//             (start >= p.start && start <= p.end) ||
//             (end >= p.start && end <= p.end) ||
//             (p.start >= start && p.start <= end)
//         ));

//         if (hasOverlap) {
//             return setError('This position/range overlaps with an already assigned prize.');
//         }

//         // Calculate the display title for the new prize
//         const title = generatePrizeTitle(start, end);

//         // If validation passes, add the new prize
//         const newPrize = {
//             id: Date.now(),
//             start,
//             end,
//             amount,
//             title,
//             coinType,
//         };

//         setPrizes([...prizes, newPrize]);

//         // Reset inputs
//         setNewStart('');
//         setNewEnd('');
//         setNewAmount('');

//     }, [newStart, newEnd, newAmount, prizes, nextRequiredStart]);

//     // --- Utility Functions ---

//     const removePrize = useCallback((id) => {
//         setPrizes(prev => prev.filter(p => p.id !== id));
//     }, []);

//     // Render logic for prize cards, sorted for display
//     const sortedPrizes = useMemo(() => {
//         return [...prizes].sort((a, b) => a.start - b.start);
//     }, [prizes]);

//     // --- Render Component ---

//     return (
//         <div className=" font-inter">

//             {/* Existing Prizes Display */}
//             <h2 className="text-lg font-bold mb-4">Allocated Prizes ({prizes.length})</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
//                 {sortedPrizes.length > 0 ? (
//                     sortedPrizes.map((prize, index) => (
//                         <div
//                             key={prize.id}
//                             className="prize-card bg-bg-primary  p-4 rounded-xl  border flex flex-col justify-between"
//                         >
//                             <div className="flex items-center justify-between mb-3">
//                                 <span className="text-lg font-bold text-purple-400">
//                                     {/* Use the stored title for display */}
//                                     {prize.title}
//                                 </span>
//                                 <Award className="w-5 h-5 text-yellow-500" />
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <span className="text-3xl font-extrabold ">{prize.amount}</span>
//                                 <span className="text-sm text-gray-400">Coins</span>
//                             </div>
//                             <button
//                                 type='button'
//                                 onClick={() => removePrize(prize.id)}
//                                 className="mt-4 px-4 py-2 text-xs text-red-400 border border-red-500 rounded-lg  transition duration-150 flex items-center justify-center cursor-pointer"
//                             >
//                                 <Trash2 className="w-3 h-3 mr-1" /> Remove
//                             </button>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="col-span-full text-center py-8 /50 rounded-lg border border-dashed border-gray-700">
//                         <p className="text-gray-500 !text-center">No prizes allocated yet. Start adding from position 1.</p>
//                     </div>
//                 )}
//             </div>

//             {/* Add New Prize Form */}
//             <div className=" p-6 rounded-xl border border-purple-600/50">

//                 <div className='flex justify-between items-center mb-4'>
//                     <SelectInput
//                         value={coinType}
//                         id='coin-type'
//                         options={[
//                             { label: "Coin", value: "coin" },
//                             { label: "Pixel", value: "pixel" },
//                         ]}
//                         onChange={(value) => setCoinType(value)}

//                     />
//                     <div>
//                         <div className="flex items-center space-x-4 mb-3 p-4 bg-bg-primary rounded-lg border border-gray-600 w-fit">
//                             <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 cursor-pointer">
//                                 <input
//                                     type="radio"
//                                     name="prizeType"
//                                     checked={!isRange}
//                                     onChange={() => {
//                                         setIsRange(false);
//                                         setNewEnd(''); // Clear end when switching to single
//                                         if (newStart) setNewEnd(newStart); // Sync end if start already has a value
//                                     }}
//                                     className="form-radio text-purple-600 h-4 w-4 bg-gray-900 border-gray-500 focus:ring-purple-500"
//                                 />
//                                 <span>Single Position</span>
//                             </label>
//                             <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 cursor-pointer">
//                                 <input
//                                     type="radio"
//                                     name="prizeType"
//                                     checked={isRange}
//                                     onChange={() => setIsRange(true)}
//                                     className="form-radio text-purple-600 h-4 w-4 bg-gray-900 border-gray-500 focus:ring-purple-500"
//                                 />
//                                 <span>Range Prize</span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//                     {/* Prize Type Toggle and Position Input(s) */}
//                     <div className="md:col-span-2 flex flex-col">

//                         {/* Type Toggle */}


//                         {/* Input Fields controlled by isRange */}
//                         {isRange ? (
//                             // Range Mode (Start and End)
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="flex flex-col">
//                                     <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="start-pos-range">Start Position</label>
//                                     <input
//                                         id="start-pos-range"
//                                         type="number"
//                                         placeholder={nextRequiredStart.toString()}
//                                         value={newStart}
//                                         onChange={(e) => setNewStart(e.target.value)}
//                                         className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
//                                         min="1"
//                                     />
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="end-pos">End Position</label>
//                                     <input
//                                         id="end-pos"
//                                         type="number"
//                                         placeholder={newStart || nextRequiredStart.toString()}
//                                         value={newEnd}
//                                         onChange={(e) => setNewEnd(e.target.value)}
//                                         className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
//                                         min={newStart || '1'}
//                                     />
//                                 </div>
//                             </div>
//                         ) : (
//                             // Single Position Mode
//                             <div className="flex flex-col">
//                                 <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="position-single">Position (Serial Number)</label>
//                                 <input
//                                     id="position-single"
//                                     type="number"
//                                     placeholder={nextRequiredStart.toString()}
//                                     value={newStart}
//                                     onChange={(e) => {
//                                         const value = e.target.value;
//                                         setNewStart(value);
//                                         setNewEnd(value); // Keep end synced for single mode logic
//                                     }}
//                                     className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
//                                     min="1"
//                                 />
//                             </div>
//                         )}
//                     </div>

//                     {/* Prize Amount Input */}
//                     <div className="flex flex-col">
//                         <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="amount">Prize Amount (Coins)</label>
//                         <input
//                             id="amount"
//                             type="number"
//                             placeholder="e.g., 100"
//                             value={newAmount}
//                             onChange={(e) => setNewAmount(e.target.value)}
//                             className="w-full bg-bg-primary p-3 rounded-lg border focus:outline-none focus:ring-0 transition"
//                             min="1"
//                         />
//                     </div>
//                     <Button text='Add Prize' onClick={validateAndAddPrize} className='w-full py-4' type='button' />
//                 </div>

//                 {/* Error Display */}
//                 {error && (
//                     <div className="mt-4 p-3 bg-red-500/40 border border-red-900 rounded-lg flex items-start">
//                         <AlertTriangle className="w-5 h-5 text-red-900 mr-2 flex-shrink-0 mt-0.5" />
//                         <span className="text-red-900 font-medium text-sm">{error}</span>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PrizesInput;


// import Button from '@/components/shared/buttons/button';
// import SelectInput from '@/components/shared/inputs/select-input';
// import { AlertTriangle, Award, Edit3, Save, Trash2, X } from 'lucide-react';
// import { useCallback, useMemo, useState } from 'react';

// // --- Utility: Generate Display Title ---
// const generatePrizeTitle = (start, end) => {
//     const getOrdinalSuffix = (n) => {
//         const s = ["th", "st", "nd", "rd"];
//         const v = n % 100;
//         return s[(v - 20) % 10] || s[v] || s[0];
//     };
//     if (start === end) return `${start}${getOrdinalSuffix(start)} Prize`;
//     return `#No. ${start}-${end}`;
// };

// const PrizesInput = ({ prizes, setPrizes }: { prizes: any[], setPrizes: any }) => {
//     // --- Shared State ---
//     const [error, setError] = useState('');
//     const [coinType, setCoinType] = useState('coin');

//     // --- Add Form State ---
//     const [newStart, setNewStart] = useState('');
//     const [newEnd, setNewEnd] = useState('');
//     const [newAmount, setNewAmount] = useState('');
//     const [isRange, setIsRange] = useState(false);

//     // --- Edit State ---
//     const [editingId, setEditingId] = useState<number | null>(null);
//     const [editData, setEditData] = useState<any>({
//         start: '',
//         end: '',
//         amount: '',
//         coinType: 'coin',
//     });

//     // --- Derived ---
//     const sortedPrizes = useMemo(() => [...prizes].sort((a, b) => a.start - b.start), [prizes]);

//     const nextRequiredStart = useMemo(() => {
//         if (sortedPrizes.length === 0) return 1;
//         const maxCovered = sortedPrizes.reduce((max, current) => {
//             if (current.start <= max + 1) return Math.max(max, current.end);
//             return max;
//         }, 0);
//         return maxCovered + 1;
//     }, [sortedPrizes]);

//     // --- Add Prize ---
//     const validateAndAddPrize = useCallback(() => {
//         setError('');
//         const start = parseInt(newStart, 10);
//         const end = newEnd ? parseInt(newEnd, 10) : start;
//         const amount = parseInt(newAmount, 10);

//         if (isNaN(start) || isNaN(end) || isNaN(amount) || start < 1 || amount <= 0)
//             return setError('Please enter valid, positive numbers for all fields.');

//         if (start > end)
//             return setError('Start position cannot be greater than the end position.');

//         if (start !== nextRequiredStart)
//             return setError(`Prize allocation must start exactly at position ${nextRequiredStart}.`);

//         const hasOverlap = prizes.some(p => (
//             (start >= p.start && start <= p.end) ||
//             (end >= p.start && end <= p.end) ||
//             (p.start >= start && p.start <= end)
//         ));

//         if (hasOverlap) return setError('This position/range overlaps with an existing prize.');

//         const title = generatePrizeTitle(start, end);

//         const newPrize = {
//             id: Date.now(),
//             start,
//             end,
//             amount,
//             title,
//             coinType,
//         };

//         setPrizes([...prizes, newPrize]);
//         setNewStart('');
//         setNewEnd('');
//         setNewAmount('');
//     }, [newStart, newEnd, newAmount, prizes, nextRequiredStart, coinType]);

//     // --- Remove Prize ---
//     const removePrize = useCallback((id) => {
//         setPrizes(prev => prev.filter(p => p.id !== id));
//     }, [setPrizes]);

//     // --- Editing Logic ---
//     const startEditing = (prize) => {
//         setEditingId(prize.id);
//         setEditData({
//             start: prize.start,
//             end: prize.end,
//             amount: prize.amount,
//             coinType: prize.coinType,
//         });
//         setError('');
//     };

//     const cancelEditing = () => {
//         setEditingId(null);
//         setEditData({ start: '', end: '', amount: '', coinType: 'coin' });
//         setError('');
//     };

//     const saveEditedPrize = useCallback(() => {
//         setError('');
//         const start = parseInt(editData.start, 10);
//         const end = editData.end ? parseInt(editData.end, 10) : start;
//         const amount = parseInt(editData.amount, 10);

//         if (isNaN(start) || isNaN(end) || isNaN(amount) || start < 1 || amount <= 0)
//             return setError('Please enter valid, positive numbers for all fields.');

//         if (start > end)
//             return setError('Start position cannot be greater than the end position.');

//         const others = prizes.filter(p => p.id !== editingId);
//         const overlap = others.some(p => (
//             (start >= p.start && start <= p.end) ||
//             (end >= p.start && end <= p.end) ||
//             (p.start >= start && p.start <= end)
//         ));
//         if (overlap) return setError('This position range overlaps with another prize.');

//         // Sequential continuity check
//         const sorted = [...others, { start, end }].sort((a, b) => a.start - b.start);
//         for (let i = 0; i < sorted.length - 1; i++) {
//             if (sorted[i].end + 1 < sorted[i + 1].start) {
//                 return setError(`Prize positions must remain continuous (gap after #${sorted[i].end}).`);
//             }
//         }

//         const title = generatePrizeTitle(start, end);
//         const updatedPrizes = prizes.map(p =>
//             p.id === editingId ? { ...p, start, end, amount, title, coinType: editData.coinType } : p
//         );

//         setPrizes(updatedPrizes.sort((a, b) => a.start - b.start));
//         cancelEditing();
//     }, [editData, prizes, editingId, setPrizes]);

//     // --- Render ---
//     return (
//         <div className="font-inter">
//             {/* Existing Prizes Display */}
//             <h2 className="text-lg font-bold mb-4">Allocated Prizes ({prizes.length})</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
//                 {sortedPrizes.length > 0 ? (
//                     sortedPrizes.map((prize) => (
//                         <div key={prize.id} className="prize-card bg-bg-primary p-4 rounded-xl border flex flex-col justify-between">
//                             {editingId === prize.id ? (
//                                 <>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <input
//                                             type="number"
//                                             value={editData.start}
//                                             onChange={(e) => setEditData(prev => ({ ...prev, start: e.target.value }))}
//                                             className="w-16 bg-bg-primary border border-gray-600 rounded-lg px-4 py-2 text-center"
//                                             min="1"
//                                         />
//                                         <span className="mx-1 text-gray-400">-</span>
//                                         <input
//                                             type="number"
//                                             value={editData.end}
//                                             onChange={(e) => setEditData(prev => ({ ...prev, end: e.target.value }))}
//                                             className="w-16 bg-bg-primary border border-gray-600 rounded-lg px-4 py-2 text-center"
//                                             min={editData.start}
//                                         />
//                                         <Award className="w-5 h-5 text-yellow-500 ml-auto" />
//                                     </div>
//                                     <div className="flex items-center space-x-2 mb-3">
//                                         <input
//                                             type="number"
//                                             value={editData.amount}
//                                             onChange={(e) => setEditData(prev => ({ ...prev, amount: e.target.value }))}
//                                             className="w-full bg-bg-primary border border-gray-600 rounded-lg p-2"
//                                             placeholder="Amount"
//                                             min="1"
//                                         />
//                                         <SelectInput
//                                             id="coin-type-edit"
//                                             value={editData.coinType}
//                                             options={[
//                                                 { label: "Coin", value: "coin" },
//                                                 { label: "Pixel", value: "pixel" },
//                                             ]}
//                                             inputClassName="py-2"
//                                             onChange={(value) => setEditData(prev => ({ ...prev, coinType: value }))}
//                                         />
//                                     </div>
//                                     <div className="flex justify-between mt-2">
//                                         <button
//                                             type="button"
//                                             onClick={saveEditedPrize}
//                                             className="px-4 py-2 text-xs text-green-400 border border-green-500 rounded-lg flex items-center"
//                                         >
//                                             <Save className="w-3 h-3 mr-1" /> Save
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={cancelEditing}
//                                             className="px-4 py-2 text-xs text-red-400 border border-red-500 rounded-lg flex items-center"
//                                         >
//                                             <X className="w-3 h-3 mr-1" /> Cancel
//                                         </button>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <span className="text-lg font-bold text-purple-400">{prize.title}</span>
//                                         <Award className="w-5 h-5 text-yellow-500" />
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                         <span className="text-3xl font-extrabold">{prize.amount}</span>
//                                         <span className="text-sm text-gray-400 capitalize">{prize.coinType}</span>
//                                     </div>
//                                     <div className="mt-4 flex justify-between">
//                                         <button
//                                             type="button"
//                                             onClick={() => startEditing(prize)}
//                                             className="px-4 py-2 text-xs text-blue-400 border border-blue-500 rounded-lg flex items-center"
//                                         >
//                                             <Edit3 className="w-3 h-3 mr-1" /> Edit
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={() => removePrize(prize.id)}
//                                             className="px-4 py-2 text-xs text-red-400 border border-red-500 rounded-lg flex items-center"
//                                         >
//                                             <Trash2 className="w-3 h-3 mr-1" /> Remove
//                                         </button>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <div className="col-span-full text-center py-8 /50 rounded-lg border border-dashed border-gray-700">
//                         <p className="text-gray-500 !text-center">No prizes allocated yet. Start adding from position 1.</p>
//                     </div>
//                 )}
//             </div>

//             {/* Add New Prize Form */}
//             <div className="p-6 rounded-xl border border-purple-600/50">
//                 <div className="flex justify-between items-center mb-4">
//                     <SelectInput
//                         value={coinType}
//                         id="coin-type"
//                         options={[
//                             { label: "Coin", value: "coin" },
//                             { label: "Pixel", value: "pixel" },
//                         ]}
//                         onChange={(value) => setCoinType(value)}
//                     />
//                     <div>
//                         <div className="flex items-center space-x-4 mb-3 p-4 bg-bg-primary rounded-lg border border-gray-600 w-fit">
//                             <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 cursor-pointer">
//                                 <input
//                                     type="radio"
//                                     name="prizeType"
//                                     checked={!isRange}
//                                     onChange={() => {
//                                         setIsRange(false);
//                                         setNewEnd('');
//                                         if (newStart) setNewEnd(newStart);
//                                     }}
//                                     className="form-radio text-purple-600 h-4 w-4 bg-gray-900 border-gray-500 focus:ring-purple-500"
//                                 />
//                                 <span>Single Position</span>
//                             </label>
//                             <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 cursor-pointer">
//                                 <input
//                                     type="radio"
//                                     name="prizeType"
//                                     checked={isRange}
//                                     onChange={() => setIsRange(true)}
//                                     className="form-radio text-purple-600 h-4 w-4 bg-gray-900 border-gray-500 focus:ring-purple-500"
//                                 />
//                                 <span>Range Prize</span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//                     <div className="md:col-span-2 flex flex-col">
//                         {isRange ? (
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="flex flex-col">
//                                     <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="start-pos-range">Start Position</label>
//                                     <input
//                                         id="start-pos-range"
//                                         type="number"
//                                         placeholder={nextRequiredStart.toString()}
//                                         value={newStart}
//                                         onChange={(e) => setNewStart(e.target.value)}
//                                         className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
//                                         min="1"
//                                     />
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="end-pos">End Position</label>
//                                     <input
//                                         id="end-pos"
//                                         type="number"
//                                         placeholder={newStart || nextRequiredStart.toString()}
//                                         value={newEnd}
//                                         onChange={(e) => setNewEnd(e.target.value)}
//                                         className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
//                                         min={newStart || '1'}
//                                     />
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="flex flex-col">
//                                 <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="position-single">Position (Serial Number)</label>
//                                 <input
//                                     id="position-single"
//                                     type="number"
//                                     placeholder={nextRequiredStart.toString()}
//                                     value={newStart}
//                                     onChange={(e) => {
//                                         const value = e.target.value;
//                                         setNewStart(value);
//                                         setNewEnd(value);
//                                     }}
//                                     className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
//                                     min="1"
//                                 />
//                             </div>
//                         )}
//                     </div>
//                     <div className="flex flex-col">
//                         <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="amount">Prize Amount (Coins)</label>
//                         <input
//                             id="amount"
//                             type="number"
//                             placeholder="e.g., 100"
//                             value={newAmount}
//                             onChange={(e) => setNewAmount(e.target.value)}
//                             className="w-full bg-bg-primary p-3 rounded-lg border focus:outline-none focus:ring-0 transition"
//                             min="1"
//                         />
//                     </div>
//                     <Button text="Add Prize" onClick={validateAndAddPrize} className="w-full py-4" type="button" />
//                 </div>

//                 {error && (
//                     <div className="mt-4 p-3 bg-red-500/40 border border-red-900 rounded-lg flex items-start">
//                         <AlertTriangle className="w-5 h-5 text-red-900 mr-2 flex-shrink-0 mt-0.5" />
//                         <span className="text-red-900 font-medium text-sm">{error}</span>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PrizesInput;

// import Button from '@/components/shared/buttons/button';
// import SelectInput from '@/components/shared/inputs/select-input';
// import { AlertTriangle, Award, Edit3, Save, Trash2, X } from 'lucide-react';
// import { useCallback, useMemo, useState } from 'react';

// // --- Utility: Generate Display Title ---
// const generatePrizeTitle = (start, end) => {
//     const getOrdinalSuffix = (n) => {
//         const s = ["th", "st", "nd", "rd"];
//         const v = n % 100;
//         return s[(v - 20) % 10] || s[v] || s[0];
//     };
//     if (start === end) return `${start}${getOrdinalSuffix(start)} Prize`;
//     return `#No. ${start}-${end}`;
// };

// const PrizesInput = ({ prizes, setPrizes }: { prizes: any[], setPrizes: any }) => {
//     // --- Shared State ---
//     const [error, setError] = useState('');
//     const [coinType, setCoinType] = useState('coin');

//     // --- Add Form State ---
//     const [newStart, setNewStart] = useState('');
//     const [newEnd, setNewEnd] = useState('');
//     const [newAmount, setNewAmount] = useState('');
//     const [isRange, setIsRange] = useState(false);

//     // --- Edit State ---
//     const [editingId, setEditingId] = useState<number | null>(null);
//     const [editData, setEditData] = useState<any>({
//         start: '',
//         end: '',
//         amount: '',
//         coinType: 'coin',
//     });
//     const [editError, setEditError] = useState(''); // <-- per-card error

//     // --- Derived ---
//     const sortedPrizes = useMemo(() => [...prizes].sort((a, b) => a.start - b.start), [prizes]);

//     const nextRequiredStart = useMemo(() => {
//         if (sortedPrizes.length === 0) return 1;
//         const maxCovered = sortedPrizes.reduce((max, current) => {
//             if (current.start <= max + 1) return Math.max(max, current.end);
//             return max;
//         }, 0);
//         return maxCovered + 1;
//     }, [sortedPrizes]);

//     // --- Add Prize ---
//     const validateAndAddPrize = useCallback(() => {
//         setError('');
//         const start = parseInt(newStart, 10);
//         const end = newEnd ? parseInt(newEnd, 10) : start;
//         const amount = parseInt(newAmount, 10);

//         if (isNaN(start) || isNaN(end) || isNaN(amount) || start < 1 || amount <= 0)
//             return setError('Please enter valid, positive numbers for all fields.');

//         if (start > end)
//             return setError('Start position cannot be greater than the end position.');

//         if (start !== nextRequiredStart)
//             return setError(`Prize allocation must start exactly at position ${nextRequiredStart}.`);

//         const hasOverlap = prizes.some(p => (
//             (start >= p.start && start <= p.end) ||
//             (end >= p.start && end <= p.end) ||
//             (p.start >= start && p.start <= end)
//         ));

//         if (hasOverlap) return setError('This position/range overlaps with an existing prize.');

//         const title = generatePrizeTitle(start, end);

//         const newPrize = {
//             id: Date.now(),
//             start,
//             end,
//             amount,
//             title,
//             coinType,
//         };

//         setPrizes([...prizes, newPrize]);
//         setNewStart('');
//         setNewEnd('');
//         setNewAmount('');
//     }, [newStart, newEnd, newAmount, prizes, nextRequiredStart, coinType, setPrizes]);

//     // --- Remove Prize ---
//     const removePrize = useCallback((id) => {
//         setPrizes(prev => prev.filter(p => p.id !== id));
//     }, [setPrizes]);

//     // --- Editing Logic ---
//     const startEditing = (prize) => {
//         setEditingId(prize.id);
//         setEditData({
//             start: prize.start,
//             end: prize.end,
//             amount: prize.amount,
//             coinType: prize.coinType,
//         });
//         setEditError('');
//     };

//     const cancelEditing = () => {
//         setEditingId(null);
//         setEditData({ start: '', end: '', amount: '', coinType: 'coin' });
//         setEditError('');
//     };

//     const saveEditedPrize = useCallback(() => {
//         setEditError('');
//         const start = parseInt(editData.start, 10);
//         const end = editData.end ? parseInt(editData.end, 10) : start;
//         const amount = parseInt(editData.amount, 10);

//         if (isNaN(start) || isNaN(end) || isNaN(amount) || start < 1 || amount <= 0)
//             return setEditError('Please enter valid, positive numbers for all fields.');

//         if (start > end)
//             return setEditError('Start position cannot be greater than the end position.');

//         const others = prizes.filter(p => p.id !== editingId);
//         const overlap = others.some(p => (
//             (start >= p.start && start <= p.end) ||
//             (end >= p.start && end <= p.end) ||
//             (p.start >= start && p.start <= end)
//         ));
//         if (overlap) return setEditError('This position range overlaps with another prize.');

//         // Sequential continuity check
//         const sorted = [...others, { start, end }].sort((a, b) => a.start - b.start);
//         for (let i = 0; i < sorted.length - 1; i++) {
//             if (sorted[i].end + 1 < sorted[i + 1].start) {
//                 return setEditError(`Prize positions must remain continuous (gap after #${sorted[i].end}).`);
//             }
//         }

//         const title = generatePrizeTitle(start, end);
//         const updatedPrizes = prizes.map(p =>
//             p.id === editingId ? { ...p, start, end, amount, title, coinType: editData.coinType } : p
//         );

//         setPrizes(updatedPrizes.sort((a, b) => a.start - b.start));
//         cancelEditing();
//     }, [editData, prizes, editingId, setPrizes]);

//     // --- Render ---
//     return (
//         <div className="font-inter">
//             {/* Existing Prizes Display */}
//             <h2 className="text-lg font-bold mb-4">Allocated Prizes ({prizes.length})</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
//                 {sortedPrizes.length > 0 ? (
//                     sortedPrizes.map((prize) => (
//                         <div key={prize.id} className="prize-card bg-bg-primary p-4 rounded-xl border flex flex-col justify-between">
//                             {editingId === prize.id ? (
//                                 <>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <input
//                                             type="number"
//                                             value={editData.start}
//                                             onChange={(e) => setEditData(prev => ({ ...prev, start: e.target.value }))}
//                                             className="w-16 bg-bg-primary border border-gray-600 rounded-lg px-4 py-2 text-center"
//                                             min="1"
//                                         />
//                                         <span className="mx-1 text-gray-400">-</span>
//                                         <input
//                                             type="number"
//                                             value={editData.end}
//                                             onChange={(e) => setEditData(prev => ({ ...prev, end: e.target.value }))}
//                                             className="w-16 bg-bg-primary border border-gray-600 rounded-lg px-4 py-2 text-center"
//                                             min={editData.start}
//                                         />
//                                         <Award className="w-5 h-5 text-yellow-500 ml-auto" />
//                                     </div>
//                                     <div className="flex items-center space-x-2 mb-3">
//                                         <input
//                                             type="number"
//                                             value={editData.amount}
//                                             onChange={(e) => setEditData(prev => ({ ...prev, amount: e.target.value }))}
//                                             className="w-full bg-bg-primary border border-gray-600 rounded-lg p-2"
//                                             placeholder="Amount"
//                                             min="1"
//                                         />
//                                         <SelectInput
//                                             id="coin-type-edit"
//                                             value={editData.coinType}
//                                             options={[
//                                                 { label: "Coin", value: "coin" },
//                                                 { label: "Pixel", value: "pixel" },
//                                             ]}
//                                             inputClassName="py-2"
//                                             onChange={(value) => setEditData(prev => ({ ...prev, coinType: value }))}
//                                         />
//                                     </div>
//                                     <div className="flex justify-between mt-2">
//                                         <button
//                                             type="button"
//                                             onClick={saveEditedPrize}
//                                             className="px-4 py-2 text-xs text-green-400 border border-green-500 rounded-lg flex items-center"
//                                         >
//                                             <Save className="w-3 h-3 mr-1" /> Save
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={cancelEditing}
//                                             className="px-4 py-2 text-xs text-red-400 border border-red-500 rounded-lg flex items-center"
//                                         >
//                                             <X className="w-3 h-3 mr-1" /> Cancel
//                                         </button>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <>
//                                     <div className="flex items-center justify-between mb-3">
//                                         <span className="text-lg font-bold text-purple-400">{prize.title}</span>
//                                         <Award className="w-5 h-5 text-yellow-500" />
//                                     </div>
//                                     <div className="flex items-center space-x-2">
//                                         <span className="text-3xl font-extrabold">{prize.amount}</span>
//                                         <span className="text-sm text-gray-400 capitalize">{prize.coinType}</span>
//                                     </div>
//                                     <div className="mt-4 flex justify-between">
//                                         <button
//                                             type="button"
//                                             onClick={() => startEditing(prize)}
//                                             className="px-4 py-2 text-xs text-blue-400 border border-blue-500 rounded-lg flex items-center"
//                                         >
//                                             <Edit3 className="w-3 h-3 mr-1" /> Edit
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={() => removePrize(prize.id)}
//                                             className="px-4 py-2 text-xs text-red-400 border border-red-500 rounded-lg flex items-center"
//                                         >
//                                             <Trash2 className="w-3 h-3 mr-1" /> Remove
//                                         </button>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     ))
//                 ) : (
//                     <div className="col-span-full text-center py-8 /50 rounded-lg border border-dashed border-gray-700">
//                         <p className="text-gray-500 !text-center">No prizes allocated yet. Start adding from position 1.</p>
//                     </div>
//                 )}
//             </div>

//             {editError && (
//                 <div className="mb-6 p-2 bg-red-500/40 border border-red-900 rounded-lg flex items-start">
//                     <AlertTriangle className="w-4 h-4 text-red-900 mr-2 flex-shrink-0 mt-0.5" />
//                     <span className="text-red-900 font-medium text-xs">{editError}</span>
//                 </div>
//             )}

//             {/* Add New Prize Form */}
//             <div className="p-6 rounded-xl border border-purple-600/50">
//                 <div className="flex justify-between items-center mb-4">
//                     <SelectInput
//                         value={coinType}
//                         id="coin-type"
//                         options={[
//                             { label: "Coin", value: "coin" },
//                             { label: "Pixel", value: "pixel" },
//                         ]}
//                         onChange={(value) => setCoinType(value)}
//                     />
//                     <div>
//                         <div className="flex items-center space-x-4 mb-3 p-4 bg-bg-primary rounded-lg border border-gray-600 w-fit">
//                             <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 cursor-pointer">
//                                 <input
//                                     type="radio"
//                                     name="prizeType"
//                                     checked={!isRange}
//                                     onChange={() => {
//                                         setIsRange(false);
//                                         setNewEnd('');
//                                         if (newStart) setNewEnd(newStart);
//                                     }}
//                                     className="form-radio text-purple-600 h-4 w-4 bg-gray-900 border-gray-500 focus:ring-purple-500"
//                                 />
//                                 <span>Single Position</span>
//                             </label>
//                             <label className="flex items-center space-x-2 text-sm font-medium text-gray-400 cursor-pointer">
//                                 <input
//                                     type="radio"
//                                     name="prizeType"
//                                     checked={isRange}
//                                     onChange={() => setIsRange(true)}
//                                     className="form-radio text-purple-600 h-4 w-4 bg-gray-900 border-gray-500 focus:ring-purple-500"
//                                 />
//                                 <span>Range Prize</span>
//                             </label>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//                     <div className="md:col-span-2 flex flex-col">
//                         {isRange ? (
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div className="flex flex-col">
//                                     <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="start-pos-range">Start Position</label>
//                                     <input
//                                         id="start-pos-range"
//                                         type="number"
//                                         placeholder={nextRequiredStart.toString()}
//                                         value={newStart}
//                                         onChange={(e) => setNewStart(e.target.value)}
//                                         className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
//                                         min="1"
//                                     />
//                                 </div>
//                                 <div className="flex flex-col">
//                                     <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="end-pos">End Position</label>
//                                     <input
//                                         id="end-pos"
//                                         type="number"
//                                         placeholder={newStart || nextRequiredStart.toString()}
//                                         value={newEnd}
//                                         onChange={(e) => setNewEnd(e.target.value)}
//                                         className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
//                                         min={newStart || '1'}
//                                     />
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="flex flex-col">
//                                 <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="position-single">Position (Serial Number)</label>
//                                 <input
//                                     id="position-single"
//                                     type="number"
//                                     placeholder={nextRequiredStart.toString()}
//                                     value={newStart}
//                                     onChange={(e) => {
//                                         const value = e.target.value;
//                                         setNewStart(value);
//                                         setNewEnd(value);
//                                     }}
//                                     className="w-full bg-bg-primary p-3 rounded-lg border border-gray-600 focus:ring-0 focus:outline-none transition"
//                                     min="1"
//                                 />
//                             </div>
//                         )}
//                     </div>
//                     <div className="flex flex-col">
//                         <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="amount">Prize Amount (Coins)</label>
//                         <input
//                             id="amount"
//                             type="number"
//                             placeholder="e.g., 100"
//                             value={newAmount}
//                             onChange={(e) => setNewAmount(e.target.value)}
//                             className="w-full bg-bg-primary p-3 rounded-lg border focus:outline-none focus:ring-0 transition"
//                             min="1"
//                         />
//                     </div>
//                     <Button text="Add Prize" onClick={validateAndAddPrize} className="w-full py-4" type="button" />
//                 </div>

//                 {error && (
//                     <div className="mt-4 p-3 bg-red-500/40 border border-red-900 rounded-lg flex items-start">
//                         <AlertTriangle className="w-5 h-5 text-red-900 mr-2 flex-shrink-0 mt-0.5" />
//                         <span className="text-red-900 font-medium text-sm">{error}</span>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PrizesInput;


import Button from '@/components/shared/buttons/button';
import SelectInput from '@/components/shared/inputs/select-input';
import { AlertTriangle, Award, Save, Trash2, X } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';

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

const PrizesInput = ({ prizes, setPrizes }: { prizes: any[], setPrizes: any }) => {
    // --- Shared State ---
    const [error, setError] = useState('');
    const [coinType, setCoinType] = useState('coin');

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
            prizeId: Date.now(), // Local unique ID for UI tracking
            // id: null, // Reserved for DB id
            min,
            max,
            coin,
            title,
            coinType,
        };

        setPrizes([...prizes, newPrize]);
        setNewMin('');
        setNewMax('');
        setNewCoin('');
    }, [newMin, newMax, newCoin, prizes, nextRequiredMin, coinType, setPrizes]);

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
            coinType: prize.coinType,
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
                        <div key={prize.prizeId} className="prize-card bg-bg-primary p-4 rounded-xl border flex flex-col justify-between">
                            {editingPrizeId === prize.prizeId ? (
                                <>
                                    <div className="flex items-center justify-between mb-3">
                                        <input
                                            type="number"
                                            value={editData.min}
                                            onChange={(e) => setEditData(prev => ({ ...prev, min: e.target.value }))}
                                            className="w-16 bg-bg-primary border border-gray-600 rounded-lg px-4 py-2 text-center"
                                            min="1"
                                        />
                                        <span className="mx-1 text-gray-400">-</span>
                                        <input
                                            type="number"
                                            value={editData.max}
                                            onChange={(e) => setEditData(prev => ({ ...prev, max: e.target.value }))}
                                            className="w-16 bg-bg-primary border border-gray-600 rounded-lg px-4 py-2 text-center"
                                            min={editData.min}
                                        />
                                        <Award className="w-5 h-5 text-yellow-500 ml-auto" />
                                    </div>
                                    <div className="flex items-center space-x-2 mb-3">
                                        <input
                                            type="number"
                                            value={editData.coin}
                                            onChange={(e) => setEditData(prev => ({ ...prev, coin: e.target.value }))}
                                            className="w-full bg-bg-primary border border-gray-600 rounded-lg p-2"
                                            placeholder="Coins"
                                            min="1"
                                        />
                                        <SelectInput
                                            id="coin-type-edit"
                                            value={editData.coinType}
                                            options={[
                                                { label: "Coin", value: "coin" },
                                                { label: "Pixel", value: "pixel" },
                                            ]}
                                            inputClassName="py-2"
                                            onChange={(value) => setEditData(prev => ({ ...prev, coinType: value }))}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <button
                                            type="button"
                                            onClick={saveEditedPrize}
                                            className="px-4 py-2 text-xs text-green-400 border border-green-500 rounded-lg flex items-center"
                                        >
                                            <Save className="w-3 h-3 mr-1" /> Save
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelEditing}
                                            className="px-4 py-2 text-xs text-red-400 border border-red-500 rounded-lg flex items-center"
                                        >
                                            <X className="w-3 h-3 mr-1" /> Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-lg font-bold text-purple-400">{prize.title}</span>
                                        <Award className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <div className="flex items-center justify-center space-x-2">
                                        <span className="text-3xl font-extrabold">{prize.coin}</span>
                                        <span className="text-sm text-gray-400 capitalize">{prize.coinType}</span>
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        {/* <button
                                            type="button"
                                            onClick={() => startEditing(prize)}
                                            className="px-4 py-2 text-xs text-blue-400 border border-blue-500 rounded-lg flex items-center"
                                        >
                                            Edit
                                        </button> */}
                                        <button
                                            type="button"
                                            onClick={() => removePrize(prize.prizeId)}
                                            className="px-4 py-2 text-xs mx-auto text-red-400 border border-red-500 rounded-lg flex items-center"
                                        >
                                            <Trash2 className="w-3 h-3 mr-1" /> Remove
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
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
                        value={coinType}
                        id="coin-type"
                        options={[
                            { label: "Coin", value: "coin" },
                            { label: "Pixel", value: "pixel" },
                        ]}
                        onChange={(value) => setCoinType(value)}
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
                        <label className="text-sm font-medium text-gray-400 mb-1" htmlFor="coin">Prize Coins</label>
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



