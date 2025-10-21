
// Main App component
const GetApp = () => {



    return (
        <div className='flex justify-center items-center gap-2'>
            <img src='/images/mobile.png' className="w-1/4" />
            <div className="max-w-2xl w-full font-sans">
                {/* Header Text */}
                <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
                    Download The App For <span className="text-secondary-color">FREE!</span>
                </h1>

                {/* Subtext */}
                <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl">
                    Make your online shopping experience easier and faster. Click the link to get the app now.
                </p>

                {/* Buttons Container (Flexbox for responsiveness) */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">

                    <button className='w-[150px] cursor-pointer'>
                        <img src='/images/apple-store.png' />
                    </button>
                    <button className='w-[150px] cursor-pointer'>
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
