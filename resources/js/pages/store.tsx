import Container from "@/components/shared/container";
import StoreItem from "@/components/store/store-item";
import useLocales from "@/hooks/useLocales";
import UserLayout from "@/layouts/user-layout";

export default function StoreModalContents() {
    const { t } = useLocales()
    const storeItems = [
        { quantity: 30, price: "$2.99" },
        { quantity: 80, price: "$6.99" },
        { quantity: 180, price: "$14.99" },
        { quantity: 400, price: "$29.99" },
        { quantity: 900, price: "$59.99" },
        { quantity: 1600, price: "$99.99", isBestValue: true },
    ];

    return (
        <UserLayout>
            <Container className="my-10">
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {/* Description / Info Section */}
                    <div
                        className="flex flex-row items-center p-4 rounded-lg mb-6 sm:mb-8 shadow-inner border
                   bg-indigo-50 dark:bg-primary-color/20
                   border-indigo-200 dark:border-primary-color"
                    >
                        {/* <IoLayersSharp className="w-8 h-8 mt-0.5 sm:mt-0 mr-0 sm:mr-3 text-indigo-500 dark:text-indigo-300" /> */}
                        <img src="https://cdn.pulsepx.com/product-assets/1000002/icon?v=4" alt="" className="w-20 hidden md:block" />
                        <div className="mt-2 sm:mt-0 !text-center md:text-left">
                            <h4 className="text-lg sm:text-xl font-bold mb-1 text-gray-900 dark:text-white">
                                {t('store.title')}
                            </h4>
                            <p className="text-sm sm:text-base text-gray-700 dark:text-indigo-100">
                                {t('store.description')}
                            </p>
                        </div>
                    </div>

                    {/* Item Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
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
            </Container>
        </UserLayout>
    );
}


