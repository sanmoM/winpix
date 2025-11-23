import { Link } from '@inertiajs/react';
import { Star } from 'lucide-react';
import { useState } from 'react';
import Button from '../../shared/buttons/button';
import SectionHeading from '../../shared/SectionHeading';

// --- Mock Data ---

const featuredBrand = {
    name: "Lumina Lens Studio",
    tagline: "Capturing light, crafting memories.",
    description: "Specializing in high-dynamic range landscape photography and cinematic wedding videography. Official partner of the 2024 Nature Shoot.",
    coverImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=200&auto=format&fit=crop",
    website: "www.luminalens.com",
    category: "Premium Partner"
};
export default function BrandMarketing() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="">
            <SectionHeading title={"Promote Your Brand"} className=" !text-center" />
            {/* UNIFIED COMPONENT: Hero + CTA merged into one container */}
            <div
                className="relative group overflow-hidden h-[60vh] rounded-xl"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={featuredBrand.coverImage}
                        alt="Brand Cover"
                        className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-105' : 'scale-100'}`}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-black/60"></div>

                    <div className="absolute top-6 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Premium Partner
                    </div>
                </div>

                {/* Content Content */}
                <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row gap-6 items-end justify-center w-full">
                        <div className="flex flex-col gap-6 items-center w-full max-w-3xl">
                            {/* Brand Identity */}
                            <div className="flex items-center gap-5">
                                <div>
                                    {/* <div className="inline-block px-2 py-0.5 bg-indigo-600 rounded text-[10px] font-bold text-white uppercase tracking-wider mb-1">Featured</div> */}
                                    <h4 className="text-3xl md:text-5xl font-bold text-white leading-tight !text-center">Launch Your Brand Contest with Winpix</h4>
                                    <p className='text-gray-200 mt-4 !text-center w-[90%] mx-auto text-lg'>Turn your marketing campaign into an interactive photo contest.
                                    </p>
                                </div>
                            </div>
                            <Link href="/brand-marketing">
                                <Button text='Launch Now' className='px-7 py-3' />
                            </Link>
                        </div>


                    </div>
                </div>
            </div>
            {/* <PricingCards /> */}

        </div>
    );
}