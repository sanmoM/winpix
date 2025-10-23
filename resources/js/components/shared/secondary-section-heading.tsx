import { cn } from '@/lib/utils'
import React from 'react'

export default function SecondarySectionHeading({ title, className }: { title: string, className?: string }) {
    return (
        <h1 className={cn('text-lg md:text-xl lg:text-2xl font-black mb-3 lg:mb-4', className)}>{title}</h1>
    )
}
