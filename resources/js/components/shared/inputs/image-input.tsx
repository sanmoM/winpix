"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";

export default function ImageInput({
    image,
    setImage,
    containerClassName,
    iconClassName,
    wrapperClassName,
    id,
    name,
}: {
    image: string | File | null;
    setImage: (image: string | File | null) => void;
    containerClassName?: string;
    iconClassName?: string;
    wrapperClassName?: string;
}) {
    const inputId = useId(); // ✅ unique ID per component instance

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };


    const getImageSrc = () => {
        if (!image) return null;
        if (typeof image === "string") return image;
        if (image instanceof File) return URL.createObjectURL(image);
        return null;
    };

    const imgSrc = getImageSrc();


    return (
        <div className={cn("flex items-center justify-center w-full border-dashed rounded-lg bg-bg-primary", !image && "border  border-primary", wrapperClassName)}>
            <label
                htmlFor={inputId} // ✅ use unique ID here
                className={cn(
                    "flex flex-col items-center justify-center w-full h-full  border-gray-300 border-dashed rounded-lg cursor-pointer bg-tertiary overflow-hidden",
                    containerClassName
                )}
            >
                <div className="flex flex-col items-center justify-center">
                    {!imgSrc && (
                        <>
                            <svg
                                className={cn("w-[10%] aspect-square text-primary", iconClassName)}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 
                     0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 
                     5.021C5.137 5.017 5.071 5 5 
                     5a4 4 0 0 0 0 8h2.167M10 
                     15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                        </>
                    )}
                </div>

                <input
                    name={name}
                    id={inputId} // ✅ unique input per component
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {imgSrc && (
                    <img
                        src={imgSrc}
                        alt="Selected"
                        className="w-full h-full object-cover"
                    />
                )}
            </label>
        </div>
    );
}