import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface QuestImage {
  id: number;
  url: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  questImages: QuestImage[];
}

const VoteModal: React.FC<ModalProps> = ({ isOpen, onClose, questImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0); // reset when modal opens
    }
  }, [isOpen]);

  if (!isOpen || questImages?.length === 0) return null;

  // Slice two images at a time
  const currentPair = questImages?.slice(currentIndex, currentIndex + 2);

  const handleVote = (votedImageId: number) => {

    // Move to next pair
    if (currentIndex + 2 < questImages?.length) {
      setCurrentIndex(currentIndex + 2);
    } else {
      // No more images, close modal
      onClose();
    }
  };

  return (
    <div
      // onClick={onClose}
      className="fixed inset-0 dark:bg-black bg-white z-50  transition-opacity duration-300 backdrop-blur-sm h-screen flex flex-col"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center ml-[5%] mt-[30px] border w-fit px-6 py-1.5 rounded-full cursor-pointer"
        onClick={onClose}
      >
        <IoIosArrowForward className=" text-2xl font-bold rotate-180" />
        <span>Back</span>
      </div>
      <div
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal content
        className="bg-white mx-auto my-auto dark:bg-gray-800  overflow-hidden grid grid-cols-2 gap-4 w-[90%]"
      >
        {currentPair?.map((singleQuestImage) => (
          <div key={singleQuestImage?.id} className="relative cursor-pointer group overflow-hidden rounded-lg">
            <img
              src={"/storage/" + singleQuestImage?.image}
              alt={`Photo ${singleQuestImage.id}`}
              className="w-full h-[80vh] object-cover rounded-md group-hover:scale-105 duration-300"
              onClick={() => handleVote(singleQuestImage?.id)}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 bg-black/50 dark:bg-white/50">
              <span className="text-white text-3xl font-bold">Vote</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoteModal;
