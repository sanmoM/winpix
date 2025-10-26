import React from 'react'

export default function SocialIcon({ Icon, href, ariaLabel }: { Icon: React.ComponentType, href: string, ariaLabel: string }) {
    return (
        <a
            key={ariaLabel}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className="w-12 h-12  flex items-center justify-center rounded-full 
                                           text-primary-color border border-primary-color hover:bg-primary-color hover:text-white
                                           transition-colors duration-300"
        >
            <Icon />
        </a>
    )
}
