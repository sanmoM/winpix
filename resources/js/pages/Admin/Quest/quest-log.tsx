import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import Table from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import { Badge } from '@/components/ui/badge';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Contest Logs',
        href: '/admin/contest/logs',
    },
];

export default function Index() {
    const { loges: items, flash } = usePage<any>().props;
    const { t } = useLocales();
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash?.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title="All Contest Logs" />

            <TableContainer>
                <Table
                    headingItems={t('dashboard.quest.logs.table.headings', {
                        returnObjects: true,
                    })}
                >
                    {items?.length > 0 ? (
                        items.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>{item.quest.title_en}</TableCell>
                                <TableCell>{item.admin.name}</TableCell>
                                <TableCell>{item.reason}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={
                                            item.action === 'Force_Closed'
                                                ? 'bg-red-400'
                                                : 'bg-green-400'
                                        }
                                    >
                                        {item.action}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(item.created_at).toLocaleString()}
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
