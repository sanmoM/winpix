import { useEffect, useState } from 'react';

import ScoreContent from '@/components/jury-contest/score-content';
import BorderButton from '@/components/shared/buttons/border-button';
import Button from '@/components/shared/buttons/button';
import NoData from '@/components/shared/no-data';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { route } from 'ziggy-js';

interface FlashProps {
    success?: string;
    error?: string;
}

interface EditProps {
    item: {
        id: number;
        name: string;
        description: string;
        status: string;
    };
    flash?: FlashProps;
}

export default function Edit({ image, vote }: EditProps) {
    const [score, setScore] = useState<number | null>(vote?.score ?? 5);

    const handleVote = async (votedImageId: number, questId: number) => {
        if (score === null || isNaN(score)) {
            toast.error('Please enter a score');
            return;
        }
        try {
            await axios.post(route('lead_judge.lead_judge_score', votedImageId), {
                image_id: votedImageId,
                score,
                quest_id: questId,
            });
        } catch (error) {
            console.error('❌ Vote failed:', error);
        }
        router.visit(route('lead_judge.declearWinner', image?.quest_id));
    };

    const { t } = useLocales()

    const breadcrumbs = t('dashboard.questCategory.edit.breadcrumbs', {
        returnObjects: true,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <Head title={t('dashboard.questCategory.edit.title')} />
            <ToastContainer />

            <div
                className="flex h-[70vh] flex-col p-4"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <form
                    // onClick={(e) => e.stopPropagation()}
                    onSubmit={(e) => {
                        e.preventDefault();
                        // console.log("first")
                        handleVote(
                            image?.id,
                            image?.quest_id,
                        );
                    }}
                    className="my-auto gap-4 overflow-hidden flex h-full flex-col w-xl"
                >
                    <ScoreContent image={image?.image} setScore={setScore} score={score} />
                    <div className='grid grid-cols-2 gap-4 w-fit mx-auto mb-1'>
                        <BorderButton
                            type={"button"}
                            text={'Back'}
                            onClick={(e) => {
                                e.preventDefault();
                                // router.back();
                            }}
                            className="mt-4 px-10 py-1.5 !text-lg"
                        />
                        <Button
                            text={'Save'}
                            className="mt-4 px-10 py-1.5 !text-lg"
                        />
                    </div>
                </form>

            </div>
        </AppLayout>
    );
}
