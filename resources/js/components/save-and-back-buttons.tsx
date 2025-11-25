import useLocales from '@/hooks/useLocales'
import { Link } from '@inertiajs/react'
import React from 'react'

export default function SaveAndBackButtons({ processing, href }) {
    const { t } = useLocales()
    return (
        <div className="flex items-center justify-end space-x-4 pt-4">
            <Link
                href={href}
                className="w-28 rounded-lg border border-gray-300 px-6 py-2 !text-center font-semibold text-gray-700 dark:text-gray-200 "
            >
                <button className='cursor-pointer'>{t('dashboard.shared.back')}</button>
            </Link>
            <button
                type="submit"
                className="w-28 cursor-pointer rounded-lg bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] px-6 py-2 font-semibold text-white disabled:opacity-70 !text-center"
                disabled={processing}
            >
                {processing ? `${t('dashboard.shared.save')}...` : t('dashboard.shared.save')}
            </button>
        </div>
    )
}
