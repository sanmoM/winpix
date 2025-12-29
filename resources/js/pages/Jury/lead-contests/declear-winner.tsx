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
    images: items,
    flash,
}: {
    images: ContestItem[];
    flash: FlashProps;
}) {
    const [openModal, setOpenModal] = useState(false);
    const { t, currentLanguage } = useLocales();

    const breadcrumbs = t('dashboard.jury.lead-contest.showContestScore.breadcrumbs', {
        returnObjects: true,
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    console.log(items)

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title={t('dashboard.jury.lead-contest.showContestScore.title')} />

            <TableContainer>
                <h1 className="mb-4 text-lg font-semibold">
                    {t('dashboard.jury.lead-contest.showContestScore.title')}
                </h1>

                <Table
                    headingItems={t(
                        'dashboard.jury.lead-contest.showContestScore.table.headings',
                        {
                            returnObjects: true,
                        },
                    )}
                >
                    {items?.length > 0 ? (
                        items.map((item, index) => (
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
                                <TableCell>
                                    {
                                        item?.user_score
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        item?.jury_score
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        item?.total_score
                                    }
                                </TableCell>

                                <TableCell className="space-x-2">
                                    {/* <ViewButton
                                        route={route(
                                            'admin.quest.view',
                                            item.id,
                                        )}
                                    />

                                    <EditButton
                                        route={route(
                                            'admin.quest.edit',
                                            item.id,
                                        )}
                                    /> */}
                                    <Link
                                        href={route(
                                            'judge.contest.score',
                                            item?.id,
                                        )}
                                        className="bg-dark cursor-pointer rounded-md bg-green-600 px-3 py-2 font-medium text-white"
                                    >
                                        {t(
                                            'dashboard.jury.lead-contest.index.buttons.declearWinner.label',
                                        )}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <NoTableItems />
                    )}
                </Table>
                {/* <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                    <ScoreModal isOpen={openModal} onClose={() => setOpenModal(false)} questImages={[]} />
                </Modal> */}
            </TableContainer>
        </AppLayout>
    );
}
