import NoTableItems from '@/components/shared/table/components/no-table-items';
import TableCell from '@/components/shared/table/components/table-cell';
import TableRow from '@/components/shared/table/components/table-row';
import { default as Table } from '@/components/shared/table/table';
import TableContainer from '@/components/shared/table/table-container';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { route } from 'ziggy-js';

interface ContestItem {
    id: number;
    image: string | null;
    title_en: string;
    email: string;
    message: string;
}

interface FlashProps {
    success?: string;
    error?: string;
}

export default function Index({
    quests: items,
    flash,
}: {
    quests: ContestItem[];
    flash: FlashProps;
}) {
    const { t, currentLanguage } = useLocales();

    const breadcrumbs = t('dashboard.jury.contest.index.breadcrumbs', {
        returnObjects: true,
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDistribute = async (id: number) => {
        try {
            await axios.post(route('admin.distributePrizes', id));
            toast.success('Prizes Distributed Successfully');
            window.location.reload();
        } catch (error) {
            toast.error('Something went wrong');
        }
    };
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
                                    {currentLanguage === 'en'
                                        ? item?.title_en
                                        : item?.title_ar}
                                </TableCell>
                                <TableCell className="space-x-2">
                                    {item.winner_status === 'admin_approved' ? (
                                        <>
                                            <Link
                                                href={route(
                                                    'view-winners',
                                                    item?.id,
                                                )}
                                                className="bg-dark cursor-pointer rounded-md bg-green-500 px-3 py-2 font-medium text-white"
                                            >
                                                View Winners
                                            </Link>
                                            <button
                                                disabled={item.status === "Closed"}
                                                onClick={() =>
                                                    handleDistribute(item.id)
                                                }
                                                className="bg-dark disabled:bg-gray-400 cursor-pointer rounded-md bg-slate-950 px-3 py-2 font-medium text-white"
                                            >
                                                Distribute Prizes
                                            </button>
                                        </>
                                    ) : (
                                        <Link
                                            href={route(
                                                'admin.judge.declareWinner.show',
                                                item?.id,
                                            )}
                                            className="bg-dark cursor-pointer rounded-md bg-slate-950 px-3 py-2 font-medium text-white"
                                        >
                                            All Score
                                        </Link>
                                    )}
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
