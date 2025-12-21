import React from 'react'

export default function CoinCard({ item }: { item: any }) {
    return (
        <div className=' bg-bg-primary p-4 rounded-sm'>
            <img src={item?.src} alt="hasmonaut's profile" className="w-10 h-10 rounded-full object-cover object-top mx-auto" />
            <p className='text-2xl font-bold !text-center mt-2'>100</p>
        </div>
    )
}
