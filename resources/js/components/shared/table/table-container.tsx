import React from 'react'

export default function TableContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-4">
            {children}
        </div>
    )
}
