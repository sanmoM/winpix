import useLocales from '@/hooks/useLocales'
import { Link } from '@inertiajs/react'

export default function ViewButton({ route }: { route: string }) {
    const { t } = useLocales()
    return (
        <Link
            href={route}
            className="bg-dark cursor-pointer rounded-md bg-green-600 px-3 py-2 font-medium text-white"
        >
            {t("dashboard.shared.view")}
        </Link>
    )
}
