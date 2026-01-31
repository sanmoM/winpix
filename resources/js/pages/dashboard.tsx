import Container from '@/components/shared/container';
import Creator from '@/components/shared/creator';
import CoinCard from '@/components/shared/profile/coin-card';
import LevelProgress from '@/components/shared/profile/lavel-progress';
import StatsCard from '@/components/shared/profile/stats-card';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { RiFolderUploadFill } from 'react-icons/ri';
import { route } from 'ziggy-js';

export default function Dashboard({ stats }: { stats: any }) {
    const user = usePage().props.auth.user;


    const { t } = useLocales();
    const [activeTab, setActiveTab] = useState('my-photos');
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard.profile.heading'),
            href: dashboard().url,
        },
    ];

    console.log(user)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />
            <div className=" bg-bg-primary flex flex-col justify-center items-center py-10 lg:py-20 relative">
                <div className="flex  items-center justify-center ">
                    <Creator
                        containerClassName="flex-col-reverse lg:flex-row lg:flex-row-reverse gap-6 lg:gap-10"
                        infoContainerClassName="items-center lg:items-start"
                        imageClassName="w-36 h-36 !border-primary-color lg:w-48 lg:h-48 border-6 p-0.5"
                        followBtnClassName="text-sm px-6 py-1.5"
                        nameClassName="text-3xl"
                        hasBtn={false}
                        userFromParent={user}
                    >
                        <div className=" flex items-center gap-3">
                            <div>
                                <h6 className="text-sm text-gray-400">
                                    {t('shared.followers')}
                                </h6>
                                <p className="font-semibold dark:text-white">
                                    {user.followers?.length || 0}
                                </p>
                            </div>
                            <div>
                                <h6 className="text-sm text-gray-400">
                                    {t('shared.following')}
                                </h6>
                                <p className="font-semibold dark:text-white">
                                    {user.following?.length || 0}
                                </p>
                            </div>
                        </div>
                    </Creator>
                </div>
                {/* <button className='absolute top-4 right-8 cursor-pointer group'>
                    <span className="text-sm text-white opacity-0 group-hover:opacity-100 absolute -bottom-6 right-0 w-full text-center text-nowrap bg-bg-secondary">Edit Profile</span>
                    <EditIcon className="w-8 h-8  text-green-400 ml-4" />
                </button> */}
                <div className="bg-white mt-6 dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden w-[330px] lg:w-[32rem]">

                    {/* Content */}
                    <KeyValueRow
                        label="Phone Number"
                        value={user?.number}
                        icon={Phone}
                    />
                    <KeyValueRow
                        label="Country"
                        value={user?.country?.country_name}
                        icon={Globe}
                    />
                </div>
                {/* <Container className="my-10 space-y-4 md:space-y-8 lg:mx-6 lg:mt-20 lg:mb-32 lg:space-y-10">
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
                    {activeTab === 'my-photos' &&
                        (stats?.questImages?.length > 0 ? (
                            <Gallery
                                galleryImages={stats?.questImages?.map(
                                    (item) => ({
                                        id: item?.id,
                                        image: item?.image,
                                        user,
                                    }),
                                )}
                                hasImageView={true}
                            />
                        ) : (
                            <NoData text="No photos uploaded yet" />
                        ))}
                    {activeTab === 'liked-photos' &&
                        (stats?.likedImages?.length > 0 ? (
                            <Gallery
                                galleryImages={stats?.likedImages?.map(
                                    (item) => ({
                                        id: item?.id,
                                        image: item?.image,
                                        user,
                                    }),
                                )}
                                hasImageView={true}
                            />
                        ) : (
                            <NoData text="No liked photos yet" />
                        ))}
                </Container> */}
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
                            count: user?.pixel || 0,
                        }}
                    />
                    <CoinCard
                        item={{
                            src: '/images/golden-coin.png',
                            count: user?.coin || 0,
                        }}
                    />
                    <CoinCard
                        item={{
                            src: '/images/cash.png',
                            count: user?.cash || 0,
                        }}
                    />
                </div>
                <div className="mt-4 flex gap-4">
                    <Link className='block w-full' href={route("ended-quests", user.id)}>
                        <StatsCard
                            item={{
                                icon: (
                                    <FaTrophy className="h-6 w-6 text-white lg:h-8 lg:w-8" />
                                ),
                                label: user.joined_quests?.length || 0,
                            }}
                        />
                    </Link>
                    <StatsCard
                        item={{
                            icon: (
                                <RiFolderUploadFill className="h-6 w-6 text-white lg:h-8 lg:w-8" />
                            ),
                            label: user.votes?.length || 0,
                        }}
                    />
                </div>

            </Container>
        </AppLayout>
    );
}


import {
    Check,
    Clipboard,
    EditIcon,
    Globe,
    Info,
    Phone
} from 'lucide-react';

const KeyValueRow = ({ label, value, icon: Icon, isLast, canCopy, type = 'text' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text) => {
        document.execCommand('copy'); // Using execCommand for environment compatibility
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderValue = () => {
        switch (type) {
            case 'status':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-green-500"></span>
                        {value}
                    </span>
                );
            case 'tags':
                return (
                    <div className="flex flex-wrap gap-2">
                        {value.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                );
            default:
                return <span className="text-slate-900 dark:text-slate-100 font-medium break-all">{value}</span>;
        }
    };

    return (
        <div className={`group flex flex-col gap-2 sm:flex-row bg-bg-secondary sm:items-center py-3 lg:py-4 px-4  transition-colors ${!isLast ? '' : ''}`}>
            <div className="flex items-center w-full sm:w-1/3 mb-1 sm:mb-0">
                {Icon && <Icon className="w-4 h-4 mr-3 text-slate-400" />}
                <span className="text-sm text-slate-500 dark:text-slate-400 font-medium capitalize">
                    {label.replace(/([A-Z])/g, ' $1').trim()}
                </span>
            </div>

            <div className="flex items-center justify-between w-full sm:w-2/3 pl-0 sm:pl-4">
                <div className="text-sm">
                    {renderValue()}
                </div>

                {canCopy && (
                    <button
                        onClick={() => handleCopy(value)}
                        className="ml-4 p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-all opacity-0 group-hover:opacity-100"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
                    </button>
                )}
            </div>
        </div>
    );
};

function App() {
    const data = {
        username: "alex_dev_99",
        email: "alex.smith@cloud-enterprise.io",
        role: "Administrator",
        status: "Active",
        lastLogin: "2023-10-24 14:22:01",
        apiKey: "sk_live_51Mz8xI90vX2kLpQz0...",
        regions: ["US-East", "EU-West", "AP-South"],
        dataCenter: "Virginia (us-east-1)"
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Details</h1>
                    <p className="text-slate-500 dark:text-slate-400">View and manage resource metadata</p>
                </div>


            </div>
        </div>
    );
}
