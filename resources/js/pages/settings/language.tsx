import SelectInput from '@/components/shared/inputs/select-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'Arabic' },
];

export default function language() {
    const { t } = useLocales();
    const { currentLanguage, changeLanguage } = useLocales();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard.language.heading'),
            href: '/settings/language',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />
            <SettingsLayout>
                <SelectInput
                    id="language"
                    name="language"
                    label={t('dashboard.language.inputs.language.label')}
                    options={languageOptions}
                    value={currentLanguage}
                    onChange={(value) => changeLanguage(value)}
                    className="max-w-auto w-full"
                />
            </SettingsLayout>
        </AppLayout>
    )
}
