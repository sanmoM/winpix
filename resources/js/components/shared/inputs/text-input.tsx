
export default function TextInput({ value, setValue, name, placeholder, required, inputClassName, label, error, id, type='text', ...props }: { value: string, setValue: any, name?: string, placeholder: string, required?: boolean, inputClassName?: string, label: string, error?: string, id?: string, type?: string, props?: any }) {
    return (
        <div className="w-full">
            {
                label && (
                    <label className="block text-sm font-semibold text-gray-600 dark:text-white mb-2">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )
            }
            <input
                {...{ id, ...props }}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-bg-primary border border-gray-200 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent transition-all ${inputClassName}`}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}
