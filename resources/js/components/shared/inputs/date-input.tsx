import { cn } from "@/lib/utils";

export default function DateInput({
    value,
    onChange,
    min = '',
    max = '',
    disabled = false,
    required = false,
    label,
    dir = 'ltr'
}: {
    value: string;
    onChange: (value: string) => void;
    min?: string;
    max?: string;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    dir?: string;
}) {
    return (
        <div className="w-full" dir={dir}>
            {
                label && (
                    <label className={cn("mb-2 block text-sm font-semibold text-gray-600 dark:text-white", dir === 'rtl' && 'text-right')}>
                        {label}{' '}
                        {required && <span className="text-red-500">*</span>}
                    </label>
                )
            }
            <input
                disabled={disabled}
                type="date"
                className="w-full rounded-sm border bg-bg-primary px-4 py-3"
                value={value || ''}
                min={min || undefined}
                max={max || undefined}
                onChange={(e) => onChange(e.target.value)}
                required={required}
            />
        </div>

    );
}
