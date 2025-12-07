import { cn } from "@/lib/utils";
import { JSX } from "react";

export default function PillButton({ label, isActive, onClick, icon, className }: { label: string, isActive?: boolean, onClick?: () => void, icon?: JSX.Element, className?: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(`text-black hover:text-white dark:text-white dark:hover:text-black bg-bg-primary justify-center cursor-pointer rounded-full text-sm font-medium transition-all duration-200 ease-in-out flex hover:bg-primary-color gap-2 items-center py-3 px-6  text-nowrap`, className, isActive && "bg-primary-color text-white ")}
        >
            {icon}
            {label}
        </button>
    )
}
