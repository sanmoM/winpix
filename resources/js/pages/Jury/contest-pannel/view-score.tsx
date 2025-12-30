import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import { default as Table } from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import { route } from 'ziggy-js';

export default function ScoreContest({ showContestScores }: { showContestScores: any }) {
    const { t } = useLocales()
    const breadcrumbs = t('dashboard.jury.show_score.index.breadcrumbs', {
        returnObjects: true,
    });


    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title={t('dashboard.jury.show_score.index.title')} />

            <TableContainer>
                <h1 className="mb-4 text-lg font-semibold">
                    {t('dashboard.jury.show_score.index.title')}
                </h1>

                <Table
                    headingItems={t(
                        'dashboard.jury.show_score.index.table.headings',
                        {
                            returnObjects: true,
                        },
                    )}
                >
                    {showContestScores?.length > 0 ? (
                        showContestScores.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item?.image.image}`}
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
                                    {item.score}
                                </TableCell>

                                {/* <TableCell>{item.email}</TableCell>
        
                                        <TableCell>
                                            {item.message.length > 50
                                                ? item.message.substring(0, 50) + '...'
                                                : item.message}
                                        </TableCell> */}

                                {/* <TableCell className="space-x-2">
                                    <Link
                                        href={route(
                                            'lead_judge.declearWinner',
                                            item?.id,
                                        )}
                                        className="bg-dark cursor-pointer rounded-md bg-slate-950 px-3 py-2 font-medium text-white"
                                    >
                                        All Score
                                    </Link>
                                </TableCell> */}
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
    )
}
