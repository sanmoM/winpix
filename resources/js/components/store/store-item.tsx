import { IoLayersSharp } from "react-icons/io5";
import Button from "../shared/button";

<IoLayersSharp className="w-8 h-8 mt-0.5 sm:mt-0 mr-0 sm:mr-3 text-indigo-500 dark:text-indigo-300" />

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
            className={`relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg shadow-lg border-2 transition-all duration-200 cursor-pointer
        hover:shadow-xl bg-white dark:bg-black`}
        >
            {isBestValue && (
                <span className="absolute -top-3 right-3 bg-primary-color text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-md">
                    Best Value!
                </span>
            )}

            <div className={`mb-3 sm:mb-4 ${iconColorClass}`}>
                {/* <IoLayersSharp className="w-10 sm:w-12 h-10 sm:h-12" /> */}
                <img src="https://cdn.pulsepx.com/product-assets/1000005/icon?v=3" alt="" className="w-40" />
            </div>

            <p className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mb-1 sm:mb-2">
                x{quantity}
            </p>
            <Button text={price} className="px-6 mt-2" />
        </div>
    );
};


export default StoreItem;