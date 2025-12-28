import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Button from '../shared/buttons/button';
import TextInput from '../shared/inputs/text-input';
import NoData from '../shared/no-data';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { route } from 'ziggy-js';

interface QuestImage {
    id: number;
    image: string;
}

interface ModalProps {
    questImages: QuestImage[];
}

const ScoreModal: React.FC<ModalProps> = ({ questImages }) => {
    const [score, setScore] = useState<number | null>(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0);
    }, []);

    const handleVote = async (votedImageId: number, questId: number) => {

        console.log("first")
        if (score === null || isNaN(score)) {
            toast.error('Please enter a score');
            return;
        }
        try {
            const response = await axios.post(
                route('judge.vote'),
                { image_id: votedImageId, score, quest_id: questId },
            );
        } catch (error) {
            console.error('❌ Vote failed:', error);
        }

        setTimeout(() => {
            if (currentIndex + 1 < questImages.length) {
                setCurrentIndex(currentIndex + 1);
            } else {
                router.visit('/judge/contest');
            }
        }, 800);
    };

    // const handleSkip = async (votedImageId: number) => {
    //     try {
    //         const response = await axios.post(`/skip-vote/${votedImageId}/${questId}`, { image_id: votedImageId, score, quest_id: questId });
    //     } catch (error) {
    //         console.error('❌ Skip failed:', error);
    //     }

    //     setTimeout(() => {
    //         setLikedId(null);
    //         if (currentIndex + 2 < questImages.length) {
    //             setCurrentIndex(currentIndex + 2);
    //         } else {
    //             window.location.reload();
    //         }
    //     }, 800);
    // };

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
                        handleVote(singleQuestImage.id, singleQuestImage.quest_id)
                    }}
                    className="my-auto gap-4 overflow-hidden h-full"
                >
                    <div
                        className="group relative cursor-pointer overflow-hidden rounded-lg flex flex-col w-xl h-full"
                    >
                        <div className='flex-1 overflow-hidden bg-bg-primary mb-3 rounded-xl'>
                            <img
                                src={'/storage/' + singleQuestImage?.image}
                                alt={`Photo ${singleQuestImage?.id}`}
                                className="h-full w-full rounded-md object-contain duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className='mx-3'>
                            <TextInput
                                min={0}
                                max={10}
                                label="Score"
                                placeholder="Enter score"
                                type="number"
                                setValue={(value) => setScore(parseInt(value))}
                                value={score}
                            />
                            <Button
                                text={'Next'}
                                // onClick={() => handleVote(singleQuestImage.id, singleQuestImage.quest_id)}
                                className="mt-4 px-10 py-1.5 !text-lg"
                            />
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
