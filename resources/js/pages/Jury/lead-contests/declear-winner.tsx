import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import Pagination from '@/components/shared/table/Pagination';
import { default as Table } from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface ContestItem {
    id: number;
    image: string;
    user_score: string;
    jury_score: string;
    total_score: string;
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
    const { t } = useLocales();

    const breadcrumbs = t(
        'dashboard.jury.lead-contest.showContestScore.breadcrumbs',
        {
            returnObjects: true,
        },
    );

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleJudgeDeclareWinner = () => {
        const formattedItems = items.map((item, index) => ({
            quest_id: item.quest.id,
        }));

        router.post(
            route('lead_judge.judgeWinnerStatus'),
            {
                items: formattedItems,
            },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head
                title={t('dashboard.jury.lead-contest.showContestScore.title')}
            />

            <TableContainer>
                <h1 className="mb-4 text-lg font-semibold">
                    {t('dashboard.jury.lead-contest.showContestScore.title')}
                </h1>
                <div className="mb-2 flex justify-end">
                    {items?.data[0]?.quest.winner_status === 'judge_submitted' && (
                        <p className="cursor-pointer rounded-md bg-amber-300 px-4 py-2 text-white">
                            Winner Submitted for Admin Approval
                        </p>
                    )}

                    {items?.data[0]?.quest.winner_status === 'admin_approved' && (
                        <p className="cursor-pointer rounded-md bg-green-500 px-4 py-2 text-white">
                            Winner Submitted aproved by Admin
                        </p>
                    )}

                    {items?.data?.length > 0 &&
                        items?.data[0]?.quest.winner_status === 'pending' &&
                        new Date(items?.data[0]?.quest.end_date).getTime() <
                            Date.now() && (
                            <button
                                onClick={handleJudgeDeclareWinner}
                                className="cursor-pointer rounded-md bg-[#e23882] px-4 py-2 text-white"
                            >
                                Declare Winner
                            </button>
                        )}

                    {items?.data?.length > 0 &&
                        items?.data[0]?.quest.winner_status === 'pending' &&
                        new Date(items?.data[0]?.quest.end_date).getTime() >
                            Date.now() && (
                            <button
                                disabled
                                className="cursor-pointer rounded-md bg-[#e23882] px-4 py-2 text-white"
                            >
                                Contest Not Ended
                            </button>
                        )}
                </div>
                <Table
                    headingItems={t(
                        'dashboard.jury.lead-contest.showContestScore.table.headings',
                        {
                            returnObjects: true,
                        },
                    )}
                >
                    {items?.data?.length > 0 ? (
                        items?.data.map((item, index) => (
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
                                <TableCell>{item?.user_score}</TableCell>
                                <TableCell>{item?.jury_score}</TableCell>
                                <TableCell>{item?.lead_judge_score}</TableCell>
                                <TableCell>{item?.admin_score}</TableCell>
                                <TableCell>{item?.total_score || 0}</TableCell>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="space-x-2">
                                    {item.quest.winner_status !==
                                        'judge_submitted' &&
                                    item.quest.winner_status !==
                                        'admin_approved' ? (
                                        <Link
                                            href={route(
                                                'lead_judge.lead_judge_score_view',
                                                item?.id,
                                            )}
                                            className="bg-dark cursor-pointer rounded-md bg-green-600 px-3 py-2 font-medium text-white"
                                        >
                                            Change Rank
                                        </Link>
                                    ) : (
                                        <button
                                            disabled
                                            className="bg-dark cursor-pointer rounded-md bg-gray-400 px-3 py-2 font-medium text-white"
                                        >
                                            Change Rank
                                        </button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <NoTableItems />
                    )}
                </Table>
                <Pagination links={items.links} />
            </TableContainer>
        </AppLayout>
    );
}
