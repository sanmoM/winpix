
export default function TextAreaInput({ value, onChange, placeholder, required, inputClassName, label, name, id, error }: { value: string, onChange: any, placeholder: string, required: boolean, inputClassName?: string, label: string, name?: string, id: string, error?: string }) {
    return (
        <div>
            {
                label && (
                    <label
                        {...{ id }}
                        className="block text-sm font-semibold text-gray-600 dark:text-white mb-2">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )
            }
            <textarea
                {...{ id }}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`resize-none border w-full focus:outline-0 h-32 bg-bg-primary rounded-sm p-4 ${inputClassName}`}
                required={required}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}
