import Button from '@/components/shared/buttons/button'
import { Link } from '@inertiajs/react'

export default function NoPixelModalContents({ pixel }) {
    return (
        <div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-3xl font-extrabold  mb-8 !text-center">
                Not enough pixels
            </h1>

            {/* Custom Treasure Chest Illustration */}
            <div className="relative flex items-center justify-center">
                {/* Animated bounce effect */}
                <div className="animate-bounce-slow">
                    <img
                        src='/images/coin.png'
                        alt='coin'
                        className="w-20 object-cover"
                    />
                </div>
            </div>
            <p className=' mb-6 !text-center mt-3 text-2xl font-black'>X{pixel}</p>

            {/* Body Text */}
            <p className="text-gray-500 dark:text-gray-300 w-[80%] mx-auto !text-center text-sm md:text-base leading-relaxed mb-10 px-4">
                You don't have enough pixels to enter this quest. Please buy pixels to enter this quest.
            </p>


            <Link href={"/store"} className='block'>
                <Button text='Get Pixels' className='py-2.5 px-20 text-lg' />
            </Link>
        </div>
    )
}
