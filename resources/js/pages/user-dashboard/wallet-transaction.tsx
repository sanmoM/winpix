import Container from '@/components/shared/container';
import CoinCard from '@/components/shared/profile/coin-card';
import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import Pagination from '@/components/shared/table/Pagination';
import { default as Table } from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
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
    transactions,
    flash,
}: {
    transactions: {
        data: TransactionItem[];
        links: any[];
    };
    flash: FlashProps;
}) {
    const { t } = useLocales();


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
            <div className="mt-4 grid grid-cols-3 gap-4 h-fit w-fit mb-4 mx-auto">

                <div className=' bg-bg-primary p-4 lg:px-8 rounded-sm flex items-center gap-6 h-fit max-w-xs'>
                    <img src={"/images/coin.png"} alt="hasmonaut's profile" className="w-10 h-10 lg:w-20 lg:h-20 rounded-full object-cover object-top" />
                    <div className=''>
                        <h1 className='text-2xl lg:text-6xl font-bold mt-2'>{user?.pixel}</h1>
                        <p className='text-xl lg:text-3xl text-gray-400 mt-2'>Pixel</p>
                    </div>
                </div>
                <div className=' bg-bg-primary p-4 lg:px-8 rounded-sm flex items-center gap-6 h-fit max-w-xs'>
                    <img src={'/images/golden-coin.png'} alt="hasmonaut's profile" className="w-10 h-10 lg:w-20 lg:h-20 rounded-full object-cover object-top" />
                    <div className=''>
                        <h1 className='text-2xl lg:text-6xl font-bold mt-2'>{user?.coin}</h1>
                        <p className='text-xl lg:text-3xl text-gray-400 mt-2'>Coin</p>
                    </div>
                </div>
                <div className=' bg-bg-primary p-4 lg:px-8 rounded-sm flex items-center gap-6 h-fit max-w-xs'>
                    <img src={'/images/cash.png'} alt="hasmonaut's profile" className="w-10 h-10 lg:w-20 lg:h-20 rounded-full object-cover object-top" />
                    <div className=''>
                        <h1 className='text-2xl lg:text-6xl font-bold mt-2'>{user?.cash}</h1>
                        <p className='text-xl lg:text-3xl text-gray-400 mt-2'>Cash</p>
                    </div>
                </div>
            </div>

            <TableContainer>
                {/* <TableTopSection
                    href="#"
                    title={t('dashboard.translation.index.title')}
                /> */}

                <Table
                    headingItems={t(
                        'dashboard.translation.index.table.headings',
                        {
                            returnObjects: true,
                        },
                    )}
                >
                    {transactions?.data?.length > 0 ? (
                        transactions?.data?.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.transaction_id}</TableCell>
                                <TableCell>{item.user.name}</TableCell>
                                <TableCell>{item.reference_id}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.amount_type}</TableCell>
                                <TableCell>{item.payment_method}</TableCell>
                                <TableCell>{item.transaction_type}</TableCell>
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
                <Pagination links={transactions.links} />
            </TableContainer>
        </AppLayout>
    );
}
