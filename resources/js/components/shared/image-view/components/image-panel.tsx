import { MdClose } from "react-icons/md";
import CustomSlider from "../../custom-slider/CustomSlider";
import ImageActionButtons from "../../image-action-buttons/image-action-buttons";
import ImageActionButton from "../../image-action-button";

const images = [
    "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
]

// --- Image Panel Component ---
const ImagePanel = ({ setIsOpen }: any) => {
    return (
        <div className="relative h-full bg-[var(--background)]">
            <CustomSlider mobileView={1} desktopView={1} tabletView={1} hasButton>
                {
                    images.map((image, index) => (
                        <div className="flex justify-center items-center overflow-hidden h-[50vh] lg:h-screen">
                            <img
                                key={index}
                                src={image}
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
            <div className="absolute top-4 right-4 z-[20] flex items-center gap-2">
                <ImageActionButtons containerClassName="" />
                <div
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
            </div>
        </div>
    )
};

export default ImagePanel;
