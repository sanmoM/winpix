import SectionHeading from "@/components/shared/SectionHeading";
import { FaTrophy } from "react-icons/fa";
import { IoMdCamera } from "react-icons/io";
import { PiBalloonFill } from "react-icons/pi";
import ServiceCard from "./components/service-card";

const WhatWeDo = ({ t }: { t: any }) => {
    const services = t('aboutUs.whatWeDo.services', { returnObjects: true });

    const icons = [
        <FaTrophy className="text-2xl text-white" />,
        <IoMdCamera className="text-2xl text-white" />,
        <PiBalloonFill className="text-2xl text-white" />,
    ];

    return (
        <div>
            <SectionHeading title={t('aboutUs.whatWeDo.title')} />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {services.map((service: any, index: number) => (
                    <ServiceCard
                        key={index}
                        icon={icons[index]}
                        title={service.title}
                        description={service.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default WhatWeDo;
