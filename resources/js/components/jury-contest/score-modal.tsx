import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Button from '../shared/buttons/button';
import TextInput from '../shared/inputs/text-input';
import NoData from '../shared/no-data';

interface QuestImage {
    id: number;
    image: string;
}

interface ModalProps {
    questImages: QuestImage[];
    questId: number;
}

const ScoreModal: React.FC<ModalProps> = ({ questImages }) => {
    const [score, setScore] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedId, setLikedId] = useState<number | null>(null);

    useEffect(() => {
        setCurrentIndex(0);
        setLikedId(null);
    }, []);

    const handleVote = async (votedImageId: number, questId: number) => {
        console.log(votedImageId, questId);
        return;
        setLikedId(votedImageId);

        try {
            const response = await axios.post(
                `/judge/vote/${votedImageId}/${questId}`,
                { image_id: votedImageId, score, quest_id: questId },
            );
        } catch (error) {
            console.error('❌ Vote failed:', error);
        }

        setTimeout(() => {
            setLikedId(null);
            if (currentIndex + 2 < questImages.length) {
                setCurrentIndex(currentIndex + 2);
            } else {
                window.location.reload();
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
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="my-auto gap-4 overflow-hidden h-full"
                >
                    <div
                        className="group relative cursor-pointer overflow-hidden rounded-lg flex flex-col w-xl h-full"
                        onClick={() => handleVote(singleQuestImage?.id, singleQuestImage?.quest_id)}
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
                                label="Score"
                                placeholder="Enter score"
                                type="number"
                                setValue={setScore}
                                value={score}
                            />
                            <Button
                                text={'Next'}
                                onClick={() => handleVote(singleQuestImage.id)}
                                className="mt-4 px-10 py-1.5 !text-lg"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <NoData text="No more images" />
            )}
        </div>
    );
};

export default ScoreModal;
