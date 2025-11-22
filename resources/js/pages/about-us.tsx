import WhatWeDo from '@/components/about-us/what-we-do/what-we-do';
import Banner from '@/components/shared/banner';
import Container from '@/components/shared/container';
import SectionHeading from '@/components/shared/SectionHeading';
import useLocales from '@/hooks/useLocales';
import UserLayout from '@/layouts/user-layout';

export default function AboutUs({ services }: any) {
    const { t } = useLocales();
    return (
        <UserLayout>
            <Banner
                src="https://media.istockphoto.com/id/1366027192/photo/beautiful-caribbean-sea-and-blue-sky-travel-background.jpg?s=612x612&w=0&k=20&c=HLCx2KjDwOPul-j117AH1-9EtTKt_3RhVh-pynVm8PM="
                containerClass="h-[30vh] lg:h-[45vh]"
            >
                <div className="flex h-full w-full items-center justify-center">
                    <SectionHeading
                        title={t('aboutUs.title')}
                        className="text-4xl font-bold text-white lg:text-6xl"
                    />
                </div>
            </Banner>
            <Container className="my-10 space-y-14 md:my-16 md:space-y-20 lg:my-12 lg:space-y-28">
                <WhatWeDo t={t} services={services} />
            </Container>
        </UserLayout>
    );
}
