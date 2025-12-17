import DeleteButton from '@/components/shared/table/components/delete-button';
import EditButton from '@/components/shared/table/components/edit-button';
import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
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

interface User {
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

export default function UsersIndex({
    users,
    flash,
}: {
    users: User[];
    flash: FlashProps;
}) {
    const { t } = useLocales();

    const breadcrumbs = t('dashboard.users.index.breadcrumbs', {
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
            <Head title="Users" />

            <TableContainer>
                <h1 className="mb-3 text-lg font-semibold">
                    {t('dashboard.users.index.title')}
                </h1>

                <Table
                    headingItems={t('dashboard.users.index.table.headings', {
                        returnObjects: true,
                    })}
                >
                    {users?.length > 0 ? (
                        users.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.level}</TableCell>
                                <TableCell>
                                    <Badge
                                        className={
                                            user.status === 'active'
                                                ? 'bg-green-400'
                                                : 'bg-red-400'
                                        }
                                    >
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="space-x-2">
                                    <ViewButton
                                        route={route(
                                            'admin.view-user',
                                            user.id,
                                        )}
                                    />
                                    <EditButton
                                        route={route(
                                            'admin.editUsers',
                                            user.id,
                                        )}
                                    />

                                    <DeleteButton
                                        handleDelete={() =>
                                            handleDelete(user.id)
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
