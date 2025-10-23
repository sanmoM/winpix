import { useState } from "react";
import { Link } from "@inertiajs/react";
import { IoIosArrowDown } from "react-icons/io";
import { cn } from "@/lib/utils";

interface DropdownItem {
    name: string;
    href: string;
}

interface NavItemProps {
    name: string;
    href?: string;
    isDropdown?: boolean;
    dropdownItems?: DropdownItem[];
    variant?: "desktop" | "mobile";
    type?: "button" | "link";
    onClick?: () => void;
    hasBackground?: boolean;
}

export default function NavItem({
    name,
    href = "#",
    isDropdown = false,
    dropdownItems = [],
    variant = "desktop",
    type = "link",
    onClick,
    hasBackground,
}: NavItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    // === DESKTOP VERSION ===
    if (variant === "desktop") {
        return (
            <div
                className="relative group"
                onMouseEnter={() => isDropdown && setIsOpen(true)}
                onMouseLeave={() => isDropdown && setIsOpen(false)}
            >
                {isDropdown ? (
                    <>
                        <button
                            className={cn("hidden md:flex items-center cursor-pointer font-medium", hasBackground ? "hover:text-primary-color" : "hover:opacity-70")}
                        >
                            {name}
                            <IoIosArrowDown
                                className={`ml-1 w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
                                    }`}
                            />
                        </button>

                        {/* Dropdown */}
                        <div
                            className={`absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-bg-primary dark:bg-bg-primary rounded-lg shadow-xl overflow-hidden transition-all duration-200 ease-in-out ${isOpen
                                ? "opacity-100 translate-y-0 visible"
                                : "opacity-0 -translate-y-2 invisible"
                                }`}
                        >
                            {dropdownItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn("block px-4 py-2 text-black font-medium dark:text-white", hasBackground ? "hover:!text-primary-color" : "hover:opacity-70")}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        {
                            type === "button" ?
                                <button onClick={onClick} className={cn("font-medium cursor-pointer", hasBackground ? "hover:text-primary-color" : "hover:opacity-70")}>
                                    {name}
                                </button>
                                :
                                <Link href={href} className={cn("font-medium", hasBackground ? "hover:text-primary-color" : "hover:opacity-70")}>
                                    {name}
                                </Link>
                        }
                    </>
                )}
            </div>
        );
    }

    // === MOBILE VERSION === (click to open)
    return (
        <div className="relative">
            {
                isDropdown ? (<button
                    onClick={() => (isDropdown ? setIsOpen(!isOpen) : null)}
                    className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:text-primary-color transition !scale-100 ${isDropdown ? "flex justify-between items-center" : ""
                        }`}
                    style={{
                        scale: "1 !important"
                    }}
                >
                    {name}
                    {isDropdown && (
                        <IoIosArrowDown
                            className={`ml-1 w-4 h-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
                                }`}
                        />
                    )}
                </button>
                ) : (<Link
                    href={href} // pass your target URL here
                    onClick={() => (isDropdown ? setIsOpen(!isOpen) : null)}
                    className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium hover:text-primary-color transition  ${isDropdown ? "flex justify-between items-center" : ""
                        }`}
                >
                    {name}
                    {isDropdown && (
                        <IoIosArrowDown
                            className={`ml-1 w-4 h-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
                                }`}
                        />
                    )}
                </Link>
                )
            }

            {isDropdown && isOpen && (
                <div className="pl-6 pt-1 pb-1 space-y-1 rounded-md">
                    {dropdownItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md  transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
