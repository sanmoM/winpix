import Container from '@/components/shared/container';
import Creator from '@/components/shared/creator';
import Gallery from '@/components/shared/Gallery';
import NoData from '@/components/shared/no-data';
import CoinCard from '@/components/shared/profile/coin-card';
import LevelProgress from '@/components/shared/profile/lavel-progress';
import StatsCard from '@/components/shared/profile/stats-card';
import SectionHeading from '@/components/shared/SectionHeading';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { FaTrophy } from 'react-icons/fa';
import { RiFolderUploadFill } from 'react-icons/ri';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users Details',
        href: '',
    },
];

// const stats = {
//     currentLevel: 100,
//     totalQuests: 100,
//     questImages: [
//         {
//             id: 1,
//             image: {
//                 id: 1,
//                 url: 'https://images.unsplash.com/photo-1678489820694-df9e1d6a8a6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//             },
//         },
//         {
//             id: 2,
//             image: {
//                 id: 2,
//                 url: 'https://images.unsplash.com/photo-1678489820694-df9e1d6a8a6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//             },
//         },
//     ],
// };

export default function ViewUser() {
    const { user, usersPhotos } = usePage<any>().props;
    const { t } = useLocales();
    // const [activeTab, setActiveTab] = useState("my-stats");
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="">
                <div className="flex h-[70vh] items-center justify-center bg-bg-primary lg:h-[40vh]">
                    <Creator
                        containerClassName="flex-col-reverse lg:flex-row lg:flex-row-reverse"
                        infoContainerClassName="items-center lg:items-start"
                        imageClassName="w-32 h-32 !border-primary-color lg:w-40 lg:h-40 border-6 p-0.5"
                        followBtnClassName="text-sm px-6 py-1.5"
                        nameClassName="text-3xl"
                        hasBtn={false}
                        userFromParent={user}
                    >
                        <div className="mt-4 flex items-center gap-3">
                            <div>
                                <h6 className="text-sm text-gray-400">
                                    {t('shared.followers')}
                                </h6>
                                <p className="font-semibold dark:text-white">
                                    {user.followers?.length}
                                </p>
                            </div>
                            <div>
                                <h6 className="text-sm text-gray-400">
                                    {t('shared.following')}
                                </h6>
                                <p className="font-semibold dark:text-white">
                                    {user.following?.length}
                                </p>
                            </div>
                        </div>
                    </Creator>
                </div>
                <Container className="mx-auto mt-4 w-full lg:w-fit lg:min-w-lg">
                    <LevelProgress
                        displayValue={user.level}
                        level={user.level}
                        max={100}
                        current={user.level}
                        containerClassName=""
                    />
                    <div className="mt-4 grid flex-1 grid-cols-3 gap-4">
                        <CoinCard
                            item={{
                                src: '/images/coin.png',
                                count: user?.pixel,
                            }}
                        />
                        <CoinCard
                            item={{
                                src: '/images/golden-coin.png',
                                count: user?.coin,
                            }}
                        />
                        <CoinCard
                            item={{
                                src: '/images/cash.png',
                                count: user?.cash,
                            }}
                        />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <StatsCard
                            item={{
                                icon: (
                                    <FaTrophy className="h-6 w-6 text-white lg:h-8 lg:w-8" />
                                ),
                                label: user.joined_quests?.length,
                            }}
                        />
                        <StatsCard
                            item={{
                                icon: (
                                    <RiFolderUploadFill className="h-6 w-6 text-white lg:h-8 lg:w-8" />
                                ),
                                label: user.votes?.length,
                            }}
                        />
                    </div>
                </Container>
                <Container className="my-10 space-y-14 md:my-16 md:space-y-20 lg:mx-10 lg:mt-12 lg:mb-32 lg:space-y-16">
                    {/* <div className='w-fit mx-auto'>
                        <Tab
                            options={[
                                { label: t("profile.tabs.stats"), value: "my-stats" },
                                { label: t("profile.tabs.photos"), value: "my-photos" },
                            ]}
                            onChange={(val) => setActiveTab(val)}
                        />
                    </div>
                    {
                        activeTab === "my-stats" && <Stats containerClassName='translate-y-0 mb-0 md:mb-0 lg:mb-0' t={t} stats={stats} />
                    }
                    {
                        activeTab === "my-photos" && <Gallery galleryImages={stats?.questImages?.map(item => ({
                            id: item?.image?.id,
                            image: item?.image,
                            user
                        }))} />
                    } */}
                    <SectionHeading
                        title={t('profile.tabs.photos')}
                        className="!mb-10"
                    />
                    {usersPhotos?.length > 0 ? (
                        <Gallery
                            galleryImages={usersPhotos?.map((item) => ({
                                id: item?.image?.id,
                                image: item?.image,
                                user,
                            }))}
                        />
                    ) : (
                        <NoData text="No Data Found" />
                    )}
                </Container>
            </div>
        </AppLayout>
    );
}
