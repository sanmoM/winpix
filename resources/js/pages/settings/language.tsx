import useLocales from '@/hooks/useLocales';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Head } from '@inertiajs/react';

export default function language() {
    const { currentLanguage, changeLanguage } = useLocales();

    return (
        <AppLayout>
            <Head title="Profile settings" />
            <SettingsLayout>
                <div className="w-full max-w-xs">
                    <label htmlFor="language-select" className="block text-sm font-medium mb-2">
                        Choose a language:
                    </label>

                    <div className="relative">
                        {/* The Select Element */}
                        <select
                            onChange={(e) => changeLanguage(e.target.value)}
                            defaultValue={currentLanguage}
                            id="language-select"
                            name="language"
                            className="
    block w-full appearance-none rounded-lg border border-gray-300 
    py-3 px-4 pr-10 text-base 
    bg-bg-primary 
    focus:border-none focus:outline-none focus:ring-0
  "
                        >
                            <option value="en">English</option>
                            <option value="ar">Arabic</option>
                        </select>

                        {/* Dropdown Arrow Icon */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}
