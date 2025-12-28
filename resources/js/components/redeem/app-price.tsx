import SectionHeading from '../shared/SectionHeading';
import RedeemCard from './components/redeem-card';

export default function AppPrice({ t, prizes }: { t: any; prizes: any }) {
    console.log(prizes, 'prizes');
    return (
        <div>
            <SectionHeading title={t('redeem.appPriceTitle')} />
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
                {prizes.map((prize: any) => (
                    <RedeemCard
                        src={prize.icon_image}
                        name={prize.name}
                        price={prize.price}
                        number_of_coin={prize.number_of_coin}
                        type={prize.type}
                    />
                ))}
            </div>
        </div>
    );
}
