import { Link } from '@inertiajs/react'
import React from 'react'

export default function Logo() {
    return (
        <Link href="/">
            <img src="/logo/logo-dark.png" alt="logo" className='hidden dark:block w-32' />
            <img src="/logo/logo-light.png" alt="logo" className='block dark:hidden w-32' />
        </Link>
    )
}
