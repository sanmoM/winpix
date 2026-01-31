import { MdClose } from "react-icons/md";
import CustomSlider from "../../custom-slider/CustomSlider";
import ImageActionButtons from "../../image-action-buttons/image-action-buttons";
import ImageActionButton from "../../image-action-button";
import { useEffect, useState } from "react";

// --- Image Panel Component ---
const ImagePanel = ({ setIsOpen, data, index, hasClose = true, setImageIndex }: any) => {

    return (
        <div className="relative h-full bg-[var(--background)]">
            <CustomSlider mobileView={1} desktopView={1} tabletView={1} hasButton={data.length > 1} index={index}
                handleNextFunc={() => {
                    setImageIndex((prev: number) => (prev + 1) % data.length)
                }}
                handlePrevFunc={() => {
                    setImageIndex((prev: number) => (prev - 1 + data.length) % data.length)
                }}>
                {
                    data.map((item, index) => (
                        <div className="flex justify-center items-center overflow-hidden h-[50vh] lg:h-screen">
                            <img
                                key={index}
                                src={`/storage/${item?.image}`}
                                alt="Old Crane in Gdansk at Night"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    // Fallback in case the image path is incorrect
                                    (e.target as HTMLImageElement).src =
                                        'https://placehold.co/1600x900/000000/333333?text=image_05841a.jpg';
                                }}
                            />
                            <div className="absolute top-4 right-4 z-[20] flex items-center gap-2">
                                <ImageActionButtons containerClassName="" data={{
                                    id: item?.id,
                                    image: item?.image,
                                    user: item?.user
                                }} />
                                {
                                    hasClose && <div
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                    >
                                        <ImageActionButton
                                            Icon={<MdClose className="text-xl text-white" />}
                                            onClick={() => {
                                                setIsOpen(false)
                                            }}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    ))
                }
            </CustomSlider>
        </div>
    )
};

export default ImagePanel;
