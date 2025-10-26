import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'


export default function useLocales() {
    const [loading, setLoading] = useState(true)
    const { t, i18n } = useTranslation()
    const locales = useSelector((state: RootState) => state.locales.locale)
    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
    }
    useEffect(() => {
        if (locales) {
            i18n.changeLanguage(locales).then(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [locales])
    return { t, i18n, changeLanguage, loading }
}
