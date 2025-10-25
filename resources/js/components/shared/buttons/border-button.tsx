import { cn } from '@/lib/utils'
import React from 'react'

export default function BorderButton({ text, className, hasIcon = false, src, onClick }: { text: string, className?: string, hasIcon?: boolean, src?: string, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn("border w-full rounded-full py-1 px-8 cursor-pointer flex justify-center items-center gap-2", className)}>
            {hasIcon && (<img src="/images/coin.png" alt="" className='w-5 h-5' />)}
            <span>{text}</span>
        </button>
    )
}
