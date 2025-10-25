import Container from "@/components/shared/container";
import UserLayout from "@/layouts/user-layout";
import Banner from "../components/home/banner/home-banner";
import Newest from "../components/home/newest/Newest";
import Gallery from "../components/home/Gallery";
import GetApp from "../components/home/get-app";

export default function home() {
    return (
        <UserLayout>
            <Banner />
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-20">
                <Newest />
                <Gallery />
            </Container>
            <GetApp />

        </UserLayout>
    )
}


