import Stats from '@/components/profile/stats';
import Container from '@/components/shared/container';
import Creator from '@/components/shared/creator';
import Gallery from '@/components/shared/Gallery';
import NoData from '@/components/shared/no-data';
import CoinCard from '@/components/shared/profile/coin-card';
import LevelProgress from '@/components/shared/profile/lavel-progress';
import StatsCard from '@/components/shared/profile/stats-card';
import Tab from '@/components/shared/tab';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { RiFolderUploadFill } from 'react-icons/ri';

export default function Dashboard({ stats }: { stats: any }) {
    // const user = usePage().props.auth.user;
    const user = usePage().props.user;

    const { t } = useLocales();
    const [activeTab, setActiveTab] = useState('my-photos');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard.profile.heading'),
            href: dashboard().url,
        },
    ];

    console.log(stats)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />
            <div className="">
                {/* <div className="flex h-[70vh] items-center justify-center bg-bg-primary lg:h-[40vh]">
                    <Creator
                        containerClassName="flex-col-reverse lg:flex-row lg:flex-row-reverse"
                        infoContainerClassName="items-center lg:items-start"
                        imageClassName="w-32 h-32 !border-primary-color lg:w-40 lg:h-40 border-6 p-0.5"
                        followBtnClassName="text-sm px-6 py-1.5"
                        nameClassName="text-3xl"
                        btnText="Edit"
                        onClick={() => router.get('/settings/profile')}
                    >
                        <div className="mt-4 flex items-center gap-3">
                            <div>
                                <h6 className="text-sm text-gray-400">
                                    {t('shared.followers')}
                                </h6>
                                <p className="font-semibold dark:text-white">
                                    {stats.followers}
                                </p>
                            </div>
                            <div>
                                <h6 className="text-sm text-gray-400">
                                    {t('shared.following')}
                                </h6>
                                <p className="font-semibold dark:text-white">
                                    {stats.following}
                                </p>
                            </div>
                        </div>
                    </Creator>
                </div> */}
                <div className='flex justify-center items-center bg-bg-primary h-[70vh] lg:h-[40vh]'>
                    <Creator containerClassName='flex-col-reverse lg:flex-row lg:flex-row-reverse' infoContainerClassName='items-center lg:items-start' imageClassName='w-32 h-32 !border-primary-color lg:w-40 lg:h-40 border-6 p-0.5' followBtnClassName='text-sm px-6 py-1.5' nameClassName='text-3xl' hasBtn={false} userFromParent={user} >
                        <div className='mt-4 flex gap-3 items-center'>
                            <div>
                                <h6 className='text-sm text-gray-400'>{t("shared.followers")}</h6>
                                <p className='font-semibold dark:text-white'>{user.followers?.length}</p>
                            </div>
                            <div>
                                <h6 className='text-sm text-gray-400'>{t("shared.following")}</h6>
                                <p className='font-semibold dark:text-white'>{user.following?.length}</p>
                            </div>
                        </div>
                    </Creator>
                </div>
                <Container className='w-full lg:min-w-lg lg:w-fit mx-auto mt-4'>
                    <LevelProgress displayValue={user.level} level={user.level} max={100} current={user.level} containerClassName='' />
                    <div className='grid grid-cols-3 gap-4 flex-1 mt-4'>
                        <CoinCard item={{ src: "/images/coin.png", count: user?.pixel }} />
                        <CoinCard item={{ src: "/images/golden-coin.png", count: user?.coin }} />
                        <CoinCard item={{ src: "/images/cash.png", count: user?.cash }} />
                    </div>
                    <div className='flex gap-4 mt-4'>
                        <StatsCard item={{ icon: <FaTrophy className='w-6 h-6 lg:w-8 lg:h-8 text-white' />, label: user.joined_quests?.length }} />
                        <StatsCard item={{ icon: <RiFolderUploadFill className='w-6 h-6 lg:w-8 lg:h-8 text-white' />, label: user.votes?.length }} />
                    </div>
                </Container>
                <Container className="my-10 space-y-4 md:space-y-8 lg:space-y-10 lg:mx-6 lg:mt-20 lg:mb-32">
                    <div className="mx-auto w-fit">
                        <Tab
                            options={[
                                // {
                                //     label: t('dashboard.profile.tab.myStats'),
                                //     value: 'my-stats',
                                // },
                                {
                                    label: t('dashboard.profile.tab.myPhotos'),
                                    value: 'my-photos',
                                },
                                {
                                    label: t(
                                        'dashboard.profile.tab.likedPhotos',
                                    ),
                                    value: 'liked-photos',
                                },
                            ]}
                            onChange={(val) => setActiveTab(val)}
                        />
                    </div>
                    {activeTab === 'my-stats' && (
                        <Stats
                            containerClassName="translate-y-0 mb-0 md:mb-0 lg:mb-0"
                            t={t}
                            stats={stats}
                        />
                    )}
                    {activeTab === 'my-photos' && (stats?.questImages?.length > 0 ? (
                        <Gallery
                            galleryImages={stats?.questImages?.map((item) => ({
                                id: item?.image?.id,
                                image: item?.image,
                                user,
                            }))}
                            hasImageView={false}
                        />
                    ) : (
                        <NoData text='No photos uploaded yet' />
                    ))}
                    {activeTab === 'liked-photos' && (stats?.likedImages?.length > 0 ? (
                        <Gallery
                            galleryImages={stats?.likedImages?.map((item) => ({
                                id: item?.image?.id,
                                image: item?.image?.image,
                                user,
                            }))}
                            hasImageView={false}
                        />
                    ) : (
                        <NoData text='No liked photos yet' />
                    ))}
                </Container>
            </div>
        </AppLayout>
    );
}
