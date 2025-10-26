import SecondarySectionHeading from '@/components/shared/secondary-section-heading'
import React from 'react'
import PrizeCard from './components/prize-card'
import BorderButton from '@/components/shared/buttons/border-button';

export default function Prizes() {
    const [isViewingAllPrizes, setIsViewingAllPrizes] = React.useState(false);
    return (
        <div>
            <SecondarySectionHeading title="Prizes" className='' />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 justify-center items-center  mb-6 gap-6'>
                <PrizeCard number={1} title="First Prize" amount={500} containerClassName='' hasBadge={true} />
                <PrizeCard number={2} title="Second Prize" amount={300} containerClassName='' hasBadge={true} />
                <PrizeCard number={3} title="Third Prize" amount={200} containerClassName='sm:hidden hidden lg:block' hasBadge={true} />
                <PrizeCard number={4} title="Fourth Prize" amount={200} containerClassName=' sm:hidden 2xl:block' hasBadge={true} />
                <PrizeCard number={5} title="Fifth Prize" amount={200} containerClassName=' sm:hidden 2xl:block' hasBadge={true} />
            </div>
            {
                isViewingAllPrizes && (
                    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 justify-center items-center gap-6'>
                        <PrizeCard number={4} title="#NO. 6" amount={100} containerClassName='w-full' />
                        <PrizeCard number={5} title="#NO. 7" amount={50} containerClassName='w-full' />
                        <PrizeCard number={6} title="#NO. 8" amount={20} containerClassName='w-full' />
                        <PrizeCard number={7} title="#NO. 9" amount={10} containerClassName='w-full md:hidden lg:block' />
                        <PrizeCard number={8} title="#NO. 10" amount={5} containerClassName='w-full md:hidden 2xl:block' />
                        <PrizeCard number={9} title="#NO. 11-20" amount={2} containerClassName='w-full md:hidden 2xl:block' />
                    </div>
                )
            }
            <BorderButton
                onClick={() => setIsViewingAllPrizes(!isViewingAllPrizes)}
                text={isViewingAllPrizes ? "View Less" : "View All"} className='w-fit mx-auto mt-10 py-2 px-10' />
        </div>
    )
}


