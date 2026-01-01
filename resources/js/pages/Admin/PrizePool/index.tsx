import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import TableTopSection from '@/components/shared/table/components/table-top-section/table-top-section';
import Pagination from '@/components/shared/table/Pagination';
import Table from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface PrizePoolItem {
    id: number;
    name: string;
    status: string;
    image: string;
}

interface FlashProps {
    success?: string;
    error?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export default function PrizePoolIndex({
    items,
    flash,
}: {
    items: { data: PrizePoolItem[]; links: PaginationLink[] };
    flash: FlashProps;
}) {
    const { t } = useLocales();

    const breadcrumbs = [
        {
            title: t('dashboard.prizePool.index.title'),
            href: route('admin.prize_pools.index'),
        },
    ];

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        router.delete(route('admin.prize_pools.destroy', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title={t('dashboard.prizePool.index.title')} />

            <TableContainer>
                <TableTopSection
                    href={route('admin.prize_pools.create')}
                    title={t('dashboard.prizePool.index.title')}
                />

                <Table
                    headingItems={t(
                        'dashboard.prizePool.index.table.headings',
                        {
                            returnObjects: true,
                        },
                    )}
                >
                    {items?.data.length > 0 ? (
                        items?.data.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.name}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                                            —
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                {/* {
                                    item?.is_editable ? (
                                        <TableCell className="space-x-2">
                                            <EditButton route={route('admin.prizePool.edit', item.id)} />
                                            <DeleteButton handleDelete={() => handleDelete(item.id)} />
                                        </TableCell>
                                    ) : (<div></div>)
                                } */}
                                <div></div>
                            </TableRow>
                        ))
                    ) : (
                        <NoTableItems />
                    )}
                </Table>
            </TableContainer>
            <Pagination links={items?.links} />
        </AppLayout>
    );
}
