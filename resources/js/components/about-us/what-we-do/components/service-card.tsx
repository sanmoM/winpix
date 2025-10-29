import { ReactNode } from "react";

interface ServiceCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => (
    <div className="rounded-lg bg-bg-primary p-8 text-center">
        <div className="mb-6 w-fit flex items-center justify-center rounded-full bg-primary-color p-4 mx-auto">
            {icon}
        </div>
        <h3 className="mb-3 text-2xl font-semibold text-white !text-center ">{title}</h3>
        <p className="text-slate-400 !text-center ">{description}</p>
    </div>
);

export default ServiceCard;