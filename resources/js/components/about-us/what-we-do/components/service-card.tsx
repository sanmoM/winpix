import { ReactNode } from 'react';

interface ServiceCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

const ServiceCard = ({ item }: ServiceCardProps) => (
    <div className="rounded-lg bg-bg-primary p-8 text-center">
        <div className="mx-auto mb-6 flex w-fit items-center justify-center">
            <img
                src={'/storage/' + item.picture}
                alt={item.title}
                className="h-10 w-10 rounded-full"
            />
        </div>
        <h3 className="mb-3 !text-center text-2xl font-semibold">
            {item?.title}
        </h3>
        <p
            className="!text-center text-slate-400"
            dangerouslySetInnerHTML={{ __html: item.content }}
        />
    </div>
);

export default ServiceCard;
