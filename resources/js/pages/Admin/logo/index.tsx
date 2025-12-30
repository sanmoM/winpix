import EditButton from '@/components/shared/table/components/edit-button';
import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import TableTopSection from '@/components/shared/table/components/table-top-section/table-top-section';
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
}

interface FlashProps {
    success?: string;
    error?: string;
}

export default function SeriesIndex({
    logos,
    flash,
}: {
    logos: SeriesItem[];
    flash: FlashProps;
}) {
    const { t } = useLocales();

    const breadcrumbs = [
        {
            title: t('dashboard.logo.index.title'),
            href: route('admin.logo.index'),
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
            <Head title={t('dashboard.logo.index.title')} />

            <TableContainer>
                <TableTopSection
                    href={route('admin.logo.create')}
                    title={t('dashboard.logo.index.title')}
                    hasCreateButton={!logos?.length}
                />

                <Table
                    headingItems={t('dashboard.logo.index.table.headings', {
                        returnObjects: true,
                    })}
                >
                    {logos?.length > 0 ? (
                        logos.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>
                                    {item.light_logo ? (
                                        <img
                                            src={`/storage/${item.light_logo}`}
                                            alt={item.title_en}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                                            —
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {item.dark_logo ? (
                                        <img
                                            src={`/storage/${item.dark_logo}`}
                                            alt={item.title_en}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                                            —
                                        </div>
                                    )}
                                </TableCell>

                                <TableCell className="space-x-2">
                                    <EditButton
                                        route={route(
                                            'admin.logo.edit',
                                            item.id,
                                        )}
                                    />
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
