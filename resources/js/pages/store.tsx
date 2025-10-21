import React from "react";

export default function StoreModalContents() {
    const storeItems = [
        { quantity: 30, price: "$2.99" },
        { quantity: 80, price: "$6.99" },
        { quantity: 180, price: "$14.99" },
        { quantity: 400, price: "$29.99" },
        { quantity: 900, price: "$59.99" },
        { quantity: 1600, price: "$99.99", isBestValue: true },
    ];

    return (
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto custom-scrollbar">
            {/* Description / Info Section */}
            <div
                className="flex flex-col sm:flex-row items-start sm:items-center p-4 rounded-lg mb-6 sm:mb-8 shadow-inner border
                   bg-indigo-50 dark:bg-indigo-900/40
                   border-indigo-200 dark:border-indigo-700"
            >
                <PixelIcon className="w-8 h-8 mt-0.5 sm:mt-0 mr-0 sm:mr-3 text-indigo-500 dark:text-indigo-300" />
                <div className="mt-2 sm:mt-0">
                    <h4 className="text-lg sm:text-xl font-bold mb-1 text-gray-900 dark:text-indigo-200">
                        About Pixels
                    </h4>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-indigo-100">
                        Pixels are your gateway to exclusive content! Use them to unlock
                        unique items, participate in special events, and gain an edge in
                        your quests. More pixels, more power!
                    </p>
                </div>
            </div>

            {/* Item Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                {storeItems.map((item, index) => (
                    <StoreItem
                        key={index}
                        quantity={item.quantity}
                        price={item.price}
                        isBestValue={item.isBestValue ?? false} // default false
                    />
                ))}
            </div>
        </div>
    );
}

// Pixel Icon
const PixelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
);

// Store Item Card
interface StoreItemProps {
    quantity: number;
    price: string;
    isBestValue?: boolean;
    iconColorClass?: string;
}

const StoreItem: React.FC<StoreItemProps> = ({
    quantity,
    price,
    isBestValue = false,
    iconColorClass = "text-indigo-400",
}) => {
    return (
        <div
            className={`relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg shadow-lg border-2 border-transparent transition-all duration-200 cursor-pointer
        ${isBestValue
                    ? "border-indigo-500 bg-gradient-to-br from-indigo-200 dark:from-indigo-800 to-purple-200 dark:to-purple-800"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"}
        hover:shadow-xl`}
        >
            {isBestValue && (
                <span className="absolute -top-3 right-3 bg-green-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-md animate-pulse">
                    Best Value!
                </span>
            )}

            <div className={`mb-3 sm:mb-4 ${iconColorClass}`}>
                <PixelIcon className="w-10 sm:w-12 h-10 sm:h-12" />
            </div>

            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-1 sm:mb-2">
                x{quantity}
            </p>
            <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-indigo-300">
                {price}
            </p>

            <button
                className={`mt-3 sm:mt-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-sm sm:text-base transition duration-200 shadow-md transform hover:scale-105
          ${isBestValue
                        ? "bg-white text-indigo-800 dark:bg-gray-200 dark:text-indigo-900 hover:bg-gray-100 dark:hover:bg-gray-300"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"}`}
            >
                Buy Now
            </button>
        </div>
    );
};
