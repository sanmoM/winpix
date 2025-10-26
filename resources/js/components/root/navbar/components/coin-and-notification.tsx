import SecondarySectionHeading from "@/components/shared/secondary-section-heading";
import { cn } from "@/lib/utils";
import { dashboard } from "@/routes";
import { Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { FaRocket } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function CoinAndNotification({ hasBackground }: { hasBackground: boolean }) {
    const [notifyOpen, setNotifyOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current?.contains(event.target as Node)
            ) {
                setNotifyOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []); // ✅ no dependency needed



    return (
        <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
                <img src="/images/golden-coin.png" alt="" className="w-4 h-4" />
                <p>10</p>
            </div>
            <div className="flex items-center gap-2">
                <img src="/images/coin.png" alt="" className="w-4 h-4" />
                <p>200</p>
            </div>
            <div className="">
                <button
                    ref={buttonRef}
                    onClick={() => setNotifyOpen(!notifyOpen)}
                    className={cn(
                        "w-6 h-6 cursor-pointer flex items-center justify-center",
                        hasBackground ? "hover:text-primary-color" : "hover:opacity-70"
                    )}
                >
                    <IoMdNotificationsOutline className="w-6 h-6" />
                </button>
                <div className={cn("absolute rounded-lg border top-[110%] lg:top-[200%] right-0 bg-bg-primary h-[300px] w-[calc(100vw-32px)] md:w-[350px]", notifyOpen ? "block" : "hidden")} ref={menuRef}>
                    <div>
                        <SecondarySectionHeading title="Notifications" className="border-b pb-4 text-center mt-4 mb-0 md:mb-0 lg:mb-0" />
                        <div className="w-full max-w-sm">
                            {/* Flex container for icon and text */}
                            <div className="flex items-center space-x-4 p-4 border-b last:border-0 cursor-pointer">

                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-color">
                                        {/* <RocketIcon /> */}
                                        <FaRocket className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-base truncate">
                                        Join <span className="font-bold text-primary-color">"Change Your View"</span> now!
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        20 hours ago
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
