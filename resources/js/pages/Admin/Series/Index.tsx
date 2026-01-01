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
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface SeriesItem {
    id: number;
    image: string | null;
    title_en: string;
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

export default function SeriesIndex({
    series,
    flash,
}: {
    series: { data: SeriesItem[]; links: PaginationLink[] };
    flash: FlashProps;
}) {
    const { t } = useLocales();

    const breadcrumbs = [
        {
            title: t('dashboard.series.index.title'),
            href: route('admin.series.index'),
        },
    ];

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    // const handleDelete = (id: number) => {
    //     if (!confirm('Are you sure you want to delete this item?')) return;
    //     router.delete(route('admin.series.destroy', id));
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer />
            <Head title={t('dashboard.series.index.title')} />

            <TableContainer>
                <TableTopSection
                    href={route('admin.series.create')}
                    title={t('dashboard.series.index.title')}
                />

                <Table
                    headingItems={t('dashboard.series.index.table.headings', {
                        returnObjects: true,
                    })}
                >
                    {series?.data.length > 0 ? (
                        series.data.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.title_en}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                                            —
                                        </div>
                                    )}
                                </TableCell>

                                <TableCell>{item.title_en}</TableCell>

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
                                    <EditButton
                                        route={route(
                                            'admin.series.edit',
                                            item.id,
                                        )}
                                    />
                                    {/* <DeleteButton
                                        handleDelete={() =>
                                            handleDelete(item.id)
                                        }
                                    /> */}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <NoTableItems />
                    )}
                </Table>

                <Pagination links={series?.links} />
            </TableContainer>
        </AppLayout>
    );
}
