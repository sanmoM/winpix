import React from 'react';

// Main App component
const GetApp = () => {



    return (
        <div className='flex justify-center items-center gap-2'>
            <img src='/images/mobile.png' />
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

                    {/* Apple App Store Button */}
                    <StoreButton
                        href="URL_TO_APP_STORE"
                        Icon={AppleIcon}
                        preText="Download on the"
                        mainText="App Store"
                        ringColor="focus:ring-blue-500/50"
                        ariaLabel="Download on the App Store"
                    />

                    {/* Google Play Button */}
                    <StoreButton
                        href="URL_TO_GOOGLE_PLAY"
                        Icon={GooglePlayIcon}
                        preText="GET IT ON"
                        mainText="Google Play"
                        ringColor="focus:ring-green-500/50"
                        ariaLabel="Get it on Google Play"
                    />

                </div>

                <p className="mt-8 text-sm text-gray-500">
                    {/* IMPORTANT: Placeholder URLs were used. Update the hrefs in the StoreButton components with your actual app links! */}
                </p>
            </div>
        </div>
    );
};

// 1. Icon Components (Inline SVGs for Apple and Google Play)
const AppleIcon = ({ className = 'w-7 h-7' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 256 256">
        {/* Main Apple Logo path */}
        <path fill="currentColor" d="M192.83,115.15c.66,22-15.61,37.15-36.93,37.26-19.46.12-30.82-13.78-31-33.85-.23-22.61,15.61-38.67,37.52-38.31C182.88,80.4,192.17,94.27,192.83,115.15Zm-38.35-7.79c-.06-1.57-.11-3.13-.17-4.7s-.11-3.12-.17-4.68c-.14-3.92-.3-7.82-.44-11.73-.24-5.91-.48-11.82-.72-17.72-.08-2-.16-4-.24-6-.07-1.84-.14-3.69-.21-5.54a10.83,10.83,0,0,0-10.74-9.39c-3.15.12-6.3.24-9.45.36-2.58.1-5.16.2-7.74.31-5.69.23-11.39.45-17.08.68-1.12.04-2.24.09-3.36.13-1.68.07-3.35.13-5.03.2-1.8.07-3.6.14-5.39.21-1.28.05-2.56.09-3.84.14-1.29.05-2.58.09-3.87.14a10.81,10.81,0,0,0-9.61,11.39c.07,1.8.14,3.6.21,5.39.08,2.07.16,4.14.24,6.21.23,5.92.47,11.83.71,17.75.14,3.9.3,7.8.44,11.71.05,1.57.1,3.13.15,4.7s.11,3.12.16,4.68c.08,2.56.16,5.13.24,7.7s.17,5.14.24,7.71c.08,2.56.16,5.13.24,7.7s.17,5.14.24,7.71c.08,2.56.16,5.13.24,7.7s.17,5.14.24,7.71c.14,4.28.29,8.56.43,12.84.09,2.77.17,5.53.25,8.3s.17,5.53.25,8.3c.08,2.77.16,5.53.24,8.3s.17,5.53.25,8.3c.08,2.77.16,5.53.24,8.3s.17,5.53.25,8.3c.17,5.36.34,10.72.51,16.08a10.82,10.82,0,0,0,11.19,10.23c2.72-.09,5.43-.19,8.15-.28,2.56-.09,5.12-.17,7.68-.26,5.7-.19,11.4-.38,17.1-.57,1.13-.04,2.26-.08,3.39-.12,1.72-.06,3.44-.13,5.16-.19,1.84-.07,3.67-.14,5.51-.2a10.81,10.81,0,0,0,9.93-11.84c-.06-1.57-.11-3.13-.17-4.7s-.11-3.12-.17-4.68c-.14-3.92-.3-7.82-.44-11.73-.24-5.91-.48-11.82-.72-17.72-.08-2-.16-4-.24-6-.07-1.84-.14-3.69-.21-5.54-.08-2.07-.16-4.14-.24-6.21-.23-5.92-.47-11.83-.71-17.75Z" />
        <path fill="currentColor" d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z" />
    </svg>
);

const GooglePlayIcon = ({ className = 'w-7 h-7' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        {/* Google Play icon path (colored via Tailwind) */}
        <path d="M2.001 20.21a2.002 2.002 0 0 0 2.453.792l17.065-8.216a2.002 2.002 0 0 0 0-3.572L4.454 1.002a2.001 2.001 0 0 0-2.453.792c-.371.494-.483 1.127-.29 1.761l2.454 6.845L11.75 12 4.165 17.653l-2.454 6.845a2.002 2.002 0 0 0 .29 1.761Z"
            fill="currentColor" />
    </svg>
);

// 2. Reusable Button Component
const StoreButton = ({ href, Icon, preText, mainText, ringColor, ariaLabel }:{href: string, Icon: React.FC, preText: string, mainText: string, ringColor: string, ariaLabel: string}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex-1 min-w-48 bg-white text-gray-900 border border-gray-200 
                        hover:border-gray-300 transition duration-150 ease-in-out
                        py-3 px-6 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 ${ringColor} 
                        flex items-center justify-center space-x-3 group cursor-pointer`}
        aria-label={ariaLabel}
    >
        <Icon />
        <span className="flex flex-col text-left -space-y-1">
            <span className="text-xs font-semibold opacity-70 group-hover:opacity-90 transition-opacity">{preText}</span>
            <span className="text-xl font-bold tracking-tight">{mainText}</span>
        </span>
    </a>
);

export default GetApp;
