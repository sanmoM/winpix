import Gallery from '@/components/shared/Gallery';
import NoData from '@/components/shared/no-data';
import Tab from '@/components/shared/tab';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

interface TransactionItem {
    id: number;
    transaction_id: string;
    user_id: string;
    reference_id?: string;
    amount?: string;
    payment_method?: string;
    transaction_type?: string;
    created_at?: string;
}

interface FlashProps {
    success?: string;
    error?: string;
}

export default function WalletTransaction({
    stats,
    flash,
}: {
    stats: { questImages: any[]; likedImages: any[] };
    flash: FlashProps;
}) {
    const { t } = useLocales();
    const [activeTab, setActiveTab] = useState('my-photos');

    const user = usePage().props.auth.user;

    const breadcrumbs = t('dashboard.translation.index.breadcrumbs', {
        returnObjects: true,
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title="Translation" />
            <div className='m-4'>
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
            <div className='mx-4'>
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
            </div>
        </AppLayout>
    );
}
