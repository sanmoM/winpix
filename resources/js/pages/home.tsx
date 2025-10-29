import Container from "@/components/shared/container";
import UserLayout from "@/layouts/user-layout";
import Banner from "../components/home/banner/home-banner";
import Gallery from "../components/home/Gallery";
import GetApp from "../components/home/get-app";
import Newest from "../components/home/newest/Newest";
import useLocales from "@/hooks/useLocales";

export default function home() {
    const { t } = useLocales()
    return (
        <UserLayout>
            <Banner t={t} />
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                <Newest t={t} />
                <Gallery title={t("home.gallery.title")} />
            </Container>
            <GetApp t={t} />
        </UserLayout>
    )
}


