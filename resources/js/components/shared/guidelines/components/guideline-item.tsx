
import React from "react";

interface GuidelineItemProps {
    /** The icon to display in the card */
    icon: React.ReactNode;
    /** The title of the guideline */
    title: string;
    /** The description text below the title */
    description: string;
}
const GuidelineItem: React.FC<GuidelineItemProps> = ({
    icon,
    title,
    description,
}) => (
    <div
        className={`flex items-center gap-6 transition-all`}
    >
        {/* Icon Wrapper */}
        <div className={`flex-shrink-0 rounded-full`}>
            {icon}
        </div>

        {/* Content */}
        <div>
            <h2 className="text-base md:text-xl font-semibold mb-1">{title}</h2>
            <p className="text-sm md:text-base text-gray-500">{description}</p>
        </div>
    </div>
);

export default GuidelineItem;