import useLocales from '@/hooks/useLocales'
import React from 'react'

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
    const { loading } = useLocales()
    return (
        <div>{loading ? null : children}</div>
    )
}
