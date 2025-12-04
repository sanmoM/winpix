
import { cn } from "@/lib/utils";
import { addToWishlist } from "@/store/features/wishlist";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { GrFlag } from "react-icons/gr";
import { LuShare2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import ImageActionButton from "../image-action-button";
import Modal from "../modal";
import ShareModalContents from "./components/share-modal-contents";
import ReportModalContents from "./components/report-modal-contents";

export default function ImageActionButtons({ data, containerClassName = "opacity-0 group-hover:opacity-100  bg-black/30 transition-all  duration-300 absolute inset-0 flex justify-center items-center" }: any) {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const wishlist = useSelector((state) => state.wishlist?.wishlist)
    const dispatch = useDispatch()
    return (
        <>
            <div className={cn("", containerClassName)}

            >
                <div
                    className="flex items-center justify-center gap-2 "
                    onClick={(event) => {
                        event.stopPropagation()
                    }}
                >
                    <ImageActionButton
                        onClick={() => dispatch(addToWishlist(data?.id))}
                        Icon={<FaRegHeart className="text-xl text-white" />}
                        className={cn(wishlist?.includes(data?.id) ? "bg-red-500" : "bg-primary-color")}
                    />
                    <ImageActionButton
                        onClick={() => setIsShareModalOpen(true)}
                        Icon={<LuShare2 className="text-xl text-white" />}
                    />
                    <ImageActionButton
                        onClick={() => setIsReportModalOpen(true)}
                        Icon={<GrFlag className="text-xl text-white" />}
                    />
                </div>
            </div>

            <Modal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                title="Share"
                containerClassName="max-w-lg"
            >
                <ShareModalContents data={data} />
            </Modal>
            <Modal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                title="Report"
                containerClassName="max-w-lg"
            >
                <ReportModalContents />
            </Modal>
        </>
    )
}
