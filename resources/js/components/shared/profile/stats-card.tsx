import React from 'react'

export default function StatsCard({ item }: { item: any }) {
    return (
        <div className='flex items-center gap-4 justify-center bg-bg-primary lg:p-5 p-3 rounded-sm w-full'>
            <div className='bg-primary-color p-3 rounded-full'>{item?.icon}</div>
            <p className='text-3xl lg:text-4xl font-bold'>{item?.label}</p>
        </div>
    )
}
