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
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface RedeemItem {
    id: number;
    icon_image: string | null;
    number_of_coin: string;
    price: string;
    prize_type: string;
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


interface Props {
    redeems: { data: RedeemItem[]; links: PaginationLink[] };
    flash?: FlashProps;
}


export default function Index({ redeems, flash }: Props) {
    const { t } = useLocales();

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = (id: number) => {
        if (!confirm(t('dashboard.redeem.index.delete_confirmation'))) return;

        router.delete(route('admin.redeem.destroy', id));
    };

    const breadcrumbs: BreadcrumbItem[] = t('dashboard.redeem.index.breadcrumbs', { returnObjects: true });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer />
            <Head title={t('dashboard.redeem.index.title')} />

            <TableContainer>
                <TableTopSection
                    href={route('admin.redeem.create')}
                    title={t('dashboard.redeem.index.title')}
                />

                <Table
                    headingItems={t('dashboard.redeem.index.table.headings', { returnObjects: true })}
                >
                    {redeems?.data.length > 0 ? (
                        redeems?.data.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {item.icon_image ? (
                                        <img
                                            src={`/storage/${item.icon_image}`}
                                            alt={item.number_of_coin}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                                            —
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>{item.name || "N/A"}</TableCell>
                                <TableCell>{item.number_of_coin || "N/A"}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.prize_type}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={
                                            item.status === 'Active'
                                                ? 'bg-green-400'
                                                : 'bg-red-400'
                                        }
                                    >
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="space-x-2">
                                    <EditButton route={route('admin.redeem.edit', item.id)} />
                                    <DeleteButton handleDelete={() => handleDelete(item.id)} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <NoTableItems colSpan={7} />
                    )}
                </Table>

                <Pagination links={redeems.links} />

            </TableContainer>
        </AppLayout>
    );
}
