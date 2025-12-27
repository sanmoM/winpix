import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import axios from "axios";

interface QuestImage {
    id: number;
    image: string;
}

interface ModalProps {
    questImages: QuestImage[];
}

const ScoreModal: React.FC<ModalProps> = ({ questImages, questId }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedId, setLikedId] = useState<number | null>(null);

    useEffect(() => {
        setCurrentIndex(0);
        setLikedId(null);
    }, []);

    const handleVote = async (votedImageId: number) => {
        setLikedId(votedImageId);

        try {
            const response = await axios.post(`/vote/${votedImageId}/${questId}`, { image_id: votedImageId });
        } catch (error) {
            console.error("❌ Vote failed:", error);
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
            console.error("❌ Skip failed:", error);
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
            className="fixed inset-0 dark:bg-black bg-white z-50 transition-opacity duration-300 backdrop-blur-sm h-screen flex flex-col"
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
                className="bg-white mx-auto my-auto dark:bg-gray-800 overflow-hidden grid grid-cols-2 gap-4 w-[90%]"
            >
                <div
                    className="relative cursor-pointer group overflow-hidden rounded-lg"
                    onClick={() => handleVote(singleQuestImage.id)}
                >
                    <img
                        src={"/storage/" + singleQuestImage.image}
                        alt={`Photo ${singleQuestImage.id}`}
                        className="w-full h-[80vh] object-cover rounded-md group-hover:scale-105 duration-300"
                    />

                    {/* Hover Overlay */}
                    {
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

                    {/* ❤️ Like Animation */}
                    {likedId === singleQuestImage.id && (
                        <span
                            className="absolute text-7xl text-red-500 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-like-burst select-none"
                        >
                            ❤️
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScoreModal;
