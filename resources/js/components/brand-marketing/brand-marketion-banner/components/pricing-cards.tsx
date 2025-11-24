import PillButton from '@/components/shared/buttons/pill-button';
import { ArrowRight, Check } from 'lucide-react';

export default function PricingCards() {
    return (
        <div className="container mx-auto px-4 mt-20">

            {/* Cards Container */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 pt-4">

                {/* Basic Card */}
                <div className="w-full max-w-[24rem] lg:w-96 p-8 bg-white text-center rounded-3xl shadow-xl border border-gray-100 z-10">
                    <h1 className="text-black font-semibold text-2xl">Basic</h1>
                    <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top text-lg">$ </span>
                        <span className="text-3xl font-semibold">10</span>
                        <span className="text-gray-400 font-medium">/ user</span>
                    </p>
                    <hr className="mt-4 border-gray-200" />
                    <div className="pt-8 space-y-5">
                        <FeatureItem text="Get started with" boldText="messaging" />
                        <FeatureItem text="Flexible" boldText="team meetings" />
                        <FeatureItem text="" boldText="5 TB" suffix="cloud storage" />

                        <PillButton className='bg-primary-color text-white mx-auto' label='Choose Plan' />
                    </div>
                </div>

                {/* Startup Card (Middle - Scaled) */}
                <div className="w-full max-w-[22rem] lg:w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 border-white shadow-2xl transform lg:scale-125 z-20 relative order-first lg:order-none">

                    {/* Popular Badge */}
                    <div className="absolute top-4 right-4">
                        <p className="bg-blue-600 font-semibold px-3 py-1 rounded-full uppercase text-[8px] tracking-wider">Popular</p>
                    </div>

                    <h1 className="text-white font-semibold text-2xl">Startup</h1>
                    <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top text-lg">$ </span>
                        <span className="text-3xl font-semibold">24</span>
                        <span className="text-gray-400 font-medium">/ user</span>
                    </p>
                    <hr className="mt-4 border-gray-700" />
                    <div className="pt-8 space-y-5">
                        <FeatureItem text="All features in" boldText="Basic" isDark />
                        <FeatureItem text="Flexible" boldText="call scheduling" isDark />
                        <FeatureItem text="" boldText="15 TB" suffix="cloud storage" isDark />

                        <PillButton className='bg-primary-color text-white mx-auto' label='Choose Plan' />
                    </div>
                </div>

                {/* Enterprise Card */}
                <div className="w-full max-w-[24rem] lg:w-96 p-8 bg-white text-center rounded-3xl shadow-xl border border-gray-100 z-10">
                    <h1 className="text-black font-semibold text-2xl">Enterprise</h1>
                    <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top text-lg">$ </span>
                        <span className="text-3xl font-semibold">35</span>
                        <span className="text-gray-400 font-medium">/ user</span>
                    </p>
                    <hr className="mt-4 border-gray-200" />
                    <div className="pt-8 space-y-5">
                        <FeatureItem text="All features in" boldText="Startup" />
                        <FeatureItem text="Growth" boldText="oriented" />
                        <FeatureItem text="" boldText="Unlimited" suffix="cloud storage" />

                        <PillButton className='bg-primary-color text-white mx-auto' label='Choose Plan' />
                    </div>
                </div>

            </div>
        </div>
    );
}

// Helper component for list items
function FeatureItem({ text, boldText, suffix = "", isDark = false }) {
    return (
        <p className={`font-semibold text-left flex items-start gap-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <span className="mt-1">
                <Check className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            </span>
            <span className='text-nowrap text-sm'>
                {text} <span className={isDark ? 'text-white' : 'text-black'}>{boldText}</span> {suffix}
            </span>
        </p>
    );
}