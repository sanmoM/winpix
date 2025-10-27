import { setLocale } from '@/store/features/locales-slice';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export default function useLocales() {
    const [loading, setLoading] = useState(true);
    const { t, i18n } = useTranslation();
    const locales = useSelector((state: RootState) => state.locales.locale);
    const dispatch = useDispatch();

    
    const currentLanguage = i18n.language;
    const direction = currentLanguage === 'ar' ? 'right' : 'left';

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        dispatch(setLocale(lang));
    };

    useEffect(() => {
        if (locales) {
            i18n.changeLanguage(locales).then(() => setLoading(false));
        } else {
            setLoading(false);
        }

        const currentLanguage = i18n.language;

        // ✅ Only change text alignment
        if (currentLanguage === 'ar') {
            document.documentElement.style.setProperty('--text-align', 'right');
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.style.setProperty('--text-align', 'left');
            document.documentElement.setAttribute('dir', 'ltr');
        }
    }, [locales, i18n]);

    return { t, i18n, changeLanguage, loading, currentLanguage, direction };
}
