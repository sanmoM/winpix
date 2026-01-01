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

interface BrandMarketingItem {
    id: number;
    bg_image: string;
    title: string;
    content: string;
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
    brand_marketings,
    flash,
}: {
    brand_marketings: { data: BrandMarketingItem[]; links:PaginationLink[] };
    flash: FlashProps;
}) {
    const { t } = useLocales();
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash?.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        router.delete(route('admin.brand_marketing.destroy', id));
    };

    // const breadcrumbs = t('dashboard.brandMarketing.index.breadcrumbs', {
    //     returnObjects: true,
    // });

    return (
        // <AppLayout breadcrumbs={breadcrumbs as any}>
        <AppLayout>
            <ToastContainer />
            <Head title="BrandMarketing" />
            <TableContainer>
                <TableTopSection
                    href={route('admin.brand_marketing.create')}
                    title={t('dashboard.brandMarketingBanner.index.title')}
                />
                <Table
                // headingItems={t(
                //     'dashboard.brandMarketing.index.table.headings',
                //     { returnObjects: true },
                // )}
                >
                    {brand_marketings?.data.length > 0 ? (
                        brand_marketings?.data.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {item?.bg_image ? (
                                        <img
                                            src={`/storage/${item.bg_image}`}
                                            alt={item?.title}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                                            —
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>{item?.title}</TableCell>
                                {/* <TableCell>{item?.content}</TableCell> */}
                                <TableCell>
                                    <Badge
                                        className={
                                            item?.status === 'Active'
                                                ? 'bg-green-400'
                                                : 'bg-red-400'
                                        }
                                    >
                                        {item?.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="space-x-2 ">
                                    <EditButton
                                        route={route(
                                            'admin.brand_marketing.edit',
                                            item?.id,
                                        )}
                                    />
                                    <DeleteButton
                                        handleDelete={() =>
                                            handleDelete(item?.id)
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <NoTableItems />
                    )}
                </Table>
                <Pagination links={brand_marketings?.links} />
            </TableContainer>
        </AppLayout>
    );
}
