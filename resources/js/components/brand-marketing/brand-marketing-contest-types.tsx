import { CalendarDays, ChevronRight, Megaphone, ShoppingBag, Trophy } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';


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

export default function BrandMarketingContestTypes() {
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading title='Contest Types' className='mb-3 md:mb-4 lg:mb-6' />
                <p className="!text-center text-xs md:text-sm lg:text-lg text-gray-400 mb-4 md:mb-6 lg:mb-10 lg:w-[90%] mx-auto">
                    Tailored campaign formats designed to meet your specific marketing objectives.
                </p>



                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contestTypes.map((type, index) => (
                        <ContestTypeCard key={index} {...type} />
                    ))}
                </div>
            </div>
        </div>
    )
}


const ContestTypeCard = ({ icon: Icon, title, description, badge }) => (
    <div className="flex items-start p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white transition-all duration-300">
        <div className="flex-shrink-0 p-3 bg-white rounded-xl shadow-sm text-indigo-600 mr-5 border border-slate-100">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);
