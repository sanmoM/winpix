import { cn } from '@/lib/utils'
import React from 'react'

export default function NoData({ text, containerClassName }: { text: string, containerClassName?: string }) {
    return (
        <div className={cn("p-6 flex flex-col items-center justify-center text-center lg:py-8  border w-full", containerClassName)}>
            <img
                src="/images/empty-data.png"
                alt="No order items"
                className="w-1/2"
                width={320}
                height={320}
            />
            <h3 className="text-lg md:text-2xl font-medium text-gray-900 mb-2">{text}</h3>
        </div>
    )
}
