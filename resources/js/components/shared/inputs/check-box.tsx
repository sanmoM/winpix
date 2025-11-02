import { cn } from '@/lib/utils'
import React, { JSX } from 'react'

export default function CheckBox({ label, containerClassName }: { label?: string, containerClassName?: string }) {
    return (
        <div className={cn('flex items-center gap-2', containerClassName)}>
            <input type="checkbox" className="w-4 h-4 accent-primary-color border-gray-300 rounded cursor-pointer" />
            {label && <div>{label}</div>}
        </div>
    )
}
