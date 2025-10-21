import { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper"; // 👈 import type

import "swiper/css";
import "./custom-slider.css";

export default function CustomSlider({
    children = [],
    mobileView = 3,
    tabletView = 4,
    desktopView = 6,
    btnContainerClassName = "",
}: {
    children: React.ReactNode[];
    mobileView?: number;
    tabletView?: number;
    desktopView?: number;
    btnContainerClassName?: string;
}) {
    // ✅ Properly type ref
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className="relative w-full">
            <Swiper
                className="mySwiper"
                modules={[Autoplay]}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper; // ✅ now valid
                }}
                breakpoints={{
                    375: { slidesPerView: mobileView },
                    768: { slidesPerView: tabletView },
                    1024: { slidesPerView: desktopView },
                }}
                loop={true}
            >
                {Array.from(children).map((child, index) => (
                    <SwiperSlide key={index} className="h-full">
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
