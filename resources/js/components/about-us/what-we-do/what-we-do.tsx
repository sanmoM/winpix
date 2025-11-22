import SectionHeading from '@/components/shared/SectionHeading';
import useLocales from '@/hooks/useLocales';
import ServiceCard from './components/service-card';

const WhatWeDo = ({ t, services }: { t: any }) => {
    const { currentLanguage } = useLocales();

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
