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
            {questImages?.length > 0 ? (
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
            ) : (
                <NoData text="No more images" />
            )}
        </div>
    );
};

export default ScoreModal;
