import { Appearance, useAppearance } from '@/hooks/use-appearance';
import useLocales from '@/hooks/useLocales';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();
    const { t } = useLocales();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: t('dashboard.appearance.tab.light') },
        { value: 'dark', icon: Moon, label: t('dashboard.appearance.tab.dark') },
        { value: 'system', icon: Monitor, label: t('dashboard.appearance.tab.system') },
    ];

    return (
        <div
            className={cn(
                'inline-flex gap-3 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800',
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex gap-2 items-center rounded-md px-3.5 py-1.5 transition-colors cursor-pointer',
                        appearance === value
                            ? 'bg-bg-primary shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
