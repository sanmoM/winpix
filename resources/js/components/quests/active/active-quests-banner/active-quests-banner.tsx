import Button from "@/components/shared/button";
import CustomSlider from "@/components/shared/custom-slider/CustomSlider";
import { IoTrophySharp } from "react-icons/io5";
import "./active-quests-banner.css";

const slides = [
    {
        imageUrl: "/images/banner-1.jpg",
        title: "Discover Modern Design",
        subtitle: "Sleek, intuitive, and built for the future. Explore our latest collection.",
        buttonClass: "bg-blue-500 hover:bg-blue-600"
    },
    {
        imageUrl: "/images/banner-2.jpg",
        title: "Embrace Nature's Beauty",
        subtitle: "Connect with the outdoors and find your inner peace.",
        buttonClass: "bg-green-500 hover:bg-green-600"
    },
    {
        imageUrl: "/images/banner-3.jpg",
        title: "Urban Adventures Await",
        subtitle: "Experience the vibrant energy of the city like never before.",
        buttonClass: "bg-red-500 hover:bg-red-600"
    },
    {
        imageUrl: "/images/banner-4.jpg",
        title: "Unlock Creative Freedom",
        subtitle: "Tools and inspiration to bring your boldest ideas to life.",
        buttonClass: "bg-purple-500 hover:bg-purple-600"
    }
];

export default function ActiveQuestsBanner() {
    return (
        <CustomSlider mobileView={1} tabletView={1} desktopView={1}>
            {
                slides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative h-[50vh] lg:h-[80vh]">
                        <img src={slide.imageUrl} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 flex items-end justify-end text-white text-right p-8">
                            <div className="relative z-10 p-8 md:p-12 flex flex-col gap-6 text-white">

                                {/* Header Title */}
                                <h1 className="text-4xl sm:text-5xl font-bold title">Shot of the Week #42</h1>

                                {/* Info Bar */}
                                <div className="flex justify-end flex-wrap items-center gap-x-6 gap-y-3 text-lg info">

                                    {/* Prize */}
                                    <div className="flex items-center gap-2 font-medium">
                                        <IoTrophySharp className="text-xl" />
                                        <span>450 USD</span>
                                    </div>

                                    {/* Time Left */}
                                    <div className="font-medium">7 days left</div>
                                </div>

                                {/* Description Text */}
                                <p className="text-base text-gray-200 max-w-3xl leading-relaxed description">
                                    Get your best shot ready for a chance to be crowned Shot of the Week!
                                    Whether it's an epic landscape, a spontaneous moment, or a bold
                                    composition, show off your skills and inspire the PULSEpx community!
                                </p>

                                {/* Prize Pool Details */}
                                <div className="text-base text-gray-200 font-medium prize-pool">
                                    A Rank prize pool: 200 USD B Rank prize pool: 150 USD C Rank prize
                                    pool: 100 USD
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 buttons">
                                    <button className="bg-white text-black text-sm font-semibold rounded-full transition cursor-pointer w-32 py-2 md:py-3 btn duration-300 hover:scale-105 ease-in-out">
                                        Vote
                                    </button>
                                    <Button text="Join Now" className='w-32 py-2 md:py-3 btn' />
                                </div>

                            </div>
                        </div>
                    </div>
                ))
            }
        </CustomSlider>
    )
}

const UploadIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
    >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);