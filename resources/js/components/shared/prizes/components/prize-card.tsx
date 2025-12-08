import BorderButton from '@/components/shared/buttons/border-button';
import { cn } from '@/lib/utils';
import React from 'react'

export default function PrizeCard({ number, title, amount, containerClassName, hasBadge = false, image }: any) {
    return (
        <div className={cn("w-full rounded-lg bg-bg-primary py-5 relative", containerClassName)}>

            <h2 className=" text-xl !text-center font-semibold mb-4">
                {title}
            </h2>
            <img src={"/storage/" + image} alt="" className="size-20 mx-auto object-cover" />
            {/* Top section: Icon + Title */}
            <div className="flex items-center justify-center gap-3">
                {hasBadge && <MedalIcon number={number} size={40} title="Medal" />}
            </div>

            <p className='text-xl !text-center font-semibold mt-4'>Quantity : {amount}</p>


            {/* <BorderButton text={`${amount}`} className='w-fit mx-auto mt-4 py-1.5 lg:py-2 px-6 lg:px-10 text-sm lg:text-base' hasIcon={true} /> */}
        </div>
    )
}


interface MedalIconProps {
    /** Number or text to display inside the medal (e.g. 1, 2, 3, etc.) */
    number?: string | number;
    /** Size in pixels (default: 36) */
    size?: number;
    /** Accessible label for screen readers */
    title?: string;
}

const MedalIcon: React.FC<MedalIconProps> = ({
    number = 1,
    size = 36,
    title = "Medal",
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            aria-hidden="true"
            role="img"
        >
            <title>{title}</title>

            {/* Ribbon tails */}
            <path
                d="M10 13L8 20L12 17L16 20L14 13"
                fill="#f59e0b" // Tailwind yellow-600
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Medal circle */}
            <circle
                cx="12"
                cy="8"
                r="7"
                fill="#fcd34d" // Tailwind yellow-400
                stroke="#f59e0b" // Tailwind yellow-600
                strokeWidth="1.5"
            />

            {/* Number or label */}
            <text
                x="12"
                y="10.5"
                textAnchor="middle"
                fill="#a16207" // Tailwind yellow-800
                fontSize="8"
                fontFamily="Arial, sans-serif"
                fontWeight="bold"
            >
                {number}
            </text>
        </svg>
    );
};