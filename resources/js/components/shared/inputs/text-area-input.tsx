import React from 'react'

export default function TextAreaInput({ value, onChange, placeholder, required, inputClassName, label, name }) {
    return (
        <div>
            {
                label && (
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )
            }
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`resize-none border focus:outline-0 h-32 bg-bg-primary rounded-sm p-4 ${inputClassName}`}
                required={required}
            />
        </div>
    )
}
