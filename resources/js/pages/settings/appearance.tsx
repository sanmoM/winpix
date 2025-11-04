import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';
import useLocales from '@/hooks/useLocales';


export default function Appearance() {
    const { t } = useLocales();
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard.appearance.heading'),
            href: editAppearance().url,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head />

            <SettingsLayout>
                <div className="space-y-6">
                    {/* <HeadingSmall
                        title="Appearance settings"
                        description="Update your account's appearance settings"
                    /> */}
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
