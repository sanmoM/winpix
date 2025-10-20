

"use client"

import { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./custom-slider.css";

import { cn } from "@/lib/utils";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function CustomSlider({
    children = [],
    mobileView = 3,
    tabletView = 4,
    desktopView = 6,
    btnContainerClassName = "",
}) {
    const swiperRef = useRef(null);

    return (
        <div className="relative w-full">
            <Swiper
                className="mySwiper"
                modules={[Autoplay]}                       // <-- register the module
                onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
                breakpoints={{
                    375: { slidesPerView: mobileView },
                    768: { slidesPerView: tabletView },
                    1024: { slidesPerView: desktopView },
                }}
                // autoplay={{
                //     delay: 7000,            // ms between slides
                //     disableOnInteraction: false, // keep autoplay after user interaction
                //     pauseOnMouseEnter: true,     // optional: pause while hovering
                // }}
                loop={true} // keeps autoplay running and cycles slides
            >
                {Array.from(children).map((child, index) => (
                    <SwiperSlide key={index} className="h-full">{child}</SwiperSlide>
                ))}
            </Swiper>

            {/* <div
                className={cn(
                    "justify-between mt-4 absolute top-[25%] left-0 right-0 z-[9] hidden lg:flex",
                    btnContainerClassName
                )}
            >
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="bg-gray-200 rounded-full aspect-square p-2 hover:bg-primary cursor-pointer hover:text-white -translate-x-[20%]"
                >
                    <MdKeyboardArrowLeft />
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="bg-gray-200 rounded-full aspect-square p-2 hover:bg-primary cursor-pointer hover:text-white translate-x-[20%]"
                >
                    <MdKeyboardArrowRight />
                </button>
            </div> */}
        </div>
    );
}