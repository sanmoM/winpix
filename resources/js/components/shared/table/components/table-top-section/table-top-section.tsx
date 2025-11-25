import React from 'react'
import CreateButton from './components/create-button'

export default function TableTopSection({ href, title }: { href: string }) {
    return (
        <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">{title}</h1>
            <CreateButton href={href} />
        </div>
    )
}
