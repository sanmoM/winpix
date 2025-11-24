
import SectionHeading from "../shared/SectionHeading";
import RedeemCard from "./components/redeem-card";

export default function GreatPrice({ t, prizes }: { t: any, prizes: any }) {
    return (
        <div>
            <SectionHeading title={t('redeem.greatPriceTitle')} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                {prizes.map((prize: any) => (
                    <RedeemCard src={prize.icon_image} title={prize.title} description={prize.description} />
                ))}
            </div>
        </div>
    )
}
