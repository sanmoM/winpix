import ScoreModal from '@/components/jury-contest/score-modal'
import TableContainer from '@/components/shared/table/table-container'
import useLocales from '@/hooks/useLocales'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { ToastContainer } from 'react-toastify'

export default function ScoreContest() {
    const { t } = useLocales()
    const breadcrumbs = t('dashboard.jury.contest.index.breadcrumbs', {
        returnObjects: true,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <ToastContainer />
            <Head title={t('dashboard.jury.contest.index.title')} />

            <TableContainer>
                <h1 className="mb-4 text-lg font-semibold">
                    {t('dashboard.jury.contest.index.title')}
                </h1>
                <ScoreModal questImages={[]} />
            </TableContainer>
        </AppLayout>
    )
}
