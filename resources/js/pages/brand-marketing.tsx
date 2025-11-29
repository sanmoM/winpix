import BrandMarketingContestTypes from '@/components/brand-marketing/brand-marketing-contest-types';
import BrandMarketingOverview from '@/components/brand-marketing/brand-marketing-overview';
import BrandMarketingBanner from '@/components/brand-marketing/brand-marketion-banner/brand-marketing-banner';
import Container from '@/components/shared/container';
import useLocales from '@/hooks/useLocales';
import UserLayout from '@/layouts/user-layout';



export default function BrandMarketing({ banner, features }: any) {
  const { currentLanguage } = useLocales()

  features = features.filter(feature => feature?.lang === currentLanguage)
  const overviewFeatures = features.filter(feature => feature.brand_marketing_type === 'why_choose')
  const contestFeatures = features.filter(feature => feature.brand_marketing_type !== 'why_choose')
  return (
    <UserLayout>
      <Container className="my-10 space-y-14 md:my-16 md:space-y-20 lg:my-12 lg:space-y-28">
        <BrandMarketingBanner banner={banner} />
        <BrandMarketingOverview data={overviewFeatures} />
        <BrandMarketingContestTypes data={contestFeatures} />
      </Container>
    </UserLayout>
  )
}
