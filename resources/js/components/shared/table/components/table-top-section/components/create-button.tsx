import useLocales from '@/hooks/useLocales'
import { Link } from '@inertiajs/react'
import Button from '../../../../buttons/button'

export default function CreateButton({ href }) {
    const { t } = useLocales()
    return (
        <Link href={href}>
            <Button text={t("dashboard.shared.create")} />
        </Link>
    )
}
