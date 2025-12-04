import { cn } from '@/lib/utils'
import React from 'react'

export default function ImageActionButton({ Icon, onClick, className }: any) {
    return (
        <button
            className={cn("bg-primary-color cursor-pointer p-3 rounded-full", className)}
            onClick={onClick}
        >
            {Icon}
        </button>
    )
}
