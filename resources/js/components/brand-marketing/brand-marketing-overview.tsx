import {
    TrendingUp,
    Users
} from 'lucide-react';

import { BarChart3, Camera, Rocket } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';

const FeatureCard = ({ icon, title, description, color }) => (
    <div className="group p-6 bg-bg-primary rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 w-full md:w-[45%] lg:w-[30%]">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            {/* <Icon className="w-6 h-6 text-white" /> */}
            <img src={"/storage/" + icon} alt="" className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
)

const colors = [
    "bg-pink-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-violet-500",
    "bg-emerald-500",
]
export default function BrandMarketingOverview({ data: features, t }) {
    console.log(features)
    return (
        <div className=' mx-auto max-w-7xl'>
            <SectionHeading className='mb-3 md:mb-4 lg:mb-6' title={t('brandMarketing.whyChooseWinpix.title')} />
            <p className='!text-center text-xs md:text-sm lg:text-lg text-gray-600 dark:text-gray-300 mb-4 md:mb-6 lg:mb-12 lg:w-[70%] mx-auto'>
                {t('brandMarketing.whyChooseWinpix.description')}
            </p>

            <div className="flex justify-center gap-8 flex-wrap">
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        title={feature.title}
                        description={feature.content}
                        color={colors[index % colors.length]}
                        icon={feature.bg_image}
                    />
                ))}
            </div>
        </div>
    )
}
