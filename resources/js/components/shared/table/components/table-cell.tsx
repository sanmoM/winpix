import { cn } from '@/lib/utils'
import React from 'react'

export default function TableCell({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <td className={cn("px-4 py-3 font-medium first:!text-left last:!text-right text-gray-700 dark:text-gray-200", className)}>
            {children}
        </td>
    )
}
