import React from 'react'
import CreateButton from './components/create-button'

export default function TableTopSection({ href, title, hasCreateButton = true }: { href: string, title: string, hasCreateButton?: boolean }) {
    return (
        <div className="mb-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">{title}</h1>
            {
                hasCreateButton && <CreateButton href={href} />
            }
        </div>
    )
}
