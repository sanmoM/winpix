import React from "react";
import { FaRegImage, FaTrophy } from "react-icons/fa";
import { SiOpenlayers } from "react-icons/si";

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
    <div className="flex flex-col items-center   ">
        <div className={` mb-2 text-primary-color text-2xl lg:text-4xl`}>
            {icon}
        </div>
        <span className="text-sm lg:text-lg font-bold">{value}</span>
        <span className="text-xs lg:text-sm text-gray-500">{label}</span>
    </div>
);
const SingleQuestSeriesInfo: React.FC = ({ t, series, currentLanguage, }) => {
    return (
        <div className="w-full flex flex-col overflow-hidden">
            {/* <CustomSlider mobileView={1} tabletView={1} desktopView={1}>
                {
                    slides.map((slide, index) => ( */}
            <img
                src={"/storage/" + series?.image}
                alt="A pigeon on a road with white cross markings"
                className="w-full aspect-[2/1] lg:aspect-[5/2] object-cover"
            />
            {/* ))
                }
            </CustomSlider> */}

            {/* Right Column: Text and Metrics Section */}
            <div className="flex flex-col xl:flex-row justify-between mt-6 gap-4 md:gap-6 xl:gap-10">
                <div className="grow bg-bg-primary p-4 md:p-6 lg:p-8 rounded-lg">
                    <h2 className="text-xl md:text-2xl xl:text-4xl font-extrabold mb-2 md:mb-3 lg:mb-4">
                        {currentLanguage === 'en' ? series?.title_en : series?.title_ar}
                    </h2>
                    <p className="text-gray-500 leading-relaxed text-xs md:text-sm lg:text-base">
                        {currentLanguage === 'en' ? series?.description_en : series?.description_ar}
                    </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-6 items-center space-x-4  p-4 md:p-6 lg:p-8 rounded-lg bg-bg-primary">
                    <MetricItem
                        icon={<FaTrophy />}
                        value={`${series?.total_coins} USD`}
                        label={t("singleQuestSeries.stats.prizeLabel")}
                        bgColor="bg-orange-100"
                    />
                    <MetricItem
                        icon={<FaRegImage />}
                        value={series?.total_images}
                        label={t("singleQuestSeries.stats.entriesLabel")}
                        bgColor="bg-blue-100"
                    />
                    <MetricItem
                        icon={<SiOpenlayers />}
                        value={series?.total_quests}
                        label={t("singleQuestSeries.stats.questLabel")}
                        bgColor="bg-red-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default SingleQuestSeriesInfo;
