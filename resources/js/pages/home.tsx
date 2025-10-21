import Container from "@/components/shared/container";
import UserLayout from "@/layouts/user-layout";
import Banner from "../components/home/banner/Banner";
import Newest from "../components/home/newest/Newest";
import Gallery from "../components/home/Gallery";
import GetApp from "../components/home/get-app";

export default function home() {
    return (
        <UserLayout>
            <Banner />
            <Container className="space-y-4 md:space-y-10 lg:space-y-20 my-4 md:my-10 lg:my-20">
                <Newest />
                <Gallery />
            </Container>
            <GetApp />

        </UserLayout>
    )
}


