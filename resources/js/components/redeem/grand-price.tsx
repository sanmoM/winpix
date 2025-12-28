import SectionHeading from '../shared/SectionHeading';
import RedeemCard from './components/redeem-card';

export default function GrandPrice({ t, prizes }: { t: any; prizes: any }) {
    return (
        <div>
            <SectionHeading title={t('redeem.grandPriceTitle')} />
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
                {prizes.map((prize: any) => (
                    <RedeemCard
                        src={prize.icon_image}
                        price={prize.price}
                        name={prize.name}
                        number_of_coin={prize.number_of_coin}
                        type={prize.prize_type}
                        id={prize.id}
                    />
                ))}
            </div>
        </div>
    );
}
