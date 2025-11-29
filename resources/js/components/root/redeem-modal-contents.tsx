import { router } from '@inertiajs/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { route } from 'ziggy-js'
import Button from '../shared/buttons/button'

export default function RedeemModalContents({ setIsOpen }) {
  const [claimed, setClaimed] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleRedeem = () => {
    setLoading(true)
    router.post(route('claim'), {}, {
      onSuccess: () => {
        toast.success('Gift Claimed!');
        setClaimed(true)

        setTimeout(() => {
          setIsOpen(false)
        }, 2000)
      }
    });
  }
  return (
    <div>

      {/* Main Heading */}
      <h1 className="text-2xl md:text-3xl font-extrabold  mb-8 !text-center">
        Welcome Gift: Free Pixels!
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
      <p className=' mb-6 !text-center mt-3 text-2xl font-black'>X15</p>

      {/* Body Text */}
      <p className="text-gray-500 dark:text-gray-300 w-[80%] mx-auto !text-center text-sm md:text-base leading-relaxed mb-10 px-4">
        To get you started, here's a gift of free Pixels! Use them to enter Quests
        with larger prizes and kick off your journey of winning rewards and
        climbing the ranks. Let the competition begin!
      </p>

      {
        claimed ? (
          <div className="flex items-center justify-center">
            <p className="text-green-400 w-[80%] mx-auto !text-center text-sm md:text-base leading-relaxed mb-10 px-4">
              Your gift has been claimed!
            </p>
          </div>
        ) : (
          <Button text='Claim' className='py-2.5 px-20 text-lg' onClick={handleRedeem} loading={loading} disabled={loading} />
        )
      }
    </div>
  )
}
