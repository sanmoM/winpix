import { cn } from "@/lib/utils";

export default function TextInput({
    value,
    setValue,
    name,
    placeholder,
    required,
    inputClassName,
    label,
    dir = 'ltr',
    error,
    id,
    type = 'text',
    ...props
}: {
    value: string;
    setValue: any;
    name?: string;
    placeholder: string;
    required?: boolean;
    inputClassName?: string;
    label: string;
    error?: string;
    id?: string;
    dir?: string;
    type?: string;
    props?: any;
}) {
    return (
        <div className="w-full" dir={dir}>
            {label && (
                <label className={cn("mb-2 block text-sm font-semibold text-gray-600 dark:text-white", dir === 'rtl' && 'text-right')}>
                    {label}{' '}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                {...{ id, ...props }}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                dir={dir}
                className={`w-full rounded-lg border border-gray-200 bg-bg-primary px-4 py-3 text-gray-800 placeholder-gray-400 transition-all focus:border-transparent focus:ring-0 focus:outline-none dark:text-white ${inputClassName}`}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
