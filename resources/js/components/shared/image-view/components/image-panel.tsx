import { useState } from "react";
import { MdClose } from "react-icons/md";
import CustomSlider from "../../custom-slider/CustomSlider";
import ImageActionButton from "../../image-action-button";
import ImageActionButtons from "../../image-action-buttons/image-action-buttons";

// --- Image Panel Component ---
const ImagePanel = ({ setIsOpen, data, index, hasClose = true, setImageIndex }: any) => {
    const [activeIndex, setActiveIndex] = useState(index);
    console.log(activeIndex, "activeIndex")
    return (
        <div className="relative h-full">
            <div className="absolute top-4 right-4 z-[20] flex items-center gap-2">
                <ImageActionButtons containerClassName="" data={{
                    id: data[activeIndex]?.id,
                    image: data[activeIndex]?.image,
                    user: data[activeIndex]?.user
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
            <div className="px-6">
                <CustomSlider mobileView={1} desktopView={1} tabletView={1} hasButton={data.length > 1} index={index}
                    handleNextFunc={() => {
                        setImageIndex((prev: number) => (prev + 1) % data.length)
                    }}
                    handlePrevFunc={() => {
                        setImageIndex((prev: number) => (prev - 1 + data.length) % data.length)
                    }}
                    onSlideChange={(data) => {
                        setActiveIndex(data?.activeIndex)
                    }}
                >
                    {
                        data.map((item, index) => (
                            <div className="flex justify-center items-center overflow-hidden h-[50vh] lg:h-screen py-28">
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
                            </div>
                        ))
                    }
                </CustomSlider>
            </div>
        </div>
    )
};

export default ImagePanel;
