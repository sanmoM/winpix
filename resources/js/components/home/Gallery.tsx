import { FaRegHeart } from "react-icons/fa";
import { GrFlag } from "react-icons/gr";
import { LuShare2 } from "react-icons/lu";
import SectionHeading from "../shared/SectionHeading";

const images = [
    [
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg",
    ],
    [
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg",
    ],
    [
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg",
    ],
    [
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg",
    ],
];

export default function Gallery() {
    return (
        <div>
            <SectionHeading title="Top Photos" className={"mb-8"} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((column, i) => (
                    <div key={i} className="grid gap-4 ">
                        {column.map((src, j) => (
                            <div key={j} className="relative group cursor-pointer">
                                <img
                                    className="h-auto max-w-full rounded-lg"
                                    src={src}
                                    alt={`Gallery image ${i}-${j}`}
                                />
                                <div className="absolute inset-0 bg-black/10  flex items-center justify-center transition-all rounded-lg gap-2 opacity-0 group-hover:opacity-100 duration-300">
                                    <div className="bg-blue-500 p-3 rounded-full opacity-0 group-hover:opacity-100">
                                        <FaRegHeart className="text-xl text-white" />
                                    </div>
                                    <div className="bg-blue-500 p-3 rounded-full opacity-0 group-hover:opacity-100">
                                        <LuShare2 className="text-xl text-white" />
                                    </div>
                                    <div className="bg-blue-500 p-3 rounded-full opacity-0 group-hover:opacity-100">
                                        <GrFlag className="text-xl text-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 duration-300">
                                    <img className="h-12 w-12 rounded-full object-cover"
                                        src={src}
                                        alt={`Gallery image ${i}-${j}`} />
                                    <p className="text-xl font-medium">Name</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div >
    );
}
