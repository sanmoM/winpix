
import { FaRegHeart } from "react-icons/fa";
import { GrFlag } from "react-icons/gr";
import { LuShare2 } from "react-icons/lu";
import ImageActionButton from "./image-action-button";

export default function ImageActionButtons() {
    return (
        <div className="flex items-center justify-center gap-2">
            <ImageActionButton Icon={<FaRegHeart className="text-xl text-white" />} />
            <ImageActionButton Icon={<LuShare2 className="text-xl text-white" />} />
            <ImageActionButton Icon={<GrFlag className="text-xl text-white" />} />
        </div>
    )
}
