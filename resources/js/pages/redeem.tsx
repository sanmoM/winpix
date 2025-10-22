import Container from "@/components/shared/container";
import UserLayout from "@/layouts/user-layout";
import AppPrice from "@/components/redeem/app-price";
import GrandPrice from "@/components/redeem/grand-price";

export default function redeem() {
  return (
    <UserLayout>
      <Container className="space-y-4 md:space-y-10 lg:space-y-20 my-4 md:my-10 lg:my-20">
        <AppPrice />
        <GrandPrice />
      </Container>
    </UserLayout >
  )
}
