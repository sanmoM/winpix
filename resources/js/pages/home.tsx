import Container from "@/components/shared/container";
import UserLayout from "@/layouts/user-layout";
import Banner from "../components/home/banner/Banner";

export default function home() {
    return (
        <UserLayout>
            {/* <Container>
            </Container> */}
            <Banner />
        </UserLayout>
    )
}
