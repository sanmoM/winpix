
// Main App component
const GetApp = ({ t }: any) => {



    return (
        <div className='flex flex-col lg:flex-row justify-center items-center gap-2 px-4 md:px-0 bg-bg-primary'>
            <img src='/images/mobile.png' className="w-1/2 md:w-[40%] lg:w-1/4" />
            <div className="max-w-2xl w-full font-sans">
                {/* Header Text */}
                <h1 className="text-xl md:text-5xl lg:text-4xl font-extrabold mb-3 md:mb-4 leading-tight !text-center lg:text-left">
                    {/* Download The App For <span className="text-secondary-color">FREE!</span> */}
                    {t("home.getApp.title")}
                </h1>

                {/* Subtext */}
                <p className="text-sm md:text-2xl lg::text-xl text-gray-400 mb-4 md:mb-10 max-w-2xl !text-center lg:text-left">
                    {t("home.getApp.description")}
                </p>

                {/* Buttons Container (Flexbox for responsiveness) */}
                <div className="flex flex-row justify-center lg:justify-start space-x-4 md:space-x-6">

                    <button className='w-[100px] md:w-[200px] lg::w-[150px] cursor-pointer'>
                        <img src='/images/apple-store.png' />
                    </button>
                    <button className='w-[100px] md:w-[200px] lg::w-[150px] cursor-pointer'>
                        <img src='/images/google-play-store.png' />
                    </button>

                </div>

                <p className="mt-8 text-sm text-gray-500">
                    {/* IMPORTANT: Placeholder URLs were used. Update the hrefs in the StoreButton components with your actual app links! */}
                </p>
            </div>
        </div>
    );
};

// 2. Reusable Button Component


export default GetApp;
