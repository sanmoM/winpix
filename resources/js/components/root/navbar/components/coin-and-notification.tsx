import SecondarySectionHeading from "@/components/shared/secondary-section-heading";
import { cn } from "@/lib/utils";
import { dashboard } from "@/routes";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaRocket } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function CoinAndNotification({ hasBackground, direction, t }: { hasBackground: boolean, direction: string, t: (key: string) => string }) {
    const [notifyOpen, setNotifyOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { auth } = usePage<any>().props

    const [notifications, setNotifications] = useState<any[]>([]);
    useEffect(() => {
        const fetchNotifications = async () => {
            const response = await axios.get("/notifications");
            setNotifications(response.data.notifications);
        };

        fetchNotifications();
    }, []);

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
                <p>{auth?.user?.coin}</p>
            </div>
            <div className="flex items-center gap-2">
                <img src="/images/coin.png" alt="" className="w-4 h-4" />
                <p>{auth?.user?.pixel}</p>
            </div>
            <div className="flex items-center gap-2">
                <img src="/images/cash.png" alt="" className="w-6 h-6" />
                <p>{auth?.user?.cash}</p>
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
                <div className={cn("absolute rounded-lg border top-[110%] lg:top-[200%] bg-bg-primary h-[300px] w-[calc(100vw-32px)] md:w-[350px]", notifyOpen ? "block" : "hidden", direction === "right" ? "left-0" : "right-0")} ref={menuRef}>
                    <div>
                        <SecondarySectionHeading className="border-b pb-4 !text-center mt-4 mb-0 md:mb-0 lg:mb-0  text-black dark:text-white" title={t('root.navbar.notifications.title')} />
                        <div className="w-full max-w-sm">
                            {/* Flex container for icon and text */}
                            {
                                notifications.length > 0 && notifications.map((notification, index) => (
                                    <div key={index} className="flex items-center gap-2 py-4 px-6 hover:bg-bg-secondary hover:text-white">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-color">
                                                {/* <RocketIcon /> */}
                                                <FaRocket className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-base truncate text-black dark:text-white"
                                                dangerouslySetInnerHTML={
                                                    {
                                                        __html: notification.title
                                                    }
                                                }
                                            >
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1"
                                                dangerouslySetInnerHTML={
                                                    {
                                                        __html: notification.message
                                                    }
                                                }
                                            >

                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



