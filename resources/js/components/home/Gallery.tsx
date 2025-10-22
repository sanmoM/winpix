// import SectionHeading from "../shared/SectionHeading";
// import GalleryImageCart from "../shared/gallary-image-cart";

// const images = [
//     [
//         "images/banner-1.jpg",
//         "images/banner-2.jpg",
//         "images/banner-3.jpg",
//     ],
//     [
//         "images/banner-4.jpg",
//         "images/banner-2.jpg",
//         "images/banner-1.jpg",
//     ],
//     [
//         "images/banner-2.jpg",
//         "images/banner-4.jpg",
//         "images/banner-3.jpg",
//     ],
//     [
//         "images/banner-1.jpg",
//         "images/banner-4.jpg",
//         "images/banner-3.jpg",
//     ],
// ];

// // define your repeating height pattern
// const heightPatterns = [
//     ["aspect-[2/3]", "aspect-[1/1]", "aspect-[1/1]"], // col 1
//     ["aspect-[1/1]", "aspect-[1/1]", "aspect-[2/3]",], // col 2
//     ["aspect-[2/3]", "aspect-[1/1]", "aspect-[1/1]"], // col 1
//     ["aspect-[1/1]", "aspect-[2/3]", "aspect-[1/1]"], // col 2
// ];

// export default function Gallery() {
//     return (
//         <div>
//             <SectionHeading title="Top Photos" className="mb-8" />
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
//                 {images.map((column, i) => {
//                     // alternate pattern every two columns
//                     const pattern = heightPatterns[i % 2];
//                     return (
//                         <div key={i} className="grid gap-4">
//                             {column.map((src, j) => (
//                                 <GalleryImageCart key={j} src={src} aspect={pattern[j % pattern.length]} />
//                             ))}
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// }




import SectionHeading from "../shared/SectionHeading";
import GalleryImageCart from "../shared/gallary-image-cart";

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
export default function Gallery() {
    return (
        <div>
            <SectionHeading title="Top Photos" className="mb-8" />
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {images.map((item, index) => (
                    <div key={index} className="break-inside-avoid rounded overflow-hidden shadow-lg">
                        <GalleryImageCart src={item} />
                    </div>
                ))}
            </div>
        </div>
    );
}
