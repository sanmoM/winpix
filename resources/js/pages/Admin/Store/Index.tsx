import DeleteButton from '@/components/shared/table/components/delete-button';
import EditButton from '@/components/shared/table/components/edit-button';
import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import TableTopSection from '@/components/shared/table/components/table-top-section/table-top-section';
import Pagination from '@/components/shared/table/Pagination';
import { default as Table } from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import { Badge } from '@/components/ui/badge';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface StoreItem {
    id: number;
    icon_image: string | null;
    number_of_coin: string;
    price: string;
    status: string;
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
export default function Index({ stores, flash }: { stores: { data: StoreItem[]; links: PaginationLink[] }; flash: FlashProps }) {
    const { t } = useLocales();

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = (id: number) => {
        if (!confirm(t('dashboard.store.index.confirm_delete'))) return;
        router.delete(route('admin.store.destroy', id));
    };

    const breadcrumbs = t('dashboard.store.index.breadcrumbs', { returnObjects: true });

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title={t('dashboard.store.index.title')} />

            <TableContainer>
                <TableTopSection href={route('admin.store.create')} title={t('dashboard.store.index.title')} />
                <Table headingItems={t('dashboard.store.index.table.headings', { returnObjects: true })}>
                    {stores?.data.length > 0 ? (
                        stores?.data.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {item.icon_image ? (
                                        <img src={`/storage/${item.icon_image}`} alt="icon" className="h-10 w-10 rounded object-cover" />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">—</div>
                                    )}
                                </TableCell>
                                <TableCell>{item.number_of_coin || "N/A"}</TableCell>}
                                <TableCell>{item.price}</TableCell>
                                <TableCell>
                                    <Badge className={item.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="space-x-2">
                                    <EditButton route={route('admin.store.edit', item.id)} />
                                    <DeleteButton handleDelete={() => handleDelete(item.id)} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <NoTableItems />
                    )}
                </Table>
                <Pagination links={stores?.links} />
            </TableContainer>
        </AppLayout>
    );
}
