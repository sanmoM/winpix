// import { useCallback, useEffect, useRef, useState } from "react";
// import SectionHeading from "../shared/SectionHeading";
import GalleryImageCart from "../shared/gallary-image-cart";
import SectionHeading from "../shared/SectionHeading";
// import { get } from "http";

// interface InfiniteGalleryProps {
//   images: string[];
// }

// export default function InfiniteGallery({ images }: InfiniteGalleryProps) {
//   const [visibleImages, setVisibleImages] = useState<string[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const loader = useRef<HTMLDivElement | null>(null);
//   const ITEMS_PER_PAGE = 8;

//   // ✅ Predefined aspect ratios
//   const aspects = [
//     "aspect-[7/9]",
//     "aspect-[2/1]",
//     "aspect-[4/3]",
//     "aspect-[3/2]",
//     "aspect-[3/4]",
//     "aspect-[5/3]",
//     "aspect-[2/3]",
//   ];

//   // Load initial images
//   useEffect(() => {
//     const newImages = images.slice(0, ITEMS_PER_PAGE);
//     setVisibleImages(newImages);
//   }, [images]);

//   // Infinite scroll handler
//   const loadMore = useCallback(() => {
//     const nextPage = page + 1;
//     const nextImages = images.slice(0, nextPage * ITEMS_PER_PAGE);
//     setVisibleImages(nextImages);
//     setPage(nextPage);
//   }, [page, images]);

//   // Intersection Observer for infinite scrolling
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) loadMore();
//       },
//       { threshold: 1 }
//     );

//     const currentLoader = loader.current;
//     if (currentLoader) observer.observe(currentLoader);

//     return () => {
//       if (currentLoader) observer.unobserve(currentLoader);
//     };
//   }, [loadMore]);

//   // Random aspect ratio
//   const getRandomAspect = (): string =>
//     aspects[Math.floor(Math.random() * aspects.length)];

//   return (
//     <div>
//       <SectionHeading title="Top Photos" className="mb-8" />
//       <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
//         {images.map((item, index) => (
//           <div key={index} className="break-inside-avoid rounded overflow-hidden shadow-lg">
//             {/* <img
//               src={`${item.src}?auto=format&fit=crop&w=500`}
//               alt={item.title}
//               className="w-full object-cover mb-2 rounded"
//             /> */}
//             {/* <p className="text-sm text-gray-600 px-2 pb-2">{item.title}</p> */}
//             <GalleryImageCart src={item} />
//           </div>
//         ))}
//       </div>

//       {/* Loader */}
//       {visibleImages.length < images.length && (
//         <div ref={loader} className="py-10 !text-center text-gray-500">
//           Loading more...
//         </div>
//       )}
//     </div>
//   );
// }



export default function MasonryGallery({ galleryImages, t }: { images: string[], t: (key: string) => string }) {
  return (
    <div className="">
      <SectionHeading title={t('discover.topPhotos.title')} className="mb-8" />
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryImages.map((item, index) => (
          <div key={index} className="break-inside-avoid rounded overflow-hidden shadow-lg">
            {/* <img
              src={`${item.src}?auto=format&fit=crop&w=500`}
              alt={item.title}
              className="w-full object-cover mb-2 rounded"
            />
            <p className="text-sm text-gray-600 px-2 pb-2">{item.title}</p> */}
            <GalleryImageCart item={{
              image: item?.image.image,
              user: item?.image.user
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}
