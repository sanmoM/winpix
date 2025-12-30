import { cn } from '@/lib/utils'
import { Link } from '@inertiajs/react'
import React from 'react'
import axios from 'axios'

export default function Logo({ hasBackground, className }: { hasBackground?: boolean, className?: string }) {
    const [logos, setLogos] = React.useState({});
    React.useEffect(() => {
        axios.get("/settings")
            .then(response => {
                if (response.data?.dark_logo && response.data?.light_logo) {
                    setLogos({
                        dark_logo: response.data?.dark_logo,
                        light_logo: response.data?.light_logo,
                    });
                }
            })
            .catch(() => {
                console.warn("Failed to load favicon");
            });
    }, []);
    return (
        <Link href="/">
            <img src={"/storage/" + logos?.dark_logo} alt="logo" className={cn('w-24 lg:w-32 ', hasBackground && 'hidden dark:block', className)} />
            <img src={"/storage/" + logos?.light_logo} alt="logo" className={cn('w-24 lg:w-32 hidden', hasBackground && 'dark:hidden block', className)} />
        </Link>
    )
}
