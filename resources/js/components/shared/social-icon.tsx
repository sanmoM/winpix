import { cn } from '@/lib/utils'
import React from 'react'

export default function SocialIcon({ Icon, href, ariaLabel, containerClassName = "12" }: { Icon: React.ComponentType, href: string, ariaLabel: string, containerClassName?: string }) {
    return (
        <a
            key={ariaLabel}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className={cn(`w-12 h-12 flex items-center justify-center rounded-full 
                                           text-primary-color border border-primary-color hover:bg-primary-color hover:text-white
                                           transition-colors duration-300`, containerClassName)}
        >
            <Icon />
        </a>
    )
}
