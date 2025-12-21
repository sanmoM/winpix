import Container from '@/components/shared/container';
import Creator from '@/components/shared/creator';
import CoinCard from '@/components/shared/profile/coin-card';
import LevelProgress from '@/components/shared/profile/lavel-progress';
import StatsCard from '@/components/shared/profile/stats-card';
import Tab from '@/components/shared/tab';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { RiFolderUploadFill } from 'react-icons/ri';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users Details',
        href: '',
    },
];

const stats = {
    currentLevel: 100,
    totalQuests: 100,
    questImages: [
        {
            id: 1,
            image: {
                id: 1,
                url: 'https://images.unsplash.com/photo-1678489820694-df9e1d6a8a6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            },
        },
        {
            id: 2,
            image: {
                id: 2,
                url: 'https://images.unsplash.com/photo-1678489820694-df9e1d6a8a6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            },
        },
    ],
};

export default function ViewUser() {
    const { user } = usePage<any>().props;
    const { t } = useLocales();
    const [activeTab, setActiveTab] = useState("my-stats");
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className=''>
                <div className='flex justify-center items-center bg-bg-primary h-[70vh] lg:h-[40vh]'>
                    <Creator containerClassName='flex-col-reverse lg:flex-row lg:flex-row-reverse' infoContainerClassName='items-center lg:items-start' imageClassName='w-32 h-32 !border-primary-color lg:w-40 lg:h-40 border-6 p-0.5' followBtnClassName='text-sm px-6 py-1.5' nameClassName='text-3xl' hasBtn={false} >
                        <div className='mt-4 flex gap-3 items-center'>
                            <div>
                                <h6 className='text-sm text-gray-400'>{t("shared.followers")}</h6>
                                <p className='font-semibold dark:text-white'>{stats.followers}</p>
                            </div>
                            <div>
                                <h6 className='text-sm text-gray-400'>{t("shared.following")}</h6>
                                <p className='font-semibold dark:text-white'>{stats.following}</p>
                            </div>
                        </div>
                    </Creator>
                </div>
                <Container className='w-full lg:min-w-lg lg:w-fit mx-auto mt-4'>
                    <LevelProgress displayValue={stats.currentLevel} level={stats.currentLevel} max={100} current={stats.currentLevel} containerClassName='' />
                    <div className='grid grid-cols-3 gap-4 flex-1 mt-4'>
                        <CoinCard item={{ src: "/images/coin.png" }} />
                        <CoinCard item={{ src: "/images/golden-coin.png" }} />
                        <CoinCard item={{ src: "/images/cash.png" }} />
                    </div>
                    <div className='flex gap-4 mt-4'>
                        <StatsCard item={{ icon: <FaTrophy className='w-6 h-6 lg:w-8 lg:h-8 text-white' />, label: stats.totalQuests }} />
                        <StatsCard item={{ icon: <RiFolderUploadFill className='w-6 h-6 lg:w-8 lg:h-8 text-white' />, label: stats?.questImages?.length }} />
                    </div>
                </Container>
                <Container className="space-y-14 md:space-y-20 lg:space-y-16 my-10 md:my-16 lg:mt-12 lg:mb-32 lg:mx-10">
                    <div className='w-fit mx-auto'>
                        <Tab
                            options={[
                                { label: t("profile.tabs.stats"), value: "my-stats" },
                                { label: t("profile.tabs.photos"), value: "my-photos" },
                            ]}
                            onChange={(val) => setActiveTab(val)}
                        />
                    </div>
                    {/* {
                        activeTab === "my-stats" && <Stats containerClassName='translate-y-0 mb-0 md:mb-0 lg:mb-0' t={t} stats={stats} />
                    } */}
                    {/* {
                        activeTab === "my-photos" && <Gallery galleryImages={stats?.questImages?.map(item => ({
                            id: item?.image?.id,
                            image: item?.image,
                            user
                        }))} />
                    } */}
                </Container>
            </div>
        </AppLayout>
    );
}
