import { cn } from "@/lib/utils";
import { JSX } from "react";

export default function PillButton({ label, isActive, onClick, icon, className }: { label: string, isActive: boolean, onClick?: () => void, icon?: JSX.Element, className?: string }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(`bg-bg-primary justify-center cursor-pointer rounded-full text-sm font-medium transition-all duration-200 ease-in-out flex gap-2 items-center py-3 px-6`, className, isActive && "bg-primary-color text-white")}
        >
            {icon}
            {label}
        </button>
    )
}
