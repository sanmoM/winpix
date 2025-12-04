import useLocales from "@/hooks/useLocales";
import { cn } from "@/lib/utils";
import { JSX, useState } from "react";
import ImageActionButtons from "./image-action-buttons/image-action-buttons";
import ImageView from "./image-view/image-view";

export default function GalleryImageCart({ item, aspect, className, actionButtons = (< ImageActionButtons />), onClick }: any) {
    const { direction } = useLocales()

    return (
        <div
            className={cn(`relative group cursor-pointer overflow-hidden rounded-lg `, className, aspect)}
            onClick={onClick}
        >
            <img
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                src={"/storage/" + item?.image}
                alt={`Gallery image `}
            />

            {/* Overlay buttons */}

            {actionButtons}
            {/* User info */}
            <div className={cn("absolute bottom-4 left-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 duration-300", direction === "left" ? "left-4" : "right-4")}>
                <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={item?.user?.image ? "/storage/" + item?.user?.image : "/images/user-avatar.png"}
                    alt={`User avatar`}
                />
                <p className="text-xl font-medium">{item?.user?.name}</p>
            </div>


        </div>
    )
}
