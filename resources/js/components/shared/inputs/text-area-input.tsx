export default function TextAreaInput({
    value,
    onChange,
    placeholder,
    required,
    inputClassName,
    dir = 'ltr',
    label,
    name,
    id,
    error,
    ...props
}: {
    value: string;
    onChange: any;
    placeholder: string;
    required: boolean;
    inputClassName?: string;
    label: string;
    dir?: string;
    name?: string;
    id: string;
    error?: string;
}) {
    return (
        <div dir={dir}>
            {label && (
                <label
                    {...{ id }}
                    className="mb-2 block text-sm font-semibold text-gray-600 dark:text-white"
                >
                    {label}{' '}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <textarea
                {...{ id }}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                dir={dir}
                className={`h-32 w-full resize-none rounded-sm border bg-bg-primary p-4 focus:outline-0 ${inputClassName}`}
                required={required}
                {...props}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
