import Button from '@/components/shared/buttons/button'
import { Link } from '@inertiajs/react'

export default function RedeemModal() {
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
                        src='/images/golden-coin.png'
                        alt='coin'
                        className="w-20 object-cover"
                    />
                </div>
            </div>
            <p className=' mb-6 !text-center mt-3 text-2xl font-black'>X{pixel}</p>


            <Link href={"/store"} className='block'>
                <Button text='Get Pixels' className='py-2.5 px-20 text-lg' />
            </Link>
        </div>
    )
}
