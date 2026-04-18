import useLocales from '@/hooks/useLocales'
import AppLayout from '@/layouts/app-layout'
import { usePage } from '@inertiajs/react'

export default function SendGiftView() {
    const user = usePage().props.auth.user
    const { t } = useLocales()
    const breadcrumbs = t('dashboard.users.index.breadcrumbs', {
        returnObjects: true,
    })
    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            ok
        </AppLayout>
    )
}
