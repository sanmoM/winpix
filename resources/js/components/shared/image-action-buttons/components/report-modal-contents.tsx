import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import PillButton from '../../buttons/pill-button';
import TextAreaInput from '../../inputs/text-area-input';
import toast from 'react-hot-toast';

export default function ReportModalContents({ data, setIsOpen }: any) {
    const reasons = [
        "Offensive (rude, obscene)",
        "Copyright (plagiarism, stealing)",
        "NSFW content",
        "Content type (3D, illustration, AI)"
    ];
    const [selectedReason, setSelectedReason] = useState('Content type (3D, illustration, AI)');
    const [otherReason, setOtherReason] = useState('');

    const { post } = useForm<any>({
        image_id: data?.id,
        reason: otherReason || selectedReason
    })

    const handleReport = () => {
        post(route('report'),
            {
                onSuccess: () => {
                    toast.success('Report submitted successfully!')
                    setSelectedReason('Content type (3D, illustration, AI)')
                    setOtherReason('')
                    setIsOpen(false)
                }
            }
        )
    }



    return (
        <div>

            <div className="flex flex-col gap-3 mb-6 mt-2">
                {reasons.map((reason) => (
                    <button
                        key={reason}
                        onClick={() => {
                            setSelectedReason(reason)
                            setOtherReason('')
                        }}
                        className={`w-max cursor-pointer max-w-full px-5 py-2.5 rounded-full text-sm font-medium transition-all text-left truncate ${selectedReason === reason && !otherReason
                            ? 'bg-primary-color text-white shadow-md'
                            : ' text-gray-500 dark:text-gray-300 border-1'
                            }`}
                    >
                        {reason}
                    </button>
                ))}
            </div>

            <div className="mb-4">
                <TextAreaInput
                    label='Others'
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder='Type your reason here'
                />
            </div>


            <PillButton
                onClick={handleReport}
                label="Report"
                className='bg-primary-color hover:bg-background block mx-auto px-10 hover:border-primary-color border-1'
            />
        </div>
    )
}
