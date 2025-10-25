import CustomSlider from "@/components/shared/custom-slider/CustomSlider";
import React from "react";
import { FaTrophy, FaRegImage } from "react-icons/fa";
import { SiOpenlayers } from "react-icons/si";

const slides = [
    "/images/banner-1.jpg", "/images/banner-2.jpg", "/images/banner-3.jpg", "/images/banner-4.jpg"
];

interface MetricItemProps {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    bgColor: string;
}

const MetricItem: React.FC<MetricItemProps> = ({
    icon,
    value,
    label,
    bgColor,
}) => (
    <div className="flex flex-col items-center">
        <div className={` mb-2 text-primary-color text-2xl lg:text-4xl`}>
            {icon}
        </div>
        <span className="text-sm lg:text-lg font-bold">{value}</span>
        <span className="text-xs lg:text-sm text-gray-500">{label}</span>
    </div>
);
const SingleQuestSeriesInfo: React.FC = () => {
    return (
        <div className="w-full flex flex-col overflow-hidden">
            <CustomSlider mobileView={1} tabletView={1} desktopView={1}>
                {
                    slides.map((slide, index) => (
                        <img
                            src={slide} // Placeholder image
                            alt="A pigeon on a road with white cross markings"
                            className="w-full aspect-[2/1] lg:aspect-[5/2] object-cover"
                        />
                    ))
                }
            </CustomSlider>

            {/* Right Column: Text and Metrics Section */}
            <div className="flex flex-col xl:flex-row justify-between mt-6 gap-4 md:gap-6 xl:gap-10">
                <div className="w-fit bg-bg-primary p-4 md:p-6 lg:p-8 rounded-lg">
                    <h2 className="text-xl md:text-2xl xl:text-4xl font-extrabold mb-2 md:mb-3 lg:mb-4">
                        Alignment Series
                    </h2>
                    <p className="text-gray-500 leading-relaxed text-xs md:text-sm lg:text-base">
                        Explore the beauty of lines - parallel, intersecting, or gridded - to reveal rhythm, structure, and dynamic energy in your compositions.
                    </p>
                </div>

                {/* Metrics */}
                <div className="flex grow justify-around items-center space-x-4 bg-bg-primary p-4 md:p-6 lg:p-8 rounded-lg">
                    <MetricItem
                        icon={<FaTrophy />}
                        value="1500 USD"
                        label="Total Prize Pool"
                        bgColor="bg-orange-100"
                    />
                    <MetricItem
                        icon={<FaRegImage />}
                        value="169"
                        label="Entries"
                        bgColor="bg-blue-100"
                    />
                    <MetricItem
                        icon={<SiOpenlayers />}
                        value="3"
                        label="Quests"
                        bgColor="bg-red-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default SingleQuestSeriesInfo;
