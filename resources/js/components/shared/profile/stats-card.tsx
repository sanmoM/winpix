import React from 'react'

export default function StatsCard({ item }: { item: any }) {
    return (
        <div className='flex items-center gap-5 bg-bg-primary lg:p-5 w-fit p-3 pr-10 lg:pr-20 rounded-sm'>
            <div className='bg-primary-color p-3 rounded-full'>{item?.icon}</div>
            <p className='text-4xl font-bold'>{item?.label}</p>
        </div>
    )
}
