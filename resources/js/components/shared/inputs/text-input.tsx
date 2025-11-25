import React from 'react'

export default function TextInput({ value, setValue, name, placeholder, required, inputClassName, label }) {
    return (
        <div className="w-full">
            {
                label && (
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                )
            }
            <input
                type="text"
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent transition-all ${inputClassName}`}
            />
        </div>
    )
}
