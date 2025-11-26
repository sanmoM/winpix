import { cn } from '@/lib/utils'
import React from 'react'

export default function TableCell({
    children,
    className
}: {
    children: React.ReactNode,
    className?: string
}) {

    const isRTL = typeof document !== 'undefined' && document.dir === 'rtl'

    return (
        <td
            className={cn(
                "px-4 py-3 font-medium text-gray-700 dark:text-gray-200",

                // LTR mode (default)
                !isRTL && "first:!text-left last:!text-right",

                // RTL mode (reverse alignment)
                isRTL && "first:!text-right last:!text-left",

                className
            )}
        >
            {children}
        </td>
    )
}
