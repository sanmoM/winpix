import useLocales from '@/hooks/useLocales';
import { cn } from '@/lib/utils';
import React from 'react';

interface Option {
    value: string | number;
    label: string;
}

interface MultiSelectInputProps {
    id?: string;
    name?: string;
    label?: string;
    options: Option[];
    value: Array<string | number>;
    placeholder?: string;
    onChange: (values: Array<string | number>) => void;
    className?: string;
    inputClassName?: string;
    required?: boolean;
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
    id,
    name,
    label,
    options,
    value = [],
    placeholder,
    onChange,
    className = '',
    inputClassName = '',
    required = false,
}) => {
    const { currentLanguage } = useLocales();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(e.target.selectedOptions).map(
            (option) => option.value,
        );
        onChange(selectedValues);
    };

    return (
        <div className={cn('w-full max-w-xs', className)}>
            {label && (
                <label
                    htmlFor={id}
                    className="mb-2 block text-sm font-semibold text-gray-600 dark:text-white"
                >
                    {label}{' '}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="relative">
                <select
                    multiple
                    id={id}
                    name={name || id}
                    value={value.map(String)}
                    onChange={handleChange}
                    className={cn(
                        'block w-full rounded-lg border border-gray-300 bg-bg-primary px-4 py-3 text-base focus:ring-0 focus:outline-none',
                        'min-h-[120px]',
                        inputClassName,
                    )}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}

                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Helper text */}
                <p className="mt-1 text-xs text-gray-500">
                    {currentLanguage === 'ar'
                        ? 'اضغط مع Ctrl لاختيار أكثر من خيار'
                        : 'Hold Ctrl (Cmd on Mac) to select multiple options'}
                </p>
            </div>
        </div>
    );
};

export default MultiSelectInput;
