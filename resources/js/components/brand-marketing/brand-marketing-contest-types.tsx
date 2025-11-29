import { CalendarDays, ChevronRight, Megaphone, ShoppingBag, Trophy } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import { cn } from '@/lib/utils';


const contestTypes = [
    {
        icon: Trophy,
        title: "Sponsored Contests",
        description: "Ideal for brand collaborations or product launches."
    },
    {
        icon: CalendarDays,
        title: "Event Contests",
        description: "Perfect for festivals, holidays, and community initiatives."
    },
    {
        icon: ShoppingBag,
        title: "Product Contests",
        description: "Promote a specific product or collection through creative visuals."
    },
    {
        icon: Megaphone,
        title: "Awareness Contests",
        description: "Strengthen brand identity and recognition."
    }
];

const colors = [
    "bg-pink-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-violet-500",
    "bg-emerald-500",
]

export default function BrandMarketingContestTypes() {
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading title='Contest Types' className='mb-3 md:mb-4 lg:mb-6' />
                <p className="!text-center text-xs md:text-sm lg:text-lg text-gray-600 dark:text-gray-300 mb-4 md:mb-6 lg:mb-12 lg:w-[90%] mx-auto">
                    Tailored campaign formats designed to meet your specific marketing objectives.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contestTypes.map((type, index) => (
                        <ContestTypeCard key={index} {...type} colors={colors[index % colors.length]} />
                    ))}
                </div>
            </div>
        </div>
    )
}


const ContestTypeCard = ({ icon: Icon, title, description, colors }) => (
    <div className="flex items-start p-6 rounded-2xl bg-bg-primary border transition-all duration-300">
        <div className={cn("flex-shrink-0 p-3 bg-white rounded-xl shadow-sm mr-5", colors)}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);
