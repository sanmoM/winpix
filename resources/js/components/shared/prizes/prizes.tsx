



import SecondarySectionHeading from '@/components/shared/secondary-section-heading';
import React, { useState, useEffect } from 'react';
import PrizeCard from './components/prize-card';
import BorderButton from '@/components/shared/buttons/border-button';

export default function Prizes({ t, prizes }: { t: any, prizes: any[] }) {
    const [isViewingAllPrizes, setIsViewingAllPrizes] = useState(false);
    const [visibleCount, setVisibleCount] = useState(5);

    // --- Responsive slice logic ---
    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth;

            if (width < 640) setVisibleCount(1);         // base (grid-cols-1)
            else if (width < 1024) setVisibleCount(2);   // sm:grid-cols-2
            else if (width < 1536) setVisibleCount(3);   // lg:grid-cols-3
            else setVisibleCount(5);                     // 2xl:grid-cols-5
        };

        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    return (
        <div>
            <SecondarySectionHeading title={t('shared.prizes.title')} />

            {/* Initial Prizes */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 justify-center items-center mb-6 gap-6'>
                {prizes?.slice(0, visibleCount).map((prize, index) => (
                    <PrizeCard
                        key={prize.prizeId || prize.id || index}
                        number={index + 1}
                        title={prize.title}
                        amount={prize.coin}
                        containerClassName='w-full'
                    />
                ))}
            </div>

            {/* Expanded prizes when "View All" is active */}
            {isViewingAllPrizes && (
                <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 justify-center items-center gap-6'>
                    {prizes?.slice(visibleCount).map((prize, index) => (
                        <PrizeCard
                            key={prize.prizeId || prize.id || index}
                            number={visibleCount + index + 1}
                            title={prize.title}
                            amount={prize.coin}
                            containerClassName='w-full'
                        />
                    ))}
                </div>
            )}

            {/* Toggle Button */}
            {prizes?.length > visibleCount && (
                <BorderButton
                    onClick={() => setIsViewingAllPrizes(!isViewingAllPrizes)}
                    text={isViewingAllPrizes ? t("shared.prizes.viewLess") : t("shared.prizes.viewAll")}
                    className='w-fit mx-auto mt-10 py-2 px-10'
                />
            )}
        </div>
    );
}
