import SectionHeading from '@/components/shared/SectionHeading';
import useLocales from '@/hooks/useLocales';
import { FaTrophy } from 'react-icons/fa';
import { IoMdCamera } from 'react-icons/io';
import { PiBalloonFill } from 'react-icons/pi';
import ServiceCard from './components/service-card';

const WhatWeDo = ({ t, services }: { t: any }) => {
    // const services = t('aboutUs.whatWeDo.services', { returnObjects: true });
    console.log(services);
    const { currentLanguage } = useLocales();
    const icons = [
        <FaTrophy className="text-2xl text-white" />,
        <IoMdCamera className="text-2xl text-white" />,
        <PiBalloonFill className="text-2xl text-white" />,
    ];

    return (
        <div>
            <SectionHeading title={t('aboutUs.whatWeDo.title')} />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {services
                    ?.filter((service: any) => service.lang === currentLanguage)
                    .map((service: any, index: number) => (
                        <ServiceCard key={index} item={service} />
                    ))}
            </div>
        </div>
    );
};

export default WhatWeDo;
