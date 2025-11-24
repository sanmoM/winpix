import Container from "@/components/shared/container";
import UserLayout from "@/layouts/user-layout";
import AppPrice from "@/components/redeem/app-price";
import GrandPrice from "@/components/redeem/grand-price";
import useLocales from "@/hooks/useLocales";
import { usePage } from "@inertiajs/react";
import GreatPrice from "@/components/redeem/great-price";

export default function redeem() {
  const { prizes } = usePage().props;
  const appPrice = prizes.filter(prize => prize.prize_type === 'app_prize');
  const grandPrice = prizes.filter(prize => prize.prize_type === 'grand_prize');
  const greatPrice = prizes.filter(prize => prize.prize_type === 'great_prize');
  const { t } = useLocales()
  return (
    <UserLayout>
      <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
        <AppPrice t={t} prizes={appPrice} />
        <GreatPrice t={t} prizes={greatPrice} />
        <GrandPrice t={t} prizes={grandPrice} />
      </Container>
    </UserLayout >
  )
}
