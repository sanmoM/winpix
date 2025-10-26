import { cn } from '@/lib/utils'
import { Link } from '@inertiajs/react'
import React from 'react'

export default function Logo({ hasBackground }: { hasBackground?: boolean }) {
    return (
        <Link href="/">
            <img src="/logo/logo-dark.png" alt="logo" className={cn('w-24 lg:w-32 ', hasBackground && 'hidden dark:block')} />
            <img src="/logo/logo-light.png" alt="logo" className={cn('w-24 lg:w-32 hidden', hasBackground && 'dark:hidden block')} />
        </Link>
    )
}
