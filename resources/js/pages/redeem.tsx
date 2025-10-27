import Container from "@/components/shared/container";
import UserLayout from "@/layouts/user-layout";
import AppPrice from "@/components/redeem/app-price";
import GrandPrice from "@/components/redeem/grand-price";
import useLocales from "@/hooks/useLocales";

export default function redeem() {
  const { t } = useLocales()
  return (
    <UserLayout>
      <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
        <AppPrice t={t} />
        <GrandPrice t={t} />
      </Container>
    </UserLayout >
  )
}
