export default function DateInput({
    value,
    onChange,
    min = '',
    max = '',
    disabled = false,
    required = false,
}: {
    value: string;
    onChange: (value: string) => void;
    min?: string;
    max?: string;
    disabled?: boolean;
    required?: boolean;
}) {
    return (
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
    );
}
