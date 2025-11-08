
import SectionHeading from "../shared/SectionHeading";
import RedeemCard from "./components/redeem-card";

export default function GreatPrice({ t }) {
    return (
        <div>
            <SectionHeading title={t('redeem.appPriceTitle')} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000003/icon?v=1" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000003/icon?v=1" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000003/icon?v=1" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000003/icon?v=1" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000003/icon?v=1" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000003/icon?v=1" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000003/icon?v=1" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000003/icon?v=1" />
            </div>
        </div>
    )
}
