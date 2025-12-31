import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { IoLayersSharp } from "react-icons/io5";
import { route } from "ziggy-js";
import Button from "../shared/buttons/button";
import Modal from "../shared/modal";
import axios from "axios";

<IoLayersSharp className="w-8 h-8 mt-0.5 sm:mt-0 mr-0 sm:mr-3 text-indigo-500 dark:text-indigo-300" />

// Store Item Card
interface StoreItemProps {
    quantity: number;
    price: string;
    isBestValue?: boolean;
    iconColorClass?: string;
    image: string;
    coinId: number;
}

const StoreItem: React.FC<StoreItemProps> = ({
    quantity,
    price,
    isBestValue = false,
    iconColorClass = "text-indigo-400",
    image,
    coinId
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { props } = usePage();
    const handlePayment = () => {
        const fromData = new FormData();
        fromData.append('price', price);
        fromData.append('id', coinId)
        // router.post(route('paypal.pay'), fromData, {
        //     onSuccess: (response) => {
        //         console.log(response);
        //         // if (response.redirect_url) {
        //         //     window.location.href = response.redirect_url;
        //         // }

        //         setIsOpen(false);
        //     },

        // });
        axios.post(route('paypal.pay'), fromData).then((response) => {
            console.log(response);
            if (response.data.paypal_redirect) {
                window.location.href = response.data.paypal_redirect;
                setIsOpen(false);
            }
        });
    };


    return (
        <div
            className={`relative flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg shadow-lg border-2 transition-all duration-200 cursor-pointer
        hover:shadow-xl bg-bg-primary dark:bg-bg-primary`}
        >
            {isBestValue && (
                <span className="absolute -top-3 right-3 bg-primary-color text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full shadow-md">
                    Best Value!
                </span>
            )}

            <div className={`mb-3 sm:mb-4 ${iconColorClass}`}>
                {/* <IoLayersSharp className="w-10 sm:w-12 h-10 sm:h-12" /> */}
                <img src={"storage/" + image}
                    alt="" className="w-28 md:w-40" />
            </div>

            <p className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mb-1 sm:mb-2">
                x{quantity}
            </p>
            <Button text={`$ ${price}`} className="px-6 mt-2" onClick={() => setIsOpen(true)} />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div>
                    <p className="mb-6">Payment</p>
                    <div className="grid grid-cols-[auto_auto_auto] justify-between items-center">
                        <div className={`mb-3 sm:mb-4 ${iconColorClass}`}>
                            {/* <IoLayersSharp className="w-10 sm:w-12 h-10 sm:h-12" /> */}
                            <img src="https://cdn.pulsepx.com/product-assets/1000005/icon?v=3" alt="" className="w-12 md:w-32" />
                        </div>

                        <p className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mb-1 sm:mb-2">
                            x{quantity}
                        </p>
                        <p>Price: {price}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    {/* Button 1: PayPal */}
                    <button
                        onClick={handlePayment}
                        className="bg-[#ffc439] hover:bg-[#f7b620] py-3 px-12 rounded-full transition-colors duration-300 shadow-md w-full sm:w-auto flex justify-center items-center cursor-pointer"
                        aria-label="Pay with PayPal"
                    >
                        <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-color.svg" className="w-24" />
                    </button>

                    {/* Button 2: Pay Later */}
                    <button
                        onClick={handlePayment}
                        className="bg-[#ffc439] hover:bg-[#f7b620] text-[#003087] py-3 px-12 rounded-full transition-colors duration-300 shadow-md w-full sm:w-auto flex items-center justify-center space-x-2 cursor-pointer"
                        aria-label="Pay Later with PayPal"
                    >
                        {/* Inline SVG for the PayPal 'P' monogram */}
                        <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-mark-color.svg" className="w-6" />

                        {/* Button Text */}
                        <span className="font-semibold text-lg">Pay Later</span>
                    </button>
                </div>
            </Modal>
        </div>
    );
};


export default StoreItem;