import SectionHeading from '../shared/SectionHeading'
import RedeemCard from './components/redeem-card'

export default function GrandPrice({ t }: { t: (key: string) => string }) {
    return (
        <div>
            <SectionHeading title={t('redeem.grandPriceTitle')} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000012/icon?v=6" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000012/icon?v=6" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000012/icon?v=6" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000012/icon?v=6" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000012/icon?v=6" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000012/icon?v=6" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000012/icon?v=6" />
                <RedeemCard src="https://cdn.pulsepx.com/redemption-assets/1000012/icon?v=6" />
            </div>
        </div>
    )
}
