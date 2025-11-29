import BrandMarketingContestTypes from '@/components/brand-marketing/brand-marketing-contest-types';
import BrandMarketingOverview from '@/components/brand-marketing/brand-marketing-overview';
import BrandMarketingBanner from '@/components/brand-marketing/brand-marketion-banner/brand-marketing-banner';
import Container from '@/components/shared/container';
import UserLayout from '@/layouts/user-layout';



export default function BrandMarketing({banner}: any) {
  return (
    <UserLayout>
      <Container className="my-10 space-y-14 md:my-16 md:space-y-20 lg:my-12 lg:space-y-28">
        <BrandMarketingBanner banner={banner} />
        <BrandMarketingOverview />
        <BrandMarketingContestTypes />
      </Container>
    </UserLayout>
  )
}
