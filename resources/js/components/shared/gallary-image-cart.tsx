import { cn } from "@/lib/utils";
import { FaRegHeart } from "react-icons/fa";
import { GrFlag } from "react-icons/gr";
import { LuShare2 } from "react-icons/lu";

export default function GalleryImageCart({ src, aspect, className }: any) {
    return (
        <div
            className={cn(`relative group cursor-pointer overflow-hidden rounded-lg `, className, aspect)}
        >
            <img
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                src={src}
                alt={`Gallery image `}
            />

            {/* Overlay buttons */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all rounded-lg gap-2 opacity-0 group-hover:opacity-100 duration-300">
                <div className="bg-primary-color p-3 rounded-full">
                    <FaRegHeart className="text-xl text-white" />
                </div>
                <div className="bg-primary-color p-3 rounded-full">
                    <LuShare2 className="text-xl text-white" />
                </div>
                <div className="bg-primary-color p-3 rounded-full">
                    <GrFlag className="text-xl text-white" />
                </div>
            </div>

            {/* User info */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 duration-300">
                <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={src}
                    alt={`User avatar`}
                />
                <p className="text-xl font-medium">Name</p>
            </div>
        </div>
    )
}
