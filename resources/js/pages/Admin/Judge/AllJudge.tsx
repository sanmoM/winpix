import DeleteButton from '@/components/shared/table/components/delete-button';
import EditButton from '@/components/shared/table/components/edit-button';
import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import TableTopSection from '@/components/shared/table/components/table-top-section/table-top-section';
import ViewButton from '@/components/shared/table/components/view-button';
import { default as Table } from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import { Badge } from '@/components/ui/badge';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface Judge {
    id: number;
    name: string;
    email: string;
    level: string;
    status: string;
}

interface FlashProps {
    success?: string;
    error?: string;
}

export default function AllJudge({
    judges,
    flash,
}: {
    judges: Judge[];
    flash: FlashProps;
}) {
    const { t } = useLocales();

    const breadcrumbs = t('dashboard.judges.index.breadcrumbs', {
        returnObjects: true,
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this user?')) return;
        router.delete(route('admin.users.destroy', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title="All Judges" />

            <TableContainer>
                <TableTopSection
                    href={route('admin.judge.create')}
                    title="All Judge"
                />
                <Table
                    headingItems={t('dashboard.judges.index.table.headings', {
                        returnObjects: true,
                    })}
                >
                    {judges?.length > 0 ? (
                        judges.map((judge, index) => (
                            <TableRow key={judge.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{judge.name}</TableCell>
                                <TableCell>{judge.email}</TableCell>
                                <TableCell>{judge.level}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={
                                            judge.status === 'active'
                                                ? 'bg-green-400'
                                                : 'bg-red-400'
                                        }
                                    >
                                        {judge.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="space-x-2">
                                    <ViewButton
                                        route={route(
                                            'admin.view-user',
                                            judge.id,
                                        )}
                                    />
                                    <EditButton
                                        route={route(
                                            'admin.editJudge',
                                            judge.id,
                                        )}
                                    />

                                    <DeleteButton
                                        handleDelete={() =>
                                            handleDelete(judge.id)
                                        }
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
