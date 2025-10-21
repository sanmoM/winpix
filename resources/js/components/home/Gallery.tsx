import { FaRegHeart } from "react-icons/fa";
import { GrFlag } from "react-icons/gr";
import { LuShare2 } from "react-icons/lu";
import SectionHeading from "../shared/SectionHeading";

const images = [
    [

        "images/banner-1.jpg",
        "images/banner-2.jpg",
        "images/banner-3.jpg",
    ],
    [
        "images/banner-4.jpg",
        "images/banner-2.jpg",
        "images/banner-1.jpg",
    ],
    [
        "images/banner-2.jpg",
        "images/banner-4.jpg",
        "images/banner-3.jpg",
    ],
    [
        "images/banner-1.jpg",
        "images/banner-4.jpg",
        "images/banner-3.jpg",
    ],
];

// define your repeating height pattern
const heightPatterns = [
    ["aspect-[2/3]", "aspect-[1/1]", "aspect-[1/1]"], // col 1
    ["aspect-[1/1]", "aspect-[1/1]", "aspect-[2/3]",], // col 2
    ["aspect-[2/3]", "aspect-[1/1]", "aspect-[1/1]"], // col 1
    ["aspect-[1/1]", "aspect-[2/3]", "aspect-[1/1]"], // col 2
];

export default function Gallery() {
    return (
        <div>
            <SectionHeading title="Top Photos" className="mb-8" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {images.map((column, i) => {
                    // alternate pattern every two columns
                    const pattern = heightPatterns[i % 2];
                    return (
                        <div key={i} className="grid gap-4">
                            {column.map((src, j) => (
                                <div
                                    key={j}
                                    className={`relative group cursor-pointer overflow-hidden rounded-lg ${pattern[j % pattern.length]}`}
                                >
                                    <img
                                        className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                        src={src}
                                        alt={`Gallery image ${i}-${j}`}
                                    />
                                    {/* overlay buttons */}
                                    <div className="absolute inset-0 bg-blue-950/50 flex items-center justify-center transition-all rounded-lg gap-2 opacity-0 group-hover:opacity-100 duration-300">
                                        <div className="bg-[var(--color-primary-color)] p-3 rounded-full">
                                            <FaRegHeart className="text-xl text-white" />
                                        </div>
                                        <div className="bg-[var(--color-primary-color)] p-3 rounded-full">
                                            <LuShare2 className="text-xl text-white" />
                                        </div>
                                        <div className="bg-[var(--color-primary-color)] p-3 rounded-full">
                                            <GrFlag className="text-xl text-white" />
                                        </div>
                                    </div>
                                    {/* user info */}
                                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 duration-300">
                                        <img
                                            className="h-12 w-12 rounded-full object-cover"
                                            src={src}
                                            alt={`User avatar ${i}-${j}`}
                                        />
                                        <p className="text-xl font-medium">Name</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
