import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import { default as Table } from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface ContactItem {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    message: string;
}

interface FlashProps {
    success?: string;
    error?: string;
}

export default function Index({
    items,
    flash,
}: {
    items: ContactItem[];
    flash: FlashProps;
}) {
    const { t } = useLocales();

    const breadcrumbs = t('dashboard.contacts.index.breadcrumbs', {
        returnObjects: true,
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title={t('dashboard.contacts.index.title')} />

            <TableContainer>
                <h1 className="text-lg font-semibold mb-4">{t('dashboard.contacts.index.title')}</h1>

                <Table
                    headingItems={t('dashboard.contacts.index.table.headings', {
                        returnObjects: true,
                    })}
                >
                    {items?.length > 0 ? (
                        items.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>
                                    {item.first_name} {item.last_name}
                                </TableCell>

                                <TableCell>{item.email}</TableCell>

                                <TableCell>
                                    {item.message.length > 50
                                        ? item.message.substring(0, 50) + '...'
                                        : item.message}
                                </TableCell>

                                <TableCell className="space-x-2">
                                    <Link
                                        href={route(
                                            'admin.contacts.show',
                                            item.id,
                                        )}
                                        className="rounded-md bg-slate-800 px-3 py-2 font-medium text-white hover:bg-slate-900"
                                    >
                                        {t('dashboard.shared.view')}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <NoTableItems />
                    )}
                </Table>
            </TableContainer>
        </AppLayout>
    );
}
