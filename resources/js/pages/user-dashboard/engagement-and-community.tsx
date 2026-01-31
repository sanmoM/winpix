import Tab from '@/components/shared/tab';
import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import Pagination from '@/components/shared/table/Pagination';
import { default as Table } from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
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
    likedImages,
    reportedImages,
    flash,
}: {
    transactions: {
        data: TransactionItem[];
        links: any[];
    };
    flash: FlashProps;
}) {
    const { t } = useLocales();
    const [activeTab, setActiveTab] = useState('liked-photos');


    const user = usePage().props.auth.user;

    const breadcrumbs = t('dashboard.translation.index.breadcrumbs', {
        returnObjects: true,
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    console.log(reportedImages);

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title="Translation" />
            <Tab
                options={[
                    {
                        label: t('dashboard.engagement-and-community.tab.likedPhotos'),
                        value: 'liked-photos',
                    },
                    {
                        label: t(
                            'dashboard.engagement-and-community.tab.reportedPhotos',
                        ),
                        value: 'reported-photos',
                    },
                ]}
                onChange={(val) => setActiveTab(val)}
                containerClassName="mt-6 mx-4"
            />

            {
                activeTab === 'liked-photos' ? (
                    <TableContainer>
                        <Table
                            headingItems={t(
                                'dashboard.engagement-and-community.likedTable.headings',
                                {
                                    returnObjects: true,
                                },
                            )}
                        >
                            {likedImages?.data?.length > 0 ? (
                                likedImages?.data?.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            {item.image ? (
                                                <img
                                                    src={`/storage/${item?.image?.image}`}
                                                    alt={item.title_en}
                                                    className="h-10 w-10 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                                                    —
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>{item.user.name}</TableCell>
                                        <TableCell>
                                            {new Date(item.created_at).toLocaleString(
                                                undefined,
                                                {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                },
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <NoTableItems />
                            )}
                        </Table>
                        <Pagination links={likedImages.links} />
                    </TableContainer>
                ) : (
                    <TableContainer>
                        <Table
                            headingItems={t(
                                'dashboard.engagement-and-community.reportedTable.headings',
                                {
                                    returnObjects: true,
                                },
                            )}
                        >
                            {reportedImages?.data?.length > 0 ? (
                                reportedImages?.data?.map((item, index) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            {item.image ? (
                                                <img
                                                    src={`/storage/${item?.image?.image}`}
                                                    alt={item.title_en}
                                                    className="h-10 w-10 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                                                    —
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>{item.reason}</TableCell>
                                        <TableCell>
                                            {new Date(item.created_at).toLocaleString(
                                                undefined,
                                                {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                },
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <NoTableItems />
                            )}
                        </Table>
                        <Pagination links={reportedImages.links} />
                    </TableContainer>
                )
            }
        </AppLayout>
    );
}
