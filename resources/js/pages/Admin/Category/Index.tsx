import EditButton from '@/components/shared/table/components/edit-button';
import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import TableTopSection from '@/components/shared/table/components/table-top-section/table-top-section';
import Pagination from '@/components/shared/table/Pagination';
import Table from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import { Badge } from '@/components/ui/badge';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface QuestCategoryItem {
    id: number;
    name: string;
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


export default function Index({
    items,
    flash,
}: {
    items: { data: QuestCategoryItem[]; links: PaginationLink[] };
    flash: FlashProps;
}) {
    const { t } = useLocales();

    // Breadcrumbs using translations
    const breadcrumbs = t('dashboard.questCategory.index.breadcrumbs', {
        returnObjects: true,
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    // const handleDelete = (id: number) => {
    //     if (!confirm(t('dashboard.questCategory.index.confirmDelete'))) return;
    //     router.delete(route('admin.questCategory.destroy', id));
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <Head title={t('dashboard.questCategory.index.title')} />
            <ToastContainer />

            <TableContainer>
                <TableTopSection
                    href={route('admin.questCategory.create')}
                    title={t('dashboard.questCategory.index.title')}
                />

                <Table
                    headingItems={t(
                        'dashboard.questCategory.index.table.headings',
                        {
                            returnObjects: true,
                        },
                    )}
                >
                    {items?.data.length > 0 ? (
                        items.data.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.name}</TableCell>
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
                                            'admin.questCategory.edit',
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
            </TableContainer>
            <Pagination links={items.links} />
        </AppLayout>
    );
}
