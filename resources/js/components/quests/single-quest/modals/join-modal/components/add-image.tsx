import Button from '@/components/shared/buttons/button';
import React, { useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

export default function AddImage({ setImage, t, setLibraryModalOpen, setJoinModalOpen, handleAddImage }: any) {

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    // const imageUrl = image && URL.createObjectURL(image?.file);
    const [imageUrl, setImageUrl] = useState<any>(null);
    // Trigger file picker
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Optional: Validate type (e.g. only images)
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }

        setImage(file);
        setImageUrl(URL.createObjectURL(file));
    };
    return (
        <div>
            {/* Body Content */}
            <div className="">
                {/* Submission Rules Text */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">
                    {t("singleQuest.joinedQuestModal.description")}
                </p>

                {/* Buttons/Options Container */}
                <div className="flex space-x-4">
                    {/* Upload from Device Button */}
                    <button
                        type='button'
                        onClick={handleUploadClick}
                        className="flex-1 flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm hover:border-indigo-500 transition duration-150 ease-in-out cursor-pointer"
                    >
                        <FiUploadCloud className="text-4xl mb-1" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {t('singleQuest.joinedQuestModal.uploadFromDevice')}
                        </span>
                    </button>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Quest Library Button */}
                    <button
                        type='button'
                        onClick={() => {
                            setLibraryModalOpen(true)
                            setJoinModalOpen(false)
                        }}
                        className="flex-1 flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm hover:border-indigo-500 transition duration-150 ease-in-out cursor-pointer"
                    >
                        <svg
                            className="w-10 h-10 mb-2 "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {t("singleQuest.joinedQuestModal.uploadFromLibrary")}
                        </span>
                    </button>
                </div>

                {/* Image Preview */}
                {imageUrl && (
                    <div className="mt-6 text-center">
                        <img
                            src={imageUrl}
                            alt="Selected"
                            className="max-h-48 mx-auto rounded-lg shadow-md"
                        />
                        <button
                            className="mt-2 lg:mt-4 text-sm text-red-500 hover:underline mx-auto block cursor-pointer"
                            type='button'
                            onClick={() => {
                                setImage(null);
                                setImageUrl(null);
                            }}
                        >
                            Remove Image
                        </button>
                    </div>
                )}

                {
                    imageUrl && <div>
                        {/* <Button text={t(isJoined ? 'singleQuest.banner.addEntryText' : 'singleQuest.banner.joinNowText')}
                            onClick={handleAddImage}
                            className='mt-4 px-6 lg:px-14 text-lg'
                        /> */}
                        <Button type={"button"} text={t('singleQuest.banner.next')}
                            onClick={handleAddImage}
                            className='mt-4 px-6 lg:px-14 text-lg'
                        />
                    </div>
                }

            </div>
        </div>
    )
}
