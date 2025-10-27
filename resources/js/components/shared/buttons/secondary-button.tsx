import React from 'react'

export default function SecondaryButton({text}: {text: string}) {
    return (
        <button className="bg-white !text-center text-black text-sm font-semibold rounded-full transition cursor-pointer w-32 py-2 md:py-3 btn duration-300 hover:scale-105 ease-in-out">
            {text}
        </button>
    )
}
