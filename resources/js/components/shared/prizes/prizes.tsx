import SecondarySectionHeading from '@/components/shared/secondary-section-heading'
import React from 'react'
import PrizeCard from './components/prize-card'
import BorderButton from '@/components/shared/buttons/border-button';

export default function Prizes({ t }: { t: (key: string) => string }) {
    const [isViewingAllPrizes, setIsViewingAllPrizes] = React.useState(false);
    return (
        <div>
            <SecondarySectionHeading title={t('shared.prizes.title')} className='' />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 justify-center items-center  mb-6 gap-6'>
                <PrizeCard number={1} amount={500} containerClassName='' hasBadge={true} title={t('shared.prizes.card.first')} />
                <PrizeCard number={2} amount={300} containerClassName='' hasBadge={true} title={t('shared.prizes.card.second')} />
                <PrizeCard number={3} amount={200} containerClassName='' hasBadge={true} title={t('shared.prizes.card.third')} />
                <PrizeCard number={4} amount={200} containerClassName='' hasBadge={true} title={t('shared.prizes.card.fourth')} />
                <PrizeCard number={5} amount={200} containerClassName='' hasBadge={true} title={t('shared.prizes.card.fifth')} />
            </div>
            {
                isViewingAllPrizes && (
                    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 justify-center items-center gap-6'>
                        <PrizeCard number={4} title={`#${t("shared.prizes.card.no")} 6`} amount={100} containerClassName='w-full' />
                        <PrizeCard number={5} title={`#${t("shared.prizes.card.no")} 7`} amount={50} containerClassName='w-full' />
                        <PrizeCard number={6} title={`#${t("shared.prizes.card.no")} 8`} amount={20} containerClassName='w-full' />
                        <PrizeCard number={7} title={`#${t("shared.prizes.card.no")} 9`} amount={10} containerClassName='w-full md:hidden lg:block' />
                        <PrizeCard number={8} title={`${t("shared.prizes.card.no")} 10`} amount={5} containerClassName='w-full md:hidden 2xl:block' />
                        <PrizeCard number={9} title={`${t("shared.prizes.card.no")} 11-20`} amount={2} containerClassName='w-full md:hidden 2xl:block' />
                    </div>
                )
            }
            <BorderButton
                onClick={() => setIsViewingAllPrizes(!isViewingAllPrizes)}
                text={isViewingAllPrizes ? t("shared.prizes.viewLess") : t("shared.prizes.viewAll")} className='w-fit mx-auto mt-10 py-2 px-10' />
        </div>
    )
}


