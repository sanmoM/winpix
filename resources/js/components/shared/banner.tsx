import { cn } from '@/lib/utils'
import React from 'react'

export default function Banner({ src, imgClassName, children, containerClass, hasOverlay = true }: { src: string, imgClassName?: string, children: React.ReactNode, containerClass?: string, hasOverlay?: boolean }) {
    return (
        <div className={cn("w-full flex-shrink-0 relative h-[70vh] lg:h-screen z-[1]", containerClass)}>
            <img src={src} alt={`Banner`} className={`w-full h-full object-cover ${imgClassName}`} />
            {
                hasOverlay && <div className='w-full h-full absolute z-[1] inset-0 bg-black/40'></div>
            }
            <div className='w-full h-full absolute z-[2] inset-0'>
                {
                    children
                }
            </div>
        </div>
    )
}
