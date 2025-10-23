
import SectionHeading from "../shared/SectionHeading";
import RedeemCard from "./components/redeem-card";

export default function AppPrice() {
    return (
        <div>
            <SectionHeading title="In App Prices" />
            <div className="grid grid-cols-8 gap-6">
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
