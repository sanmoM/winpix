import { cn } from "@/lib/utils";
import ImageView from "./image-view/image-view";
import { JSX, useState } from "react";
import ImageActionButtons from "./image-action-buttons";
import useLocales from "@/hooks/useLocales";

export default function GalleryImageCart({ src, aspect, className, actionButtons = (< ImageActionButtons />) }: { src: string, aspect?: string, className?: string, actionButtons?: JSX.Element }) {
    const [isOpen, setIsOpen] = useState(false);
    const { direction } = useLocales()
    return (
        <div
            className={cn(`relative group cursor-pointer overflow-hidden rounded-lg `, className, aspect)}
            onClick={() => {
                setIsOpen(true)
            }}
        >
            <img
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                src={src}
                alt={`Gallery image `}
            />

            {/* Overlay buttons */}
            <div className="absolute inset-0 bg-black/30 transition-all opacity-0 group-hover:opacity-100 duration-300 flex justify-center items-center">
                {actionButtons}
            </div>

            {/* User info */}
            <div className={cn("absolute bottom-4 left-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 duration-300", direction === "left" ? "left-4" : "right-4")}>
                <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={src}
                    alt={`User avatar`}
                />
                <p className="text-xl font-medium">Name</p>
            </div>

            <ImageView isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}
