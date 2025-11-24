import {
    TrendingUp,
    Users
} from 'lucide-react';

import { BarChart3, Camera, Rocket } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const FeatureCard = ({ icon: Icon, title, description, color }) => (
    <div className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 w-full md:w-[45%] lg:w-[30%]">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
)
export default function BrandMarketingOverview() {
    const features = [
        {
            icon: Camera,
            title: "Authentic Content Generation",
            description: "Move beyond generic stock imagery. Crowdsource authentic, high-quality visual content directly from users who love your brand and gain diverse assets tailored to your themes.",
            color: "bg-pink-500"
        },
        {
            icon: Rocket,
            title: "Amplified Brand Promotion",
            description: "Promote your brand through the lens of creativity. Encourage deep interaction with your products, creating organic buzz and enhancing visibility beyond traditional ads.",
            color: "bg-indigo-500"
        },
        {
            icon: Users,
            title: "Access to Global Talent",
            description: "Connect with a vast network of creatives. From professional photographers to rising talents, access a creative workforce across the GCC region and the globe.",
            color: "bg-blue-500"
        },
        {
            icon: TrendingUp,
            title: "Deep Engagement & Reach",
            description: "Drive higher engagement rates across social media. Winpix contests are designed to be shared, liked, and commented on, exponentially increasing your digital footprint.",
            color: "bg-violet-500"
        },
        {
            icon: BarChart3,
            title: "Data-Driven Insights",
            description: "Measure success with precision. Receive detailed analytics after every contest to understand participant demographics, reach, and the overall ROI of your campaign.",
            color: "bg-emerald-500"
        }
    ];
    return (
        <div className=' mx-auto max-w-7xl'>
            <SectionHeading title='Why Choose Winpix Contests' className='mb-3 md:mb-4 lg:mb-6' />
            <p className='!text-center text-xs md:text-sm lg:text-lg text-gray-600 mb-4 md:mb-6 lg:mb-12 lg:w-[70%] mx-auto'>Winpix turns marketing campaigns into photography contests, connecting brands with thousands of creators across the GCC and worldwide to produce authentic visual content.
            </p>

            <div className="flex justify-center gap-8 flex-wrap">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        {...feature}
                    />
                ))}
            </div>
        </div>
    )
}
