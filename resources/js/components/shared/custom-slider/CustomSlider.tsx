import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "./custom-slider.css";

interface CustomSliderProps {
    children: React.ReactNode[];
    mobileView?: number;
    tabletView?: number;
    desktopView?: number;
    btnContainerClassName?: string;
    hasButton?: boolean;
    index?: number;
}

export default function CustomSlider({
    children = [],
    mobileView = 3,
    tabletView = 4,
    desktopView = 6,
    btnContainerClassName = "",
    hasButton = false,
    index = 0,
}: CustomSliderProps) {
    const swiperRef = useRef<SwiperType | null>(null);

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    console.log(index)

    return (
        <div className="relative w-full">
            <Swiper
                initialSlide={index}
                className="mySwiper"
                modules={[Autoplay, Navigation]}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                // autoplay={{
                //     delay: 3000,
                //     disableOnInteraction: false,
                // }}
                breakpoints={{
                    375: { slidesPerView: mobileView },
                    768: { slidesPerView: tabletView },
                    1024: { slidesPerView: desktopView },
                }}
                loop
                spaceBetween={16}
            >
                {children.map((child, index) => (
                    <SwiperSlide key={index} className="h-full">
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons */}
            {
                hasButton && (
                    <div
                        className={`absolute inset-y-0 flex items-center justify-between px-2 pointer-events-none w-full ${btnContainerClassName}`}
                    >
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="pointer-events-auto cursor-pointer z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary-color text-white transition"
                            aria-label="Previous slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="pointer-events-auto cursor-pointer z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary-color text-white transition"
                            aria-label="Next slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                )
            }
        </div>
    );
}
