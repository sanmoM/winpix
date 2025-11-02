import Button from "@/components/shared/buttons/button";
import CustomSlider from "@/components/shared/custom-slider/CustomSlider";
import { IoTrophySharp } from "react-icons/io5";
import "./active-quests-banner.css";
import Banner from "@/components/shared/banner";
import useLocales from "@/hooks/useLocales";
import { cn } from "@/lib/utils";
import SecondaryButton from "@/components/shared/buttons/secondary-button";

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

export default function ActiveQuestsBanner({ direction, t }: { direction: string, t: (key: string) => string }) {
    return (
        <CustomSlider mobileView={1} tabletView={1} desktopView={1}>
            {
                slides.map((slide, index) => (
                    <Banner src={slide.imageUrl} key={index} containerClass="h-[80vh] md:h-[60vh] lg:h-[80vh]">
                        <div className={cn("absolute inset-0 bg-black/50 flex w-full h-full justify-center items-center md:items-end md:justify-end text-white !text-center md:text-right md:p-8", direction === "right" && "md:justify-start")}>
                            <div className="relative z-10 p-8 md:p-12 flex flex-col gap-3 md:gap-6 text-white">

                                {/* Header Title */}
                                <h1 className="text-3xl md:text-5xl font-bold title !text-right">Shot of the Week #42</h1>

                                {/* Info Bar */}
                                <div className="flex justify-center md:justify-end flex-wrap items-center gap-x-6 gap-y-3 text-sm md:text-lg info w-fit ml-auto">

                                    {/* Prize */}
                                    <div className="flex items-center gap-2 font-medium">
                                        <IoTrophySharp className="text-xl" />
                                        <span>450 USD</span>
                                    </div>

                                    {/* Time Left */}
                                    <div className="font-medium ">7 days left</div>
                                </div>

                                {/* Description Text */}
                                <p className="text-xs md:text-base text-gray-200 max-w-3xl leading-relaxed description !text-right">
                                    Get your best shot ready for a chance to be crowned Shot of the Week!
                                    Whether it's an epic landscape, a spontaneous moment, or a bold
                                    composition, show off your skills and inspire the PULSEpx community!
                                </p>

                                {/* Prize Pool Details */}
                                <div className="text-xs md:text-base text-gray-200 font-medium prize-pool !text-right">
                                    A Rank prize pool: 200 USD B Rank prize pool: 150 USD C Rank prize
                                    pool: 100 USD
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-row items-center justify-center md:justify-end gap-4 pt-4 buttons w-fit ml-auto">
                                    <SecondaryButton text={t('activeQuests.banner.voteText')} />
                                    <Button className='w-32 py-2 md:py-3 btn mx-0' text={t('activeQuests.banner.joinNowText')} />
                                </div>

                            </div>
                        </div>
                    </Banner>
                ))
            }
        </CustomSlider>
    )
}