import BorderButton from '@/components/shared/buttons/border-button'
import Button from '@/components/shared/buttons/button'

export default function NotEnoughCoinModal({ quantity, onClose }: { quantity: number, onClose: () => void }) {
    return (
        <div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-3xl font-extrabold  mb-8 !text-center">
                Not enough V-Coins
            </h1>

            {/* Custom Treasure Chest Illustration */}
            <div className="relative flex items-center justify-center">
                {/* Animated bounce effect */}
                <div className="animate-bounce-slow">
                    <img
                        src="/images/golden-coin.png"
                        alt='coin'
                        className="w-20 object-cover"
                    />
                </div>
            </div>
            <p className=' mb-6 !text-center mt-3 text-2xl font-black'>X{quantity}</p>

            <Button text='Ok' className='py-2 px-20 text-lg' onClick={onClose} />
        </div>
    )
}
