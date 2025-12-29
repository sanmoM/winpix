import React, { useEffect, useState } from 'react';

import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { route } from 'ziggy-js';
import Button from '../shared/buttons/button';
import TextInput from '../shared/inputs/text-input';
import NoData from '../shared/no-data';
import BorderButton from '../shared/buttons/border-button';

interface QuestImage {
    id: number;
    image: string;
}

interface ModalProps {
    questImages: QuestImage[];
}

const ScoreModal: React.FC<ModalProps> = ({ questImages }) => {
    const [score, setScore] = useState<number | null>(1);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0);
    }, []);

    const handleVote = async (votedImageId: number, questId: number) => {
        if (score === null || isNaN(score)) {
            toast.error('Please enter a score');
            return;
        }
        try {
            const response = await axios.post(route('judge.vote'), {
                image_id: votedImageId,
                score,
                quest_id: questId,
            });
        } catch (error) {
            console.error('❌ Vote failed:', error);
        }

        if (currentIndex + 1 < questImages.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            router.visit('/judge/contest');
        }
    };

    const handleSkip = async (votedImageId: number, questId: number) => {
        try {
            const response = await axios.post(route('judge.vote'), {
                image_id: votedImageId,
                score: 0,
                quest_id: questId,
            });
        } catch (error) {
            console.error('❌ Vote failed:', error);
        }

        if (currentIndex + 1 < questImages.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            router.visit('/judge/contest');
        }
    };

    const singleQuestImage = questImages[currentIndex];

    return (
        <div
            className="flex h-[70vh] flex-col"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {questImages?.length > 0 ? (
                <form
                    // onClick={(e) => e.stopPropagation()}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleVote(
                            singleQuestImage.id,
                            singleQuestImage.quest_id,
                        );
                    }}
                    className="my-auto h-full gap-4 overflow-hidden"
                >
                    <div className="group relative flex h-full w-xl cursor-pointer flex-col overflow-hidden rounded-lg">
                        <div className="mb-3 flex-1 overflow-hidden rounded-xl bg-bg-primary">
                            <img
                                src={'/storage/' + singleQuestImage?.image}
                                alt={`Photo ${singleQuestImage?.id}`}
                                className="h-full w-full rounded-md object-contain duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="mx-3">
                            <TextInput
                                min={1}
                                max={10}
                                label="Score"
                                placeholder="Enter score"
                                type="number"
                                setValue={(value) => setScore(parseInt(value))}
                                value={score}
                            />
                            <div className='grid grid-cols-2 gap-4 w-fit mx-auto mb-1'>
                                <BorderButton
                                    type={"button"}
                                    text={'Skip'}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSkip(singleQuestImage.id, singleQuestImage.quest_id)
                                    }}
                                    className="mt-4 px-10 py-1.5 !text-lg"
                                />
                                <Button
                                    text={'Next'}
                                    // onClick={() => handleVote(singleQuestImage.id, singleQuestImage.quest_id)}
                                    className="mt-4 px-10 py-1.5 !text-lg"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <NoData text="No more images" />
            )}
        </div>
    );
};

export default ScoreModal;
