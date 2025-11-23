


import { JSX } from "react";
import SectionHeading from "../shared/SectionHeading";
import GalleryImageCart from "../shared/gallary-image-cart";

export default function Gallery({ title, actionButtons, galleryImages }: { title?: string, actionButtons?: JSX.Element, images: any[] }) {
    return (
        <div>
            {
                title && <SectionHeading title={title} className="mb-8  !text-center" />
            }
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {galleryImages?.map((item, index) => (
                    <div key={index} className="break-inside-avoid rounded overflow-hidden shadow-lg">
                        {console.log(item)}
                        <GalleryImageCart item={{
                            image: item?.image.image,
                            user: item?.image.user
                        }} actionButtons={actionButtons} />
                    </div>
                ))}
            </div>
        </div>
    );
}
