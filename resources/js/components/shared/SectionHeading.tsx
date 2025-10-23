import { cn } from '@/lib/utils'
import React from 'react'

export default function SectionHeading({ title, className }: { title: string, className?: string }) {
    return (
        <h1 className={cn('text-2xl md:text-3xl lg:text-4xl font-black text-center mb-6 md:mb-14 lg:mb-20', className)}>{title}</h1>
    )
}
