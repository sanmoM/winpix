


import useLocales from "@/hooks/useLocales";
import SectionHeading from "../shared/SectionHeading";
import GalleryImageCart from "../shared/gallary-image-cart";
import { JSX } from "react";

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
export default function Gallery({ title, actionButtons }: { title?: string, actionButtons?: JSX.Element }) {
    const { t } = useLocales()
    return (
        <div>
            {
                title && <SectionHeading title={title} className="mb-8  !text-center" />
            }
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {images.map((item, index) => (
                    <div key={index} className="break-inside-avoid rounded overflow-hidden shadow-lg">
                        <GalleryImageCart src={item} actionButtons={actionButtons} />
                    </div>
                ))}
            </div>
        </div>
    );
}
