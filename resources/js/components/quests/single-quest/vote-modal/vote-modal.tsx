// import React, { useState, useEffect } from "react";
// import { IoIosArrowForward } from "react-icons/io";

// interface QuestImage {
//   id: number;
//   url: string;
// }

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   questImages: QuestImage[];
// }

// const VoteModal: React.FC<ModalProps> = ({ isOpen, onClose, questImages }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (isOpen) {
//       setCurrentIndex(0); // reset when modal opens
//     }
//   }, [isOpen]);

//   if (!isOpen || questImages?.length === 0) return null;

//   // Slice two images at a time
//   const currentPair = questImages?.slice(currentIndex, currentIndex + 2);

//   const handleVote = (votedImageId: number) => {

//     // Move to next pair
//     if (currentIndex + 2 < questImages?.length) {
//       setCurrentIndex(currentIndex + 2);
//     } else {
//       // No more images, close modal
//       onClose();
//     }
//   };

//   return (
//     <div
//       // onClick={onClose}
//       className="fixed inset-0 dark:bg-black bg-white z-50  transition-opacity duration-300 backdrop-blur-sm h-screen flex flex-col"
//       aria-labelledby="modal-title"
//       role="dialog"
//       aria-modal="true"
//     >
//       <div className="flex items-center ml-[5%] mt-[30px] border w-fit px-6 py-1.5 rounded-full cursor-pointer"
//         onClick={onClose}
//       >
//         <IoIosArrowForward className=" text-2xl font-bold rotate-180" />
//         <span>Back</span>
//       </div>
//       <div
//         onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal content
//         className="bg-white mx-auto my-auto dark:bg-gray-800  overflow-hidden grid grid-cols-2 gap-4 w-[90%]"
//       >
//         {currentPair?.map((singleQuestImage) => (
//           <div key={singleQuestImage?.id} className="relative cursor-pointer group overflow-hidden rounded-lg">
//             <img
//               src={"/storage/" + singleQuestImage?.image}
//               alt={`Photo ${singleQuestImage.id}`}
//               className="w-full h-[80vh] object-cover rounded-md group-hover:scale-105 duration-300"
//               onClick={() => handleVote(singleQuestImage?.id)}
//             />
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 bg-black/50 dark:bg-white/50">
//               <span className="text-white text-3xl font-bold">Vote</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VoteModal;


import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";

import "./vote-modal.css";

interface QuestImage {
  id: number;
  image: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  questImages: QuestImage[];
}

const VoteModal: React.FC<ModalProps> = ({ isOpen, onClose, questImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedId, setLikedId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setLikedId(null);
    }
  }, [isOpen]);

  if (!isOpen || questImages?.length === 0) return null;

  const currentPair = questImages?.slice(currentIndex, currentIndex + 2);

  const handleVote = (votedImageId: number) => {
    setLikedId(votedImageId);

    // Delay for animation
    setTimeout(() => {
      setLikedId(null);
      if (currentIndex + 2 < questImages.length) {
        setCurrentIndex(currentIndex + 2);
      } else {
        onClose();
      }
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 dark:bg-black bg-white z-50 transition-opacity duration-300 backdrop-blur-sm h-screen flex flex-col"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Back Button */}
      <div
        className="flex items-center ml-[5%] mt-[30px] border w-fit px-6 py-1.5 rounded-full cursor-pointer"
        onClick={onClose}
      >
        <IoIosArrowForward className="text-2xl font-bold rotate-180" />
        <span>Back</span>
      </div>

      {/* Image Grid */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white mx-auto my-auto dark:bg-gray-800 overflow-hidden grid grid-cols-2 gap-4 w-[90%]"
      >
        {currentPair?.map((singleQuestImage) => (
          <div
            key={singleQuestImage.id}
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
        ))}
      </div>
    </div>
  );
};

export default VoteModal;
