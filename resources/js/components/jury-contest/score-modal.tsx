import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Button from '../shared/buttons/button';
import TextInput from '../shared/inputs/text-input';

interface QuestImage {
    id: number;
    image: string;
}

interface ModalProps {
    questImages: QuestImage[];
}

const ScoreModal: React.FC<ModalProps> = ({ questImages, questId }) => {
    const [score, setScore] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedId, setLikedId] = useState<number | null>(null);

    useEffect(() => {
        setCurrentIndex(0);
        setLikedId(null);
    }, []);

    const handleVote = async (votedImageId: number) => {
        setLikedId(votedImageId);

        try {
            const response = await axios.post(
                `/vote/${votedImageId}/${questId}`,
                { image_id: votedImageId },
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

    const handleSkip = async () => {
        try {
            const response = await axios.post(`/skip-vote/${null}/${questId}`);
        } catch (error) {
            console.error('❌ Skip failed:', error);
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

    const singleQuestImage = questImages[currentIndex];

    return (
        <div
            className="flex h-[70vh] flex-col"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* <div className="flex justify-between">
                <div
                    className="flex items-center ml-[5%] mt-[30px] border w-fit px-6 py-1.5 rounded-full cursor-pointer"
                    onClick={onClose}
                >
                    <IoIosArrowForward className="text-2xl font-bold rotate-180" />
                    <span>Back</span>
                </div>

                <div
                    className="flex items-center mr-[5%] mt-[30px] border w-fit px-6 py-1.5 rounded-full cursor-pointer"
                    onClick={handleSkip}
                >
                    <IoIosArrowForward className="text-2xl font-bold rotate-180" />
                    <span>Skip</span>
                </div>
            </div> */}

            {/* Image Grid */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="mx-auto my-auto gap-4 overflow-hidden"
            >
                <div
                    className="group relative cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => handleVote(singleQuestImage?.id)}
                >
                    <img
                        src={'/storage/' + singleQuestImage?.image}
                        alt={`Photo ${singleQuestImage?.id}`}
                        className="h-full w-full rounded-md object-cover duration-300 group-hover:scale-105"
                    />

                    {/* {
                        !likedId && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 bg-black/50 dark:bg-white/50">
                                <span
                                    className="text-7xl text-red-500"
                                >
                                    ❤️
                                </span>
                            </div>
                        )
                    }

                    {likedId === singleQuestImage.id && (
                        <span
                            className="absolute text-7xl text-red-500 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-like-burst select-none"
                        >
                            ❤️
                        </span>
                    )} */}
                    <TextInput
                        label="Score"
                        placeholder="Enter score"
                        type="number"
                        setValue={setScore}
                        value={score}
                    />
                    <Button
                        text={'Next'}
                        onClick={() => handleVote(singleQuestImage?.id)}
                        className="mt-4 px-10 py-1.5 !text-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default ScoreModal;
