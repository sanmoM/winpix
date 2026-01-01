import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import Pagination from '@/components/shared/table/Pagination';
import { default as Table } from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';

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
                    {showContestScores?.data?.length > 0 ? (
                        showContestScores?.data.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{index + 1}</TableCell>

                                <TableCell>
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item?.image}`}
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
                                    {item.judge_score}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <NoTableItems />
                    )}
                </Table>
                <Pagination links={showContestScores.links} />
            </TableContainer>
        </AppLayout>
    )
}
