import Banner from "@/components/shared/banner";
import Button from "@/components/shared/buttons/button";
import SecondaryButton from "@/components/shared/buttons/secondary-button";
import CustomSlider from "@/components/shared/custom-slider/CustomSlider";
import { cn } from "@/lib/utils";
import { IoTrophySharp } from "react-icons/io5";
import "./active-quests-banner.css";
import { Link } from "@inertiajs/react";

function dateDiff(date1Str, date2Str) {
    const d1 = new Date(date1Str);
    const d2 = new Date(date2Str);

    // Ensure d1 is the later date
    let start = d1 < d2 ? d1 : d2;
    let end = d1 < d2 ? d2 : d1;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

export default function ActiveQuestsBanner({ direction, quests, t, currentLanguage }: any) {
    return (
        <CustomSlider mobileView={1} tabletView={1} desktopView={1}>
            {
                quests.map((slide, index) => (
                    <Banner src={"/storage/" + slide.image} key={index} containerClass="h-[80vh] md:h-[60vh] lg:h-[80vh]">
                        <div className={cn("absolute inset-0 bg-black/50 flex w-full h-full justify-center items-center md:items-end md:justify-end text-white !text-center md:text-right md:p-8", direction === "right" && "md:justify-start")}>
                            <div className="relative z-10 p-8 md:p-12 flex flex-col gap-3 md:gap-4 text-white">

                                {/* Header Title */}
                                <h1 className="text-3xl md:text-5xl font-bold title !text-right">{currentLanguage === 'en' ? slide?.title_en : slide?.title_ar}</h1>

                                {/* Info Bar */}
                                <div className="flex justify-center md:justify-end flex-wrap items-center gap-x-6 gap-y-3 text-sm md:text-lg info w-fit ml-auto">

                                    {/* Prize */}
                                    <div className="flex items-center gap-2 font-medium">
                                        <IoTrophySharp className="text-xl" />
                                        <span>{slide?.entry_coin} {" "} USD</span>
                                    </div>

                                    {/* Time Left */}
                                    <div className="font-medium ">{dateDiff(slide?.start_date, slide?.end_date).days} days left</div>
                                </div>

                                {/* Description Text */}
                                <p className="text-xs md:text-base text-gray-200 max-w-3xl leading-relaxed description !text-right">
                                    {currentLanguage === 'en' ? slide?.brief_en : slide?.brief_ar}
                                </p>

                                {/* Prize Pool Details */}
                                {/* <div className="text-xs md:text-base text-gray-200 font-medium prize-pool !text-right">
                                    A Rank prize pool: 200 USD B Rank prize pool: 150 USD C Rank prize
                                    pool: 100 USD
                                </div> */}

                                {/* Action Buttons */}
                                <div className="flex flex-row items-center justify-center md:justify-end gap-4 pt-4 buttons w-fit ml-auto">
                                    {/* <SecondaryButton text={t('activeQuests.banner.voteText')} /> */}
                                    <Link href={`/quests/single-quest/${slide?.id}`}>
                                        <Button className='w-32 py-2 md:py-3 btn mx-0' text={t('activeQuests.banner.joinNowText')} />
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </Banner>
                ))
            }
        </CustomSlider>
    )
}