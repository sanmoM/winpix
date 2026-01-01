import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import { default as Table } from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface ContestItem {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    message: string;
}

interface FlashProps {
    success?: string;
    error?: string;
}

export default function Index({
    panel,
    flash,
}: {
    panel: ContestItem[];
    flash: FlashProps;
}) {
    const [openModal, setOpenModal] = useState(false);
    const { t, currentLanguage } = useLocales();

    const breadcrumbs = t('dashboard.jury.contest.index.breadcrumbs', {
        returnObjects: true,
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title={t('dashboard.jury.contest.index.title')} />

            <TableContainer>
                <h1 className="mb-4 text-lg font-semibold">
                    {t('dashboard.jury.contest.index.title')}
                </h1>

                <Table
                    headingItems={t(
                        'dashboard.jury.contest.index.table.headings',
                        {
                            returnObjects: true,
                        },
                    )}
                >
                    {panel?.length > 0 ? (
                        panel?.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>
                                    {item?.quest.image ? (
                                        <img
                                            src={`/storage/${item.quest.image}`}
                                            alt={item.quest.title_en}
                                            className="h-10 w-10 rounded object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-gray-400">
                                            —
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {currentLanguage === 'en'
                                        ? item?.quest?.title_en
                                        : item?.quest?.title_ar}
                                </TableCell>

                                <TableCell className="space-x-2">
                                    <Link
                                        href={route(
                                            'judge.contest.score',
                                            item?.quest.id,
                                        )}
                                        className="bg-dark cursor-pointer rounded-md bg-green-600 px-3 py-2 font-medium text-white"
                                    >
                                        {t(
                                            'dashboard.jury.contest.index.buttons.score.label',
                                        )}
                                    </Link>
                                    <Link
                                        href={route(
                                            'judge.show.contest.score',
                                            item?.quest.id,
                                        )}
                                        className="bg-dark cursor-pointer rounded-md bg-slate-800 px-3 py-2 font-medium text-white"
                                    >
                                        View Score
                                    </Link>
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
