import BorderButton from '@/components/shared/buttons/border-button'
import Button from '@/components/shared/buttons/button'
import { useForm } from '@inertiajs/react'
import { route } from 'ziggy-js'

export default function RedeemModal({ image, quantity, type }: { image: string, quantity: number }) {
    const { post } = useForm({
        quantity,
    })
    const handleConfirm = () => {
        if (type === "app_prize") {
            post(route('add-pixel'))
        }else if(type === "grand_prize"){
            post(route('add-vcoin'))
        }
    }
    return (
        <div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-3xl font-extrabold  mb-8 !text-center">
                Are you sure you want to redeem this prize?
            </h1>

            {/* Custom Treasure Chest Illustration */}
            <div className="relative flex items-center justify-center">
                {/* Animated bounce effect */}
                <div className="animate-bounce-slow">
                    <img
                        src={image}
                        alt='coin'
                        className="w-20 object-cover"
                    />
                </div>
            </div>
            <p className=' mb-6 !text-center mt-3 text-2xl font-black'>X{quantity}</p>

            <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
                <BorderButton text='Cancel' className='py-2 px-8' />
                <Button text='Confirm' className='py-2 px-8' onClick={handleConfirm} />
            </div>
        </div>
    )
}
