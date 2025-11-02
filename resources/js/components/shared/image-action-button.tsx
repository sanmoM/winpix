import React from 'react'

export default function ImageActionButton({ Icon, onClick }: any) {
    return (
        <button className="bg-primary-color cursor-pointer p-3 rounded-full" onClick={onClick}>
            {Icon}
        </button>
    )
}
