import React, { useState, useRef, ChangeEvent, MouseEvent } from 'react';
import { Camera, User } from 'lucide-react';

// Main Profile Image Input Component
const EditProfilePhoto: React.FC = () => {
    // State to hold the URL of the selected image for preview. 
    // It can be a string (URL) or null.
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    // Ref for the hidden file input element. 
    // We specify its type as HTMLInputElement or null (initial value).
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handles the file selection when the input changes.
    // The event type is ChangeEvent<HTMLInputElement> for file inputs.
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        // We use optional chaining here as event.target.files might be null or undefined
        const file = event.target.files?.[0];

        if (file) {
            // Create a URL for the file to use as the image source
            const reader = new FileReader();

            // Specify the type for the reader onloadend event
            reader.onloadend = (e: ProgressEvent<FileReader>) => {
                // e.target?.result holds the Data URL string
                setImagePreviewUrl(e.target?.result as string);
            };

            reader.readAsDataURL(file);
        } else {
            setImagePreviewUrl(null);
        }
    };

    // Function to programmatically trigger the hidden file input.
    // We specify its type as MouseEvent<HTMLButtonElement> or just React.MouseEventHandler<HTMLButtonElement>
    const triggerFileInput = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent potential form submission if button is inside a form

        // Check if the ref exists and its current value is an HTMLInputElement
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="relative w-32 h-32 md:w-40 md:h-40 group">
            {/* 1. Profile Image Container (Circular) */}
            <div className="w-full h-full rounded-full overflow-hidden shadow-xl border-4 border-white transition duration-300 group-hover:shadow-2xl">
                {imagePreviewUrl ? (
                    // Display selected image preview
                    <img
                        src={imagePreviewUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-70"
                    />
                ) : (
                    // Default placeholder icon
                    <div className="w-full h-full bg-bg-primary flex items-center justify-center text-gray-500 transition-opacity duration-300 group-hover:opacity-70">
                        {/* User icon from lucide-react */}
                        <User className="w-1/2 h-1/2" strokeWidth={1} />
                    </div>
                )}
            </div>

            {/* 2. Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef as React.RefObject<HTMLInputElement>}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
            />

            {/* 3. Upload Button Overlay */}
            <button
                type="button"
                onClick={triggerFileInput}
                className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer focus:outline-none"
                aria-label="Change profile image"
            >
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center">
                    {/* Camera icon from lucide-react */}
                    <Camera className="w-8 h-8 text-white transition-transform transform group-hover:scale-110" />
                </div>
            </button>

            {/* Optional: Indicator for successful selection */}
            {imagePreviewUrl && (
                <span className="absolute bottom-0 right-0 block h-6 w-6 rounded-full ring-4 ring-white bg-green-500 flex items-center justify-center text-white text-xs">
                    {/* Checkmark SVG */}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </span>
            )}
        </div>
    );
};

export default EditProfilePhoto;