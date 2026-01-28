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

            <TableContainer>

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
                                <TableCell>{item.transaction_id || "N/A"}</TableCell>
                                <TableCell>{item.user.name}</TableCell>
                                <TableCell>{item.reference_id || "N/A"}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.amount_type || "N/A"}</TableCell>
                                <TableCell>{item.payment_method || "N/A"}</TableCell>
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
