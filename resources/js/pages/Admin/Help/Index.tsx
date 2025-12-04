import DeleteButton from '@/components/shared/table/components/delete-button';
import EditButton from '@/components/shared/table/components/edit-button';
import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import TableTopSection from '@/components/shared/table/components/table-top-section/table-top-section';
import { default as Table } from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/shared/buttons/button';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';
import { useEffect } from 'react';

interface HelpItem {
    id: number;
    section: string;
    question: string;
    answer: string;
    lang: string;
    status: string;
}

interface FlashProps {
    success?: string;
    error?: string;
}

export default function HelpIndex({ items, flash }: { items: HelpItem[]; flash: FlashProps }) {
    const { t } = useLocales();

    const breadcrumbs = t('dashboard.help.index.breadcrumbs', { returnObjects: true });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = (id: number) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        router.delete(route('admin.help.destroy', id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title="Help" />

            <TableContainer>
                <TableTopSection
                    href={route('admin.help.create')}
                    title={t('dashboard.help.index.title')}
                >
                    <Button text={t('dashboard.help.index.createButton')} />
                </TableTopSection>

                <Table
                    headingItems={t('dashboard.help.index.table.headings', { returnObjects: true })}
                >
                    {items?.length > 0 ? (
                        items.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.section}</TableCell>
                                <TableCell>{item.question}</TableCell>
                                {/* <TableCell>{item.answer}</TableCell> */}
                                <TableCell>
                                    <Badge className={item.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="space-x-2">
                                    <EditButton route={route('admin.help.edit', item.id)} />
                                    <DeleteButton handleDelete={() => handleDelete(item.id)} />
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
