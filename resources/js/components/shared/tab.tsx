import { cn } from "@/lib/utils";
import { useState, CSSProperties } from "react";

export interface TabOption {
    label: string;
    value: string;
}

export interface TabProps {
    options?: TabOption[];
    value?: string;
    onChange?: (val: string) => void;
    variant?: "primary" | "gray";
    rounded?: "full" | "md";
}

export default function Tab({
    options = [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
    ],
    value,
    onChange,
    variant = "primary",
}: TabProps) {
    const activeIndex = options.findIndex((opt) => opt.value === value);
    const [selected, setSelected] = useState(
        activeIndex >= 0 ? activeIndex : 0
    );

    const handleSelect = (index: number, val: string) => {
        setSelected(index);
        if (onChange) onChange(val);
    };

    // --- Tailwind styles
    const containerStyles = `
     relative items-center grid w-fit grid-cols-3 rounded-full overflow-hidden bg-bg-primary
  `;

    const sliderWidth = `${100 / options.length}%`;

    const sliderClasses = `
    absolute shadow flex items-center justify-center 
    h-full transition-all px-6 duration-300 ease-in-out text-white bg-primary-color rounded-full
  `;

    const sliderStyle: CSSProperties = {
        width: sliderWidth,
        left: `calc(${selected} * ${sliderWidth})`,
    };

    console.log(selected, "active index")

    return (
        <div className={containerStyles}
            style={{
                gridTemplateColumns: `repeat(${options?.length}, 1fr)`
            }}
        >
            {options.map((opt, i) => (
                <div key={opt.value} className="w-full flex items-center justify-center px-6"

                >
                    <button
                        onClick={() => handleSelect(i, opt.value)}
                        className={cn("w-full z-10 relative text-center py-2.5 font-medium lg:text-sm cursor-pointer hover:!scale-100 text-primary-color duration-300", selected === i && "text-white")}
                    >
                        {opt.label}
                    </button>
                </div>
            ))}

            <span className={sliderClasses} style={sliderStyle} />
        </div>
    );
}
