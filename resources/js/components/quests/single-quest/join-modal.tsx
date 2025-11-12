import React, { useEffect, useRef } from 'react';
import { FiUploadCloud } from 'react-icons/fi';

const JoinModal = ({ handleJoinQuest, image, setImage }: any) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    // Update preview when image changes
    useEffect(() => {
        if (image) {
            const url = URL.createObjectURL(image);
            setImageUrl(url);

            // Cleanup old object URL
            return () => URL.revokeObjectURL(url);
        } else {
            setImageUrl(null);
        }
    }, [image]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file.');
            return;
        }

        setImage(file);
    };

    return (
        <div>
            {/* Body Content */}
            <div className="">
                {/* Submission Rules Text */}
                <p className="text-gray-700 mb-6 text-sm">
                    Submissions must be <strong>photography</strong>, submissions must be <strong>your own</strong>, and submissions must not be <strong>AI generated</strong>.
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
                        <span className="text-sm font-medium text-gray-800">
                            Upload from Device
                        </span>
                    </button>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Quest Library Button */}
                    <button
                        className="flex-1 flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm hover:border-indigo-500 transition duration-150 ease-in-out cursor-pointer"
                    >
                        <svg
                            className="w-10 h-10 mb-2 text-gray-600"
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
                        <span className="text-sm font-medium text-gray-800">Quest Library</span>
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
                            onClick={() => setImage(null)}
                        >
                            Remove Image
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JoinModal;
