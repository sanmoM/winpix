


import { useState } from "react";
import SectionHeading from "./SectionHeading";
import GalleryImageCart from "./gallary-image-cart";
import ImageActionButtons from "./image-action-buttons/image-action-buttons";
import ImageView from "./image-view/image-view";

export default function Gallery({ title, galleryImages, hasImageView = true }: any) {
    const [isImageViewOpen, setIsImageViewOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    return (
        <div>
            {
                title && <SectionHeading title={title} className="mb-8  !text-center" />
            }
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {galleryImages?.map((item, index) => (
                    <div key={index} className="break-inside-avoid rounded overflow-hidden shadow-lg">
                        <GalleryImageCart
                            onClick={() => {
                                setIsImageViewOpen(true)
                                setImageIndex(index)
                            }}
                            item={{
                                image: item?.image,
                                user: item?.user
                            }}
                            actionButtons={
                                <ImageActionButtons data={{
                                    id: item?.id,
                                    image: item?.image,
                                    user: item?.user
                                }}

                                />
                            }
                        />
                    </div>
                ))}
            </div>

            {
                isImageViewOpen && hasImageView && <ImageView isOpen={isImageViewOpen} setIsOpen={setIsImageViewOpen} data={galleryImages?.map((item) => ({ image: item?.image, user: item?.user, id: item?.id }))} index={imageIndex} setImageIndex={setImageIndex} />
            }
        </div>
    );
}
