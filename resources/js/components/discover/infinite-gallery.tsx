import GalleryImageCart from "../shared/gallary-image-cart";
import SectionHeading from "../shared/SectionHeading";



export default function MasonryGallery({ galleryImages, t }: { images: string[], t: (key: string) => string }) {
  return (
    <div className="">
      <SectionHeading title={t('discover.topPhotos.title')} className="mb-8" />
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryImages.map((item, index) => (
          <div key={index} className="break-inside-avoid rounded overflow-hidden shadow-lg">
            <GalleryImageCart item={{
              image: item?.image.image,
              user: item?.image.user
            }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
