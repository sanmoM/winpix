import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
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
    totalPrizes,
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
    const handleDeclareWinner = () => {
        const formattedItems = items
            .slice(0, totalPrizes)
            .map((item, index) => ({
                id: item.id,
                image_id: item.id,
                quest_id: item.quest.id,
                user_vote: item.user_score,
                jury_score: item.jury_score,
                total_score: item.total_score,
                rank: index + 1,
                submitted_by: 'Admin',
            }));

        router.post(
            route('admin.contest.declare-winner'),
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
                    {/* Case when lead_judge is either NULL or null */}
                    {items?.length > 0 &&
                        (items[0]?.quest?.lead_judge === 'NULL' ||
                            items[0]?.quest?.lead_judge == null) && (
                            <>
                                {/* Declare Winners Button (Only if the quest has ended and winner is not approved) */}
                                {items?.length > 0 &&
                                    items[0]?.quest &&
                                    new Date(
                                        items[0]?.quest.end_date,
                                    ).getTime() < Date.now() &&
                                    items[0]?.quest?.winner_status !==
                                        'admin_approved' && (
                                        <button
                                            onClick={handleDeclareWinner}
                                            className="cursor-pointer rounded-md bg-[#e23882] px-4 py-2 text-white"
                                        >
                                            Declare Winners
                                        </button>
                                    )}

                                {/* "Winners Submitted" Button (If Admin Approved) */}
                                {items[0]?.quest?.winner_status ===
                                    'admin_approved' && (
                                    <button className="disabled cursor-pointer rounded-md bg-green-500 px-4 py-2 text-white">
                                        Winners Submitted
                                    </button>
                                )}

                                {/* Disabled button (If end date is in the future) */}
                                {new Date(items[0].quest.end_date).getTime() >
                                    Date.now() && (
                                    <button className="disabled cursor-pointer rounded-md bg-yellow-500 px-4 py-2 text-white">
                                        Contest Not Ended
                                    </button>
                                )}
                            </>
                        )}

                    {/* Case when lead_judge is not null or not 'NULL' */}
                    {items[0]?.quest?.lead_judge != null &&
                        items[0]?.quest?.lead_judge !== 'NULL' && (
                            <>
                                {/* Submit Winners Button (Only if the winner_status is jury_submitted) */}
                                {items[0]?.quest?.winner_status ===
                                    'jury_submitted' && (
                                    <button
                                        onClick={handleDeclareWinner}
                                        className="cursor-pointer rounded-md bg-[#e23882] px-4 py-2 text-white"
                                    >
                                        Submit Winners
                                    </button>
                                )}

                                {/* "Submit Winners Pending" Button (If the winner_status is pending) */}
                                {items[0]?.quest?.winner_status ===
                                    'pending' && (
                                    <button className="disabled cursor-pointer rounded-md bg-[#e23882] px-4 py-2 text-white">
                                        Submit Winners Pending
                                    </button>
                                )}

                                {/* "Submit Winners Approved" Button (If the winner_status is admin_approved) */}
                                {items[0]?.quest?.winner_status ===
                                    'admin_approved' && (
                                    <button className="disabled cursor-pointer rounded-md bg-[#e23882] px-4 py-2 text-white">
                                        Submit Winners Approved
                                    </button>
                                )}
                            </>
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
                    {items?.length > 0 ? (
                        items.map((item, index) => {

                            return (
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

                                    <TableCell>{item.user_score || 0}</TableCell>
                                    <TableCell>{item.jury_score || 0}</TableCell>
                                    <TableCell>
                                        {item?.lead_judge_score || 0}
                                    </TableCell>
                                    <TableCell>
                                        {item?.admin_score || 0}
                                    </TableCell>
                                    <TableCell>{item.total_score || 0}</TableCell>
                                    <TableCell>{index + 1}</TableCell>

                                    <TableCell className="space-x-2 text-end">
                                        <Link
                                            href={
                                                item.quest.winner_status ===
                                                'admin_approved'
                                                    ? '#'
                                                    : route(
                                                          'admin.contest.admin-score-view',
                                                          item.id,
                                                      )
                                            }
                                            className={`rounded-md px-3 py-2 text-end font-medium text-white ${
                                                item.quest.winner_status ===
                                                'admin_approved'
                                                    ? 'pointer-events-none cursor-not-allowed bg-gray-400'
                                                    : 'cursor-pointer bg-green-600'
                                            }`}
                                        >
                                            Change Rank
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <NoTableItems />
                    )}
                </Table>
            </TableContainer>
        </AppLayout>
    );
}
