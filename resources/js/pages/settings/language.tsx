import SelectInput from '@/components/shared/inputs/select-input';
import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Head } from '@inertiajs/react';

const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'Arabic' },
];

export default function language() {
    const { currentLanguage, changeLanguage } = useLocales();

    return (
        <AppLayout>
            <Head title="Profile settings" />
            <SettingsLayout>
                <SelectInput
                    id="language"
                    name="language"
                    label="Choose a language:"
                    options={languageOptions}
                    value={currentLanguage}
                    onChange={(value) => changeLanguage(value)}
                />
            </SettingsLayout>
        </AppLayout>
    )
}
