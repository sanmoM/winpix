import Gallery from '@/components/home/Gallery';
import Stats from '@/components/profile/stats';
import Banner from '@/components/shared/banner';
import Container from '@/components/shared/container';
import Creator from '@/components/shared/creator';
import Tab from '@/components/shared/tab';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const { t } = useLocales();
    const [activeTab, setActiveTab] = useState("my-stats");
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className=''>
                <Banner src='https://cdn.pulsepx.com/user-resources/110012355/profile-cover' containerClass='lg:h-[89vh]'>
                    <div className='flex justify-center items-center h-full'>
                        <Creator containerClassName='flex-col-reverse lg:flex-row lg:flex-row-reverse' infoContainerClassName='items-center lg:items-start' imageClassName='w-32 h-32 !border-primary-color lg:w-40 lg:h-40 border-6 p-0.5' followBtnClassName='text-sm px-6 py-1.5' nameClassName='text-3xl text-white'
                            btnText='Edit'
                            onClick={() => router.get("/settings/profile")}

                        >
                            <div className='mt-4 flex gap-3 items-center'>
                                <div>
                                    <h6 className='text-sm text-gray-400'>Followers</h6>
                                    <p className='font-semibold text-white'>12,345</p>
                                </div>
                                <div>
                                    <h6 className='text-sm text-gray-400'>Following</h6>
                                    <p className='font-semibold text-white'>12,345</p>
                                </div>
                            </div>
                        </Creator>
                    </div>
                </Banner>
                <Container className="space-y-14 md:space-y-20 lg:space-y-16 my-10 md:my-16 lg:mt-12 lg:mb-32 mx-10">
                    <div className='w-fit mx-auto'>
                        <Tab
                            options={[
                                { label: "My Stats", value: "my-stats" },
                                { label: "My Photos", value: "my-photos" },
                                { label: "Liked Photos", value: "liked-photos" },
                            ]}
                            onChange={(val) => setActiveTab(val)}
                        />
                    </div>
                    {
                        activeTab === "my-stats" && <Stats containerClassName='translate-y-0' />
                    }
                    {
                        activeTab === "my-photos" && <Gallery />
                    }
                    {
                        activeTab === "liked-photos" && <Gallery />
                    }
                </Container>
            </div>
        </AppLayout>
    );
}
